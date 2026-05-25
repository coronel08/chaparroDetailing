import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme,
    type SelectChangeEvent,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import QrScannerModal from "./QrScannerModal";

// ── Swap these out for real locations later ────────────────────────────────
const LOCATIONS = [
    { value: "loc-1", label: "Location 1" },
    { value: "loc-2", label: "Location 2" },
    { value: "loc-3", label: "Location 3" },
];

function CheckInCard() {
    const theme = useTheme();

    const [inputMode, setInputMode] = useState<"scan" | "manual">("scan");
    const [code, setCode] = useState("");
    const [location, setLocation] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleLocationChange = (e: SelectChangeEvent) =>
        setLocation(e.target.value);

    const handleScan = (result: string) => {
        setCode(result);
        // Auto-switch to manual view so the user can see what was scanned
        setInputMode("manual");
    };

    const handleSubmit = () => {
        const payload = { code, location };
        console.log("Check-in submitted:", payload);
        setSubmitted(true);
    };

    const handleReset = () => {
        setCode("");
        setLocation("");
        setSubmitted(false);
        setInputMode("scan");
    };

    const canSubmit = code.trim() !== "" && location !== "";

    // ── Success state ──────────────────────────────────────────────────────
    if (submitted) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    py: 6,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    mt: { xs: 8, md: 12 },
                    pt: { xs: 6, md: 8 },
                    textAlign: "center",
                }}
            >
                <CheckCircleOutlineIcon
                    sx={{ fontSize: "3rem", color: "primary.main" }}
                />
                <Typography variant="h4" sx={{ color: "text.primary" }}>
                    Checked In!
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Code: <strong>{code}</strong> &nbsp;·&nbsp; Location:{" "}
                    <strong>
                        {LOCATIONS.find((l) => l.value === location)?.label}
                    </strong>
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleReset}
                    sx={{
                        mt: 1,
                        borderRadius: "2px",
                        borderColor: theme.palette.divider,
                        color: "text.secondary",
                    }}
                >
                    New Check-In
                </Button>
            </Box>
        );
    }

    // ── Form state ─────────────────────────────────────────────────────────
    return (
        <Box
            sx={{
                mt: { xs: 8, md: 12 },
                borderTop: `1px solid ${theme.palette.divider}`,
                pt: { xs: 6, md: 8 },
            }}
        >
            {/* Section label */}
            <Typography
                variant="subtitle2"
                className="section-eyebrow"
                sx={{ mb: 3 }}
            >
                Check In
            </Typography>

            <Box
                sx={{
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "2px",
                    p: { xs: 3, md: 4 },
                    maxWidth: "600px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                {/* ── Mode toggle ─────────────────────────────── */}
                <ToggleButtonGroup
                    value={inputMode}
                    exclusive
                    onChange={(_, val) => val && setInputMode(val)}
                    size="small"
                    sx={{
                        "& .MuiToggleButton-root": {
                            borderRadius: "2px",
                            borderColor: theme.palette.divider,
                            color: "text.secondary",
                            px: 2.5,
                            py: 1,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            textTransform: "none",
                            gap: 1,
                            "&.Mui-selected": {
                                bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.12,
                                ),
                                color: "primary.main",
                                borderColor: theme.palette.primary.main,
                                "&:hover": {
                                    bgcolor: alpha(
                                        theme.palette.primary.main,
                                        0.18,
                                    ),
                                },
                            },
                        },
                    }}
                >
                    <ToggleButton value="scan">
                        <QrCodeScannerIcon sx={{ fontSize: "1rem" }} />
                        Scan QR
                    </ToggleButton>
                    <ToggleButton value="manual">
                        <KeyboardIcon sx={{ fontSize: "1rem" }} />
                        Enter Code
                    </ToggleButton>
                </ToggleButtonGroup>

                {/* ── Code input ──────────────────────────────── */}
                {inputMode === "scan" ? (
                    <Box
                        sx={{
                            // display: "flex",
                            alignItems: "center",
                            gap: 2,
                            // flexWrap: "wrap",
                        }}
                    >
                        <QrScannerModal onScan={handleScan} />
                        {code && (
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                Scanned:{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: 600,
                                    }}
                                >
                                    {code}
                                </Box>
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <TextField
                        label="Enter Code"
                        variant="outlined"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="e.g. CHE-00123"
                        size="small"
                        // fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "2px",
                            },
                        }}
                    />
                )}

                {/* ── Location dropdown ───────────────────────── */}
                <FormControl fullWidth size="small">
                    <InputLabel id="checkin-location-label">
                        Select Location
                    </InputLabel>
                    <Select
                        labelId="checkin-location-label"
                        value={location}
                        label="Select Location"
                        onChange={handleLocationChange}
                        sx={{ borderRadius: "2px" }}
                    >
                        {LOCATIONS.map((loc) => (
                            <MenuItem key={loc.value} value={loc.value}>
                                {loc.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* ── Submit ──────────────────────────────────── */}
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                    sx={{
                        alignSelf: "flex-start",
                        borderRadius: "2px",
                        px: 4,
                        py: 1.25,
                        fontWeight: 600,
                    }}
                >
                    Submit Check-In
                </Button>
            </Box>
        </Box>
    );
}

export default CheckInCard;
