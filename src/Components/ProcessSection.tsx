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
        description: "Schedule your appointment. We come to you.",
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
                <Box className="section-header" sx={{ mb: { xs: 8, md: 12 } }}>
                    <Typography
                        variant="subtitle2"
                        className="section-eyebrow"
                        data-aos="fade-up"
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
                    <Box className="process-connector" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <Box
                                key={step.title}
                                className="process-step"
                                data-aos="fade-up"
                                data-aos-delay={index * 120}
                            >
                                {/* Icon circle — only theme colours stay in sx */}
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
            </Container>
        </Box>
    );
}

export default ProcessSection;
