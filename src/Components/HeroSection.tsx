import { Box, Button, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

function HeroSection() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            id="home"
            sx={{
                position: "relative",
                minHeight: { xs: "600px", md: "100vh" },
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            {/* ── Background image (zooms in on load via CSS animation) ── */}
            <Box
                component="img"
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=2000"
                alt="Glossy black car"
                sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    zIndex: 0,
                    // Animate from scale(1.1) → scale(1) on page load
                    animation: "heroZoom 1.5s ease-out forwards",
                }}
            />

            {/* ── Gradient overlay (dark top → semi → full dark bottom) ── */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(
                        to bottom,
                        ${theme.palette.background.default}cc 0%,
                        ${theme.palette.background.default}66 40%,
                        ${theme.palette.background.default} 100%
                    )`,
                    zIndex: 1,
                }}
            />

            {/* ── Content ─────────────────────────────────────────────── */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "1280px",
                    mx: "auto",
                    px: { xs: 3, sm: 4, md: 6 },
                    width: "100%",
                    pt: { xs: "90px", md: "110px" }, // offset for fixed navbar
                }}
            >
                <Box sx={{ maxWidth: { xs: "100%", md: "700px" } }}>
                    {/* Eyebrow label */}
                    <Typography
                        variant="subtitle2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                        sx={{ mb: 2, display: "block" }}
                    >
                        Premium Automotive Care
                    </Typography>

                    {/* Main heading */}
                    <Typography
                        variant="h1"
                        data-aos="fade-up"
                        data-aos-delay="300"
                        sx={{ mb: 3 }}
                    >
                        Showroom shine.
                        <br />
                        <Box component="span" sx={{ color: "text.secondary" }}>
                            Every time.
                        </Box>
                    </Typography>

                    {/* Subheading */}
                    <Typography
                        variant="body1"
                        data-aos="fade-up"
                        data-aos-delay="400"
                        sx={{
                            mb: 5,
                            maxWidth: "520px",
                            lineHeight: 1.75,
                            fontSize: { xs: "1rem", md: "1.125rem" },
                        }}
                    >
                        Meticulous detailing, paint correction, and ceramic
                        coating delivered to you on your time.
                        <br />
                        Mobile Detailing at an affordable price.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default HeroSection;
