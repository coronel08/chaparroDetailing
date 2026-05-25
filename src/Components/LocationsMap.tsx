import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Typography, useTheme } from "@mui/material";
import L from "leaflet";
import PlaceIcon from "@mui/icons-material/Place";
import { renderToStaticMarkup } from "react-dom/server";

// ── Swap these for your real site coordinates / names ─────────────────────
const LOCATIONS = [
    {
        id: "loc-1",
        label: "Location 1",
        address: "Downtown Los Angeles, CA",
        lat: 34.0522,
        lng: -118.2437,
    },
    {
        id: "loc-2",
        label: "Location 2",
        address: "Pasadena, CA",
        lat: 34.1478,
        lng: -118.1445,
    },
    {
        id: "loc-3",
        label: "Location 3",
        address: "Burbank, CA",
        lat: 34.1808,
        lng: -118.3089,
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

function LocationsMap() {
    const theme = useTheme();
    const markerColor = theme.palette.primary.main;
    const icon = makeIcon(markerColor);

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
                    zoom={10}
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
                                <Box sx={{ p: 0.5 }}>
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                theme.typography.h6.fontFamily,
                                            fontWeight: 600,
                                            fontSize: "0.95rem",
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
                                            sx={{ color: "text.secondary" }}
                                        >
                                            {loc.address}
                                        </Typography>
                                    </Box>
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
