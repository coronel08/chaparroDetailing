import { Box, Container, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const steps = [
    {
        icon: CalendarMonthIcon,
        title: "1. Book",
        description:
            "Schedule your appointment. We come to you.",
    },
    {
        icon: SearchIcon,
        title: "2. Inspect",
        description:
            "We perform a thorough walk-around with you to identify specific areas of concern and set expectations for the work.",
    },
    {
        icon: AutoAwesomeIcon,
        title: "3. Detail",
        description:
            "Our meticulous process begins. We use premium products and proven techniques to restore your vehicle.",
    },
    {
        icon: VpnKeyIcon,
        title: "4. Complete",
        description:
            "Final inspection and walk-through. We hand back the keys to a vehicle that looks better than new.",
    },
];

function ProcessSection() {
    const theme = useTheme();

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
                <Box sx={{ textAlign: "center", mb: { xs: 8, md: 12 } }}>
                    <Typography
                        variant="subtitle2"
                        data-aos="fade-up"
                        sx={{ mb: 2, display: "block" }}
                    >
                        How It Works
                    </Typography>
                    <Typography
                        variant="h2"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        The Chaparro Process
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
                    {/* Horizontal connector line — desktop only (via CSS) */}
                    <Box className="process-connector" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <Box
                                key={step.title}
                                data-aos="fade-up"
                                data-aos-delay={index * 120}
                                sx={{
                                    position: "relative",
                                    zIndex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                {/* Icon circle */}
                                <Box
                                    sx={{
                                        width: 96,
                                        height: 96,
                                        borderRadius: "50%",
                                        bgcolor: "background.paper",
                                        border: `1px solid ${theme.palette.divider}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3,
                                        transition:
                                            "border-color 0.3s, background-color 0.3s",
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
                                    sx={{
                                        lineHeight: 1.7,
                                        maxWidth: "260px",
                                        color: "text.secondary",
                                    }}
                                >
                                    {step.description}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Container>
        </Box>
    );
}

export default ProcessSection;
