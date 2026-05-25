import { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
    useTheme,
    type SelectChangeEvent,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import type { SvgIconComponent } from "@mui/icons-material";
import { Html5Qrcode } from "html5-qrcode";
import LocationsMap from "./LocationsMap";

const stepIcons: SvgIconComponent[] = [
    CalendarMonthIcon,
    SearchIcon,
    AutoAwesomeIcon,
    VpnKeyIcon,
];

const LOCATIONS = [
    { value: "loc-1", label: "Location 1" },
    { value: "loc-2", label: "Location 2" },
    { value: "loc-3", label: "Location 3" },
];

const SCANNER_ID = "inline-qr-region";

function ProcessSection() {
    const theme = useTheme();
    const { t } = useTranslation();

    // ── Check-in form state ──────────────────────────────────────────────
    const [code, setCode] = useState("");
    const [location, setLocation] = useState("");
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    const stopScanner = async () => {
        try {
            if (scannerRef.current?.isScanning) {
                await scannerRef.current.stop();
            }
            scannerRef.current?.clear();
        } catch {
            // already stopped
        }
        scannerRef.current = null;
    };

    const startScanner = async () => {
        try {
            const scanner = new Html5Qrcode(SCANNER_ID);
            scannerRef.current = scanner;
            await scanner.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 220, height: 220 } },
                (decoded) => {
                    setCode(decoded);
                    stopScanner();
                    setScanning(false);
                },
                () => {},
            );
        } catch {
            setScanning(false);
        }
    };

    useEffect(() => {
        if (!scanning) return;
        const timer = setTimeout(() => startScanner(), 100);
        return () => clearTimeout(timer);
    }, [scanning]);

    // Clean up camera if component unmounts
    useEffect(
        () => () => {
            stopScanner();
        },
        [],
    );

    const handleToggleScan = async () => {
        if (scanning) {
            await stopScanner();
            setScanning(false);
        } else {
            setScanning(true);
        }
    };

    const handleSubmit = () => {
        console.log("Check-in submitted:", { code, location });
    };

    const canSubmit = code.trim() !== "" && location !== "";

    const steps = t("process.steps", { returnObjects: true }) as {
        title: string;
        description: string;
    }[];

    return (
        <Box
            component="section"
            id="process"
            sx={{
                py: { xs: 10, md: 14 },
                bgcolor: "background.default",
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="lg">
                {/* ── Header ─────────────────────────────────────────── */}
                <Box className="section-header" sx={{ mb: { xs: 8, md: 12 } }}>
                    <Typography
                        variant="subtitle2"
                        className="section-eyebrow"
                        data-aos="fade-up"
                    >
                        {t("process.eyebrow")}
                    </Typography>
                    <Typography
                        variant="h2"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        {t("process.heading")}
                    </Typography>
                </Box>

                {/* ── Steps grid ──────────────────────────────────────── */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: { xs: 6, md: 5 },
                        position: "relative",
                    }}
                >
                    <Box className="process-connector" />

                    {steps.map((step, index) => {
                        const Icon = stepIcons[index];
                        return (
                            <Box
                                key={index}
                                className="process-step"
                                data-aos="fade-up"
                                data-aos-delay={index * 120}
                            >
                                <Box
                                    className="process-icon-circle"
                                    sx={{
                                        bgcolor: "background.paper",
                                        border: `1px solid ${theme.palette.divider}`,
                                        "&:hover": {
                                            borderColor: alpha(
                                                theme.palette.primary.main,
                                                0.5,
                                            ),
                                            bgcolor: alpha(
                                                theme.palette.background.paper,
                                                0.9,
                                            ),
                                        },
                                    }}
                                >
                                    <Icon
                                        sx={{
                                            fontSize: "2.5rem",
                                            color: "primary.main",
                                        }}
                                    />
                                </Box>

                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    {step.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    className="process-step-text"
                                    sx={{ color: "text.secondary" }}
                                >
                                    {step.description}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                {/* ── Check-in row ─────────────────────────────────────── */}
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
                        sx={{ mb: 3 }}
                    >
                        Check In
                    </Typography>

                    {/* Inline camera — only rendered when scanning */}
                    {scanning && (
                        <Box
                            sx={{
                                mb: 3,
                                maxWidth: 320,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: "2px",
                                overflow: "hidden",
                                "& video": { display: "block", width: "100%" },
                                "& img": { display: "none" },
                            }}
                        >
                            <Box id={SCANNER_ID} />
                        </Box>
                    )}

                    {/* One row: [scan icon] [code input] [location] [submit] */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { sm: "center" },
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Scan toggle icon button */}
                        <Tooltip
                            title={scanning ? "Stop camera" : "Scan QR code"}
                        >
                            <IconButton
                                onClick={handleToggleScan}
                                sx={{
                                    border: `1px solid ${scanning ? theme.palette.primary.main : theme.palette.divider}`,
                                    borderRadius: "2px",
                                    color: scanning
                                        ? "primary.main"
                                        : "text.secondary",
                                    bgcolor: scanning
                                        ? alpha(
                                              theme.palette.primary.main,
                                              0.08,
                                          )
                                        : "transparent",
                                    width: 44,
                                    height: 44,
                                    flexShrink: 0,
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        color: "primary.main",
                                    },
                                }}
                            >
                                {scanning ? (
                                    <CloseIcon fontSize="small" />
                                ) : (
                                    <QrCodeScannerIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Tooltip>

                        {/* Code text input */}
                        <TextField
                            label="Code"
                            variant="outlined"
                            size="small"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Scan or type code"
                            sx={{
                                flex: 1,
                                minWidth: { xs: "100%", sm: 80 },
                                maxWidth: "400px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "2px",
                                },
                            }}
                        />

                        {/* Location select */}
                        <FormControl
                            size="small"
                            sx={{
                                minWidth: { xs: "100%", sm: 200 },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "2px",
                                },
                            }}
                        >
                            <InputLabel id="checkin-loc-label">
                                Location
                            </InputLabel>
                            <Select
                                labelId="checkin-loc-label"
                                value={location}
                                label="Location"
                                onChange={(e: SelectChangeEvent) =>
                                    setLocation(e.target.value)
                                }
                            >
                                {LOCATIONS.map((loc) => (
                                    <MenuItem key={loc.value} value={loc.value}>
                                        {loc.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Submit */}
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            disabled={!canSubmit}
                            onClick={handleSubmit}
                            sx={{
                                borderRadius: "2px",
                                px: 3,
                                py: 1,
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                width: { xs: "100%", sm: "auto" },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                {/* ── Locations map ───────────────────────────────────── */}
                <LocationsMap />
            </Container>
        </Box>
    );
}

export default ProcessSection;
