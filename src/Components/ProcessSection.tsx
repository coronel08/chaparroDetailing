import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
import {
    CalendarMonth,
    Search,
    AutoAwesome,
    VpnKey,
    QrCodeScanner,
    Close,
    type SvgIconComponent,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Html5Qrcode } from "html5-qrcode";

import LocationsMap from "./LocationsMap";
import CheckInsTable from "./CheckInsTable";
import { createCheckIn, getCheckIns, type CheckIn } from "../api/checkins";
import { HEX_COLORS, LOCATIONS, CAR_MAKES } from "../constants";

const stepIcons: SvgIconComponent[] = [
    CalendarMonth,
    Search,
    AutoAwesome,
    VpnKey,
];

// ── Shared fetch state for check-ins ────────────────────────────────────────
type FetchState =
    | { status: "loading" }
    | { status: "error"; error: string }
    | { status: "ok"; rows: CheckIn[] };

type FetchAction =
    | { type: "fetch" }
    | { type: "success"; rows: CheckIn[] }
    | { type: "error"; error: string };

function fetchReducer(_: FetchState, action: FetchAction): FetchState {
    if (action.type === "fetch") return { status: "loading" };
    if (action.type === "success") return { status: "ok", rows: action.rows };
    return { status: "error", error: action.error };
}

const SCANNER_ID = "inline-qr-region";

function ProcessSection() {
    const theme = useTheme();
    const { t } = useTranslation();

    // ── Check-in form state ──────────────────────────────────────────────
    const [code, setCode] = useState("");
    const [location, setLocation] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [vinNumber, setVinNumber] = useState("");
    const [carMake, setCarMake] = useState("");
    const [carColor, setCarColor] = useState("");
    const [scanning, setScanning] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    // ── Single shared fetch ────────────────────────────────────────────
    const [fetchState, dispatch] = useReducer(fetchReducer, {
        status: "loading",
    });

    const fetchCheckIns = useCallback(() => {
        dispatch({ type: "fetch" });
        getCheckIns()
            .then((rows) => dispatch({ type: "success", rows }))
            .catch((e: Error) => dispatch({ type: "error", error: e.message }));
    }, []);

    useEffect(() => {
        fetchCheckIns();
    }, [fetchCheckIns, refreshKey]);

    const checkInRows = fetchState.status === "ok" ? fetchState.rows : [];
    const checkInLoading = fetchState.status === "loading";
    const checkInError =
        fetchState.status === "error" ? fetchState.error : null;

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

    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            await createCheckIn({
                location,
                ...(code && { code }),
                ...(vehicleNumber && { vehicleNumber }),
                ...(licensePlate && { licensePlate }),
                ...(vinNumber && { vinNumber }),
                ...(carMake && { carMake }),
                ...(carColor && { carColor }),
            });
            // Reset form & refresh table
            setCode("");
            setVehicleNumber("");
            setLicensePlate("");
            setVinNumber("");
            setLocation("");
            setCarMake("");
            setCarColor("");
            setRefreshKey((k) => k + 1);
        } catch (e: unknown) {
            setSubmitError(
                e instanceof Error ? e.message : "Submission failed.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Location is always required + at least one identifier
    const canSubmit =
        location !== "" &&
        (code.trim() !== "" ||
            vehicleNumber.trim() !== "" ||
            licensePlate.trim() !== "" ||
            vinNumber.trim() !== "");

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

                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", pb: 4 }}
                    >
                        Submit with at least one unique identifier and tag the
                        key with a location.
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
                                    <Close fontSize="small" />
                                ) : (
                                    <QrCodeScanner fontSize="small" />
                                )}
                            </IconButton>
                        </Tooltip>

                        {/* Code text input */}
                        <TextField
                            label="Code TBA"
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

                        {/* Vehicle number */}
                        <TextField
                            label="Vehicle #"
                            variant="outlined"
                            size="small"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            placeholder="e.g. VH-001"
                            sx={{
                                minWidth: { xs: "100%", sm: 140 },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "2px",
                                },
                            }}
                        />

                        {/* License plate */}
                        <TextField
                            label="License Plate"
                            variant="outlined"
                            size="small"
                            value={licensePlate}
                            onChange={(e) =>
                                setLicensePlate(e.target.value.toUpperCase())
                            }
                            placeholder="e.g. ABC1234"
                            inputProps={{ maxLength: 10 }}
                            sx={{
                                minWidth: { xs: "100%", sm: 150 },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "2px",
                                },
                            }}
                        />

                        {/* VIN Number */}
                        <TextField
                            label="Vin #"
                            variant="outlined"
                            size="small"
                            value={vinNumber}
                            onChange={(e) =>
                                setVinNumber(e.target.value.toUpperCase())
                            }
                            placeholder="1HGCM82633A123456"
                            inputProps={{ maxLength: 17 }}
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
                                <MenuItem value="">
                                    <em style={{ color: "gray" }}>— Clear —</em>
                                </MenuItem>
                                {LOCATIONS.map((loc) => (
                                    <MenuItem key={loc.value} value={loc.value}>
                                        {loc.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Car make (optional) */}
                        <FormControl
                            size="small"
                            sx={{
                                minWidth: { xs: "100%", sm: 160 },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "2px",
                                },
                            }}
                        >
                            <InputLabel id="checkin-make-label">
                                Car Make Optional
                            </InputLabel>
                            <Select
                                labelId="checkin-make-label"
                                value={carMake}
                                label="Car Make"
                                onChange={(e: SelectChangeEvent) =>
                                    setCarMake(e.target.value)
                                }
                            >
                                <MenuItem value="">
                                    <em style={{ color: "gray" }}>— Clear —</em>
                                </MenuItem>
                                {CAR_MAKES.map((make) => (
                                    <MenuItem key={make} value={make}>
                                        {make}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Car color (optional) */}
                        <FormControl
                            size="small"
                            sx={{
                                minWidth: { xs: "100%", sm: 150 },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "2px",
                                },
                            }}
                        >
                            <InputLabel id="checkin-color-label">
                                Color Optional
                            </InputLabel>
                            <Select
                                labelId="checkin-color-label"
                                value={carColor}
                                label="Color"
                                onChange={(e: SelectChangeEvent) =>
                                    setCarColor(e.target.value)
                                }
                                renderValue={(val) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                bgcolor:
                                                    HEX_COLORS[
                                                        val as keyof typeof HEX_COLORS
                                                    ],
                                                border: `1px solid rgba(255,255,255,0.2)`,
                                                flexShrink: 0,
                                            }}
                                        />
                                        {val}
                                    </Box>
                                )}
                            >
                                <MenuItem value="">
                                    <em style={{ color: "gray" }}>— Clear —</em>
                                </MenuItem>
                                {Object.entries(HEX_COLORS).map(
                                    ([name, hex]) => (
                                        <MenuItem key={name} value={name}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1.5,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: "50%",
                                                        bgcolor: hex,
                                                        border: `1px solid rgba(255,255,255,0.2)`,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                {name}
                                            </Box>
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </FormControl>

                        {/* Submit error */}
                        {submitError && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "error.main",
                                    width: "100%",
                                    mt: -1,
                                }}
                            >
                                {submitError}
                            </Typography>
                        )}

                        {/* Submit */}
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            disabled={!canSubmit || submitting}
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
                {/* ── Check-in log table ───────────────────────────────── */}
                <CheckInsTable
                    rows={checkInRows}
                    loading={checkInLoading}
                    error={checkInError}
                    onRefresh={fetchCheckIns}
                />

                {/* ── Locations map ───────────────────────────────────── */}
                <LocationsMap rows={checkInRows} />
            </Container>
        </Box>
    );
}

export default ProcessSection;
