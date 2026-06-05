import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Typography, useTheme } from "@mui/material";
import L from "leaflet";
import PlaceIcon from "@mui/icons-material/Place";
import { renderToStaticMarkup } from "react-dom/server";
import type { CheckIn } from "../api/checkins";

// ── Swap these for your real site coordinates / names ─────────────────────
const LOCATIONS = [
    {
        id: "Manchester Hertz",
        label: "Manchester Hertz",
        address: "970 W Manchester Blvd, Inglewood, CA 90301",
        lat: 33.9597463,
        lng: -118.3732024,
    },
    {
        id: "Century Hertz",
        label: "Century Hertz",
        address: "5251 W 98th St, Los Angeles, CA",
        lat: 33.9500921,
        lng: -118.3735559,
    },
    {
        id: "LAX",
        label: "LAX",
        address: "1 World Way, Los Angeles, CA 90045",
        lat: 33.9460203,
        lng: -118.4010335,
    },
];

// Build a custom SVG marker using the MUI PlaceIcon color
const makeIcon = (color: string) =>
    L.divIcon({
        className: "",
        html: renderToStaticMarkup(
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill={color}
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
            >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>,
        ),
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -34],
    });

// Center map on the average of all marker coords
const centerLat =
    LOCATIONS.reduce((sum, l) => sum + l.lat, 0) / LOCATIONS.length;
const centerLng =
    LOCATIONS.reduce((sum, l) => sum + l.lng, 0) / LOCATIONS.length;

interface Props {
    rows: CheckIn[];
}

function LocationsMap({ rows }: Props) {
    const theme = useTheme();
    const markerColor = theme.palette.primary.main;
    const icon = makeIcon(markerColor);

    // Count check-ins per location address — derived from shared rows
    const counts = useMemo(() => {
        const tally: Record<string, number> = {};
        for (const row of rows) {
            tally[row.location] = (tally[row.location] ?? 0) + 1;
        }
        return tally;
    }, [rows]);

    return (
        <Box
            sx={{
                mt: { xs: 8, md: 12 },
                borderTop: `1px solid ${theme.palette.divider}`,
                pt: { xs: 6, md: 8 },
            }}
        >
            <Typography
                variant="subtitle2"
                className="section-eyebrow"
                sx={{ mb: 1 }}
            >
                Service Locations
            </Typography>

            <Box
                sx={{
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: `1px solid ${theme.palette.divider}`,
                    height: { xs: 320, md: 440 },
                    // Leaflet popup style overrides to match dark theme
                    "& .leaflet-popup-content-wrapper": {
                        bgcolor: theme.palette.background.paper,
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRadius: "2px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        border: `1px solid ${theme.palette.divider}`,
                    },
                    "& .leaflet-popup-tip": {
                        background: theme.palette.background.paper,
                    },
                    "& .leaflet-popup-close-button": {
                        color: `${theme.palette.text.secondary} !important`,
                    },
                    "& .leaflet-tile": {
                        filter: "brightness(0.85) saturate(0.7)",
                    },
                }}
            >
                <MapContainer
                    center={[centerLat, centerLng]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                >
                    {/* Free OpenStreetMap tiles — no API key needed */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {LOCATIONS.map((loc) => (
                        <Marker
                            key={loc.id}
                            position={[loc.lat, loc.lng]}
                            icon={icon}
                        >
                            <Popup>
                                <Box sx={{ p: 0.2 }}>
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                theme.typography.h6.fontFamily,
                                            fontWeight: 600,
                                            fontSize: "1.25rem",
                                            color: "text.primary",
                                            mb: 0.25,
                                        }}
                                    >
                                        {loc.label}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                        }}
                                    >
                                        <PlaceIcon
                                            sx={{
                                                fontSize: "0.85rem",
                                                color: markerColor,
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: ".85rem",
                                            }}
                                        >
                                            {loc.address}
                                        </Typography>
                                    </Box>

                                    {/* Check-in count badge */}
                                    {counts[loc.address] !== undefined && (
                                        <Box
                                            sx={{
                                                mt: 1,
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                                px: 1,
                                                py: 0.25,
                                                borderRadius: "2px",
                                                bgcolor: `${markerColor}22`,
                                                border: `1px solid ${markerColor}55`,
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: markerColor,
                                                    fontWeight: 700,
                                                    fontSize: "1rem",
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {counts[loc.address]}{" "}
                                                {counts[loc.address] === 1
                                                    ? "check-in"
                                                    : "check-ins"}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Box>
        </Box>
    );
}

export default LocationsMap;
