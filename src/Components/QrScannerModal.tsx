import { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Html5Qrcode } from "html5-qrcode";

interface Props {
    onScan?: (result: string) => void;
}

const SCANNER_ID = "qr-scanner-region";

function QrScannerModal({ onScan }: Props) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [scanned, setScanned] = useState<string | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    const stopScanner = async () => {
        try {
            if (scannerRef.current?.isScanning) {
                await scannerRef.current.stop();
            }
            scannerRef.current?.clear();
        } catch {
            // already stopped — ignore
        }
        scannerRef.current = null;
    };

    const startScanner = async () => {
        setCameraError(null);
        setScanned(null);
        try {
            const scanner = new Html5Qrcode(SCANNER_ID);
            scannerRef.current = scanner;

            await scanner.start(
                { facingMode: "environment" }, // back camera on phones
                { fps: 10, qrbox: { width: 260, height: 260 } },
                (decodedText) => {
                    console.log("QR scanned:", decodedText);
                    setScanned(decodedText);
                    onScan?.(decodedText);
                    stopScanner();
                },
                () => {
                    // per-frame decode errors are expected — no QR in frame yet
                },
            );
        } catch {
            setCameraError(
                "Camera access was denied or is not available on this device.",
            );
        }
    };

    // Start scanner 150ms after the dialog opens (gives React time to mount the div)
    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => startScanner(), 150);
        return () => clearTimeout(timer);
    }, [open]);

    const handleOpen = () => {
        setScanned(null);
        setCameraError(null);
        setOpen(true);
    };

    const handleClose = async () => {
        await stopScanner();
        setOpen(false);
        setScanned(null);
        setCameraError(null);
    };

    return (
        <>
            {/* ── Trigger button ─────────────────────────────────── */}
            <Button
                variant="outlined"
                startIcon={<QrCodeScannerIcon />}
                onClick={handleOpen}
                sx={{
                    borderColor: theme.palette.divider,
                    color: "text.secondary",
                    borderRadius: "2px",
                    px: 3,
                    py: 1.75,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    "&:hover": {
                        borderColor: "primary.main",
                        color: "primary.main",
                        bgcolor: "transparent",
                    },
                }}
            >
                Scan QR Code
            </Button>

            {/* ── Scanner dialog ─────────────────────────────────── */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: "background.default",
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: "2px",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: theme.typography.h4.fontFamily,
                        color: "text.primary",
                        pb: 1,
                    }}
                >
                    Scan QR Code
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{ color: "text.secondary" }}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ pb: 3 }}>
                    {/* ── Success state ─────────────────────────── */}
                    {scanned && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                                py: 4,
                            }}
                        >
                            <CheckCircleOutlineIcon
                                sx={{
                                    fontSize: "3rem",
                                    color: "primary.main",
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: theme.typography.h4.fontFamily,
                                    color: "text.primary",
                                }}
                            >
                                Scanned Successfully
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    wordBreak: "break-all",
                                    textAlign: "center",
                                }}
                            >
                                {scanned}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                    setScanned(null);
                                    setTimeout(() => startScanner(), 150);
                                }}
                                sx={{
                                    mt: 1,
                                    borderRadius: "2px",
                                    borderColor: theme.palette.divider,
                                    color: "text.secondary",
                                }}
                            >
                                Scan Again
                            </Button>
                        </Box>
                    )}

                    {/* ── Error state ───────────────────────────── */}
                    {cameraError && !scanned && (
                        <Box sx={{ py: 4, textAlign: "center" }}>
                            <Typography
                                variant="body2"
                                sx={{ color: "error.main", mb: 2 }}
                            >
                                {cameraError}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "text.disabled" }}
                            >
                                Make sure you've allowed camera access in your
                                browser settings.
                            </Typography>
                        </Box>
                    )}

                    {/* ── Live camera view ──────────────────────── */}
                    {!scanned && !cameraError && (
                        <>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    mb: 2,
                                    textAlign: "center",
                                }}
                            >
                                Point your camera at a QR code
                            </Typography>
                            {/* html5-qrcode mounts its video feed here */}
                            <Box
                                id={SCANNER_ID}
                                sx={{
                                    width: "100%",
                                    "& video": { borderRadius: "2px" },
                                    "& img": { display: "none" }, // hide the library's default icon
                                }}
                            />
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default QrScannerModal;
