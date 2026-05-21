import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

const testimonials = [
    {
        name: "Sarah T.",
        vehicle: "Toyota Corolla LX",
        quote: "Absolutely incredible work. The paint correction brought out a depth in the black paint I didn't know existed. The ceramic coating makes washing it a breeze.",
    },
    {
        name: "Michael L.",
        vehicle: "Ford F-250",
        quote: "They managed to get out oil stains in my work truck that I thought were permanent. The interior looks and smells like it just rolled off the showroom floor.",
    },
    {
        name: "David R.",
        vehicle: "BMW M3",
        quote: "Professional, meticulous, and truly passionate about what they do. Chaparro is the only place I trust with my vehicles. Worth every penny.",
    },
];

function TestimonialsSection() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, md: 14 },
                bgcolor: "background.default",
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="lg">
                {/* ── Header ─────────────────────────────────────────── */}
                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        variant="subtitle2"
                        data-aos="fade-up"
                        sx={{ mb: 2, display: "block" }}
                    >
                        Client Reviews
                    </Typography>
                    <Typography
                        variant="h2"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Word of Mouth
                    </Typography>
                </Box>

                {/* ── Cards ──────────────────────────────────────────── */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {testimonials.map((t, index) => (
                        <Card
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                            sx={{
                                p: 1,
                                height: "100%",
                                border: `1px solid ${theme.palette.divider}`,
                                bgcolor: alpha(
                                    theme.palette.background.paper,
                                    0.5,
                                ),
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                {/* 5 stars */}
                                <Box sx={{ display: "flex", gap: 0.5, mb: 3 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            sx={{
                                                fontSize: "1rem",
                                                color: "primary.main",
                                            }}
                                        />
                                    ))}
                                </Box>

                                {/* Quote */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontStyle: "italic",
                                        mb: 4,
                                        lineHeight: 1.75,
                                        color: "text.primary",
                                        fontSize: { xs: "0.95rem", md: "1rem" },
                                    }}
                                >
                                    "{t.quote}"
                                </Typography>

                                {/* Attribution */}
                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                theme.typography.h4.fontFamily,
                                            fontSize: "1.2rem",
                                            color: "text.primary",
                                        }}
                                    >
                                        {t.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.disabled", mt: 0.5 }}
                                    >
                                        {t.vehicle}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default TestimonialsSection;
