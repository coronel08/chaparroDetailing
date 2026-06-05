import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
    type SelectChangeEvent,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import RefreshIcon from "@mui/icons-material/Refresh";
import { type CheckIn, deleteCheckIn } from "../api/checkins";
import { LOCATIONS, HEX_COLORS } from "../constants";

const COLS = [
    { key: "timestamp", label: "Time" },
    { key: "location", label: "Location" },
    { key: "code", label: "Code" },
    { key: "vehicleNumber", label: "Vehicle #" },
    { key: "licensePlate", label: "Plate" },
    { key: "vinNumber", label: "VIN" },
    { key: "carMake", label: "Make" },
    { key: "carColor", label: "Color" },
    { key: "actions", label: "" },
] as const;

function formatTime(iso: string) {
    return new Date(iso).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ── Shared cell sx presets ─────────────────────────────────────────────────
const CELL = {
    head: {
        fontSize: "0.92rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        whiteSpace: "nowrap" as const,
    },
    time: {
        fontSize: "0.98rem",
        color: "text.secondary",
        whiteSpace: "nowrap" as const,
    },
    base: { fontSize: "1.02rem" },
    bold: { fontSize: "1.02rem", fontWeight: 600 },
    mono: {
        fontSize: "0.92rem",
        color: "text.secondary",
        fontFamily: "monospace",
    },
};

interface Props {
    rows: CheckIn[];
    loading: boolean;
    error: string | null;
    onRefresh: () => void;
}

function CheckInsTable({ rows: allRows, loading, error, onRefresh }: Props) {
    const theme = useTheme();
    const [filterLocation, setFilterLocation] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, location: string) => {
        setDeletingId(id);
        try {
            await deleteCheckIn({ id, location });
            onRefresh(); // re-fetch after delete
        } catch (e) {
            console.error("Delete failed:", e);
        } finally {
            setDeletingId(null);
        }
    };

    // Client-side filter — no extra API call needed
    const rows = useMemo(
        () =>
            filterLocation
                ? allRows.filter((r) => r.location === filterLocation)
                : allRows,
        [allRows, filterLocation],
    );

    return (
        <Box
            sx={{
                mt: { xs: 6, md: 8 },
                borderTop: `1px solid ${theme.palette.divider}`,
                pt: { xs: 4, md: 6 },
            }}
        >
            {/* Header row */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    mb: 2,
                }}
            >
                <Typography
                    variant="subtitle2"
                    className="section-eyebrow"
                    sx={{ mb: 0, flexGrow: 1 }}
                >
                    Check-In Log
                    {filterLocation && (
                        <Typography
                            component="span"
                            variant="caption"
                            sx={{
                                ml: 1.5,
                                color: "primary.main",
                                fontWeight: 400,
                            }}
                        >
                            {
                                LOCATIONS.find(
                                    (l) => l.value === filterLocation,
                                )?.label
                            }
                        </Typography>
                    )}
                </Typography>

                {/* Location filter */}
                <FormControl
                    size="small"
                    sx={{
                        minWidth: 160,
                        "& .MuiOutlinedInput-root": { borderRadius: "2px" },
                    }}
                >
                    <InputLabel id="table-loc-filter-label">
                        Filter Location
                    </InputLabel>
                    <Select
                        labelId="table-loc-filter-label"
                        value={filterLocation}
                        label="Filter Location"
                        onChange={(e: SelectChangeEvent) =>
                            setFilterLocation(e.target.value)
                        }
                    >
                        <MenuItem value="">
                            <em style={{ color: "gray" }}>All Locations</em>
                        </MenuItem>
                        {LOCATIONS.map((loc) => (
                            <MenuItem key={loc.value} value={loc.value}>
                                {loc.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Tooltip title="Refresh">
                    <IconButton
                        size="small"
                        onClick={onRefresh}
                        sx={{ color: "text.secondary" }}
                    >
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Loading */}
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                    <CircularProgress size={28} />
                </Box>
            )}

            {/* Error */}
            {!loading && error && (
                <Typography variant="body2" sx={{ color: "error.main", py: 3 }}>
                    Could not load records: {error}
                </Typography>
            )}

            {/* Empty */}
            {!loading && !error && rows.length === 0 && (
                <Typography
                    variant="body2"
                    sx={{ color: "text.disabled", py: 3 }}
                >
                    {filterLocation
                        ? `No check-ins at ${LOCATIONS.find((l) => l.value === filterLocation)?.label ?? filterLocation}.`
                        : "No check-ins yet."}
                </Typography>
            )}

            {/* Table */}
            {!loading && !error && rows.length > 0 && (
                <TableContainer
                    sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: "2px",
                        maxHeight: 400,
                        overflowY: "auto",
                    }}
                >
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {COLS.map((col) => (
                                    <TableCell
                                        key={col.key}
                                        sx={{
                                            ...CELL.head,
                                            bgcolor: "background.paper",
                                            color: "text.secondary",
                                            borderBottom: `1px solid ${theme.palette.divider}`,
                                        }}
                                    >
                                        {col.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:hover": {
                                            bgcolor: alpha(
                                                theme.palette.primary.main,
                                                0.04,
                                            ),
                                        },
                                    }}
                                >
                                    {/* Time */}
                                    <TableCell sx={CELL.time}>
                                        {formatTime(row.timestamp)}
                                    </TableCell>

                                    {/* Location */}
                                    <TableCell sx={CELL.base}>
                                        <Chip
                                            label={row.location}
                                            size="small"
                                            sx={{
                                                fontSize: "0.85rem",
                                                height: 20,
                                                bgcolor: alpha(
                                                    theme.palette.primary.main,
                                                    0.1,
                                                ),
                                                color: "primary.main",
                                                borderRadius: "2px",
                                            }}
                                        />
                                    </TableCell>

                                    {/* Code */}
                                    <TableCell sx={CELL.base}>
                                        {row.code ?? "—"}
                                    </TableCell>

                                    {/* Vehicle # */}
                                    <TableCell sx={CELL.base}>
                                        {row.vehicleNumber ?? "—"}
                                    </TableCell>

                                    {/* Plate */}
                                    <TableCell sx={CELL.bold}>
                                        {row.licensePlate ?? "—"}
                                    </TableCell>

                                    {/* VIN */}
                                    <TableCell sx={CELL.mono}>
                                        {row.vinNumber ?? "—"}
                                    </TableCell>

                                    {/* Make */}
                                    <TableCell sx={CELL.base}>
                                        {row.carMake ?? "—"}
                                    </TableCell>

                                    {/* Color swatch */}
                                    <TableCell>
                                        {row.carColor ? (
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
                                                                row.carColor as keyof typeof HEX_COLORS
                                                            ] ?? "#888",
                                                        border: `1px solid rgba(255,255,255,0.2)`,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    {row.carColor}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            "—"
                                        )}
                                    </TableCell>

                                    {/* Remove */}
                                    <TableCell sx={{ pr: 1 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            disabled={deletingId === row.id}
                                            onClick={() => handleDelete(row.id, row.location)}
                                            sx={{
                                                borderRadius: "2px",
                                                fontSize: "0.7rem",
                                                py: 0.25,
                                                px: 1,
                                                minWidth: 0,
                                                lineHeight: 1.5,
                                                borderColor: "error.main",
                                                color: "error.main",
                                                "&:hover": {
                                                    bgcolor: "error.main",
                                                    color: "#fff",
                                                },
                                            }}
                                        >
                                            {deletingId === row.id ? "…" : "Remove"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default CheckInsTable;
