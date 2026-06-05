"""
Lambda: /checkins

  GET  /checkins           → return all records (newest first)
  GET  /checkins?location= → filter by location
  POST /checkins           → create a new check-in record

Pair with a single API Gateway HTTP API route: ANY /checkins
Runtime: Python 3.12
"""

import json
import logging
import uuid
import boto3
from datetime import datetime, timezone
from boto3.dynamodb.conditions import Attr

logger = logging.getLogger()
logger.setLevel(logging.INFO)

TABLE_NAME = "hertz-key-library"  # ← must match your DynamoDB table name

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

HEADERS = {"Content-Type": "application/json"}


def response(status: int, body: dict | list) -> dict:
    return {
        "statusCode": status,
        "headers": HEADERS,
        "body": json.dumps(body, default=str),
    }


def lambda_handler(event, _context):
    method = (
        event.get("requestContext", {}).get("http", {}).get("method")
        or event.get("httpMethod", "GET")
    ).upper()
    # NOTE: CORS is handled by the Lambda Function URL config — do NOT add
    # Access-Control-Allow-Origin here or the browser will see duplicate headers.

    # ── GET → list check-ins ─────────────────────────────────────────────
    if method == "GET":
        params = event.get("queryStringParameters") or {}
        filter_location = params.get("location")

        if filter_location:
            result = table.scan(FilterExpression=Attr("location").eq(filter_location))
        else:
            result = table.scan()

        items = sorted(
            result.get("Items", []),
            key=lambda x: x.get("timestamp", ""),
            reverse=True,
        )

        return response(200, items)

    # ── POST → create check-in ───────────────────────────────────────────
    if method == "POST":
        try:
            body = json.loads(event.get("body") or "{}")
        except json.JSONDecodeError:
            return response(400, {"error": "Invalid JSON body."})

        location      = body.get("location", "").strip()
        code          = body.get("code", "").strip()
        vehicle_number = body.get("vehicleNumber", "").strip()
        license_plate  = body.get("licensePlate", "").strip()
        vin_number     = body.get("vinNumber", "").strip()
        car_make       = body.get("carMake", "").strip()
        car_color      = body.get("carColor", "").strip()

        has_identifier = any([code, vehicle_number, license_plate, vin_number])

        if not location or not has_identifier:
            return response(
                422,
                {"error": "location and at least one identifier are required."},
            )

        item = {
            "id":        str(uuid.uuid4()),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "location":  location,
        }

        # Only store optional fields if they have a value
        if code:           item["code"]          = code
        if vehicle_number: item["vehicleNumber"] = vehicle_number
        if license_plate:  item["licensePlate"]  = license_plate
        if vin_number:     item["vinNumber"]     = vin_number
        if car_make:       item["carMake"]       = car_make
        if car_color:      item["carColor"]      = car_color

        table.put_item(Item=item)

        return response(201, {"message": "Check-in recorded.", "id": item["id"]})

    # ── DELETE → remove check-in ─────────────────────────────────────────
    if method == "DELETE":
        try:
            body = json.loads(event.get("body") or "{}")
        except json.JSONDecodeError:
            return response(400, {"error": "Invalid JSON body."})

        item_id  = body.get("id", "").strip()
        location = body.get("location", "").strip()

        logger.info("DELETE request | payload: %s", json.dumps(body))

        if not item_id or not location:
            logger.warning("DELETE rejected — missing id or location")
            return response(422, {"error": "id and location are required."})

        table.delete_item(Key={"id": item_id, "location": location})

        logger.info("Deleted item id=%s location=%s", item_id, location)
        return response(200, {"message": "Deleted."})

    # ── 405 ─────────────────────────────────────────────────────────────
    return response(405, {"error": f"Method {method} not allowed."})
