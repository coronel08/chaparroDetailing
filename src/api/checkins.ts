/**
 * Checkins API client
 * Replace API_BASE with your actual API Gateway Invoke URL after setup.
 */

const API_BASE =
    import.meta.env.VITE_API_URL ?? "";

export interface CheckIn {
    id: string;
    timestamp: string;
    location: string;
    code?: string;
    vehicleNumber?: string;
    licensePlate?: string;
    vinNumber?: string;
    carMake?: string;
    carColor?: string;
}

export interface CreateCheckInPayload {
    location: string;
    code?: string;
    vehicleNumber?: string;
    licensePlate?: string;
    vinNumber?: string;
    carMake?: string;
    carColor?: string;
}

/** POST /checkins — save a new check-in */
export async function createCheckIn(
    payload: CreateCheckInPayload,
): Promise<void> {
    const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
    }
    // 201 Created — no need to parse the response body
}

/** GET /checkins — fetch all check-ins (optional location filter) */
export async function getCheckIns(location?: string): Promise<CheckIn[]> {
    const url = new URL(`${API_BASE}`);
    if (location) url.searchParams.set("location", location);

    const res = await fetch(url.toString());

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return res.json();
}

export interface DeleteCheckInPayload {
    id: string;       // partition key — identifies the exact DynamoDB item
    location: string; // include in case your table uses location as a sort key
}

/** DELETE /checkins — remove a check-in by id */
export async function deleteCheckIn(
    payload: DeleteCheckInPayload,
): Promise<void> {
    const res = await fetch(`${API_BASE}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
    }
}
