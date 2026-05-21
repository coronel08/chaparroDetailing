import { Box, Typography, useTheme } from "@mui/material";

function HeroSection() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            id="home"
            className="hero-section"
            sx={{ minHeight: { xs: "600px", md: "100vh" } }}
        >
            {/* ── Background image ───────────────────────────────────── */}
            <Box
                component="img"
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=2000"
                alt="Glossy black car"
                className="hero-bg-img"
            />

            {/* ── Gradient overlay — background uses theme color ──────── */}
            <Box
                className="hero-overlay"
                sx={{
                    background: `linear-gradient(
                        to bottom,
                        ${theme.palette.background.default}cc 0%,
                        ${theme.palette.background.default}66 40%,
                        ${theme.palette.background.default} 100%
                    )`,
                }}
            />

            {/* ── Content ─────────────────────────────────────────────── */}
            <Box
                className="hero-content"
                sx={{
                    px: { xs: 3, sm: 4, md: 6 },
                    pt: { xs: "90px", md: "110px" },
                }}
            >
                <Box sx={{ maxWidth: { xs: "100%", md: "700px" } }}>
                    {/* Eyebrow label */}
                    <Typography
                        variant="subtitle2"
                        className="section-eyebrow"
                        data-aos="fade-up"
                        data-aos-delay="200"
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

                    {/* Sub-heading */}
                    <Typography
                        variant="body1"
                        className="hero-body"
                        data-aos="fade-up"
                        data-aos-delay="400"
                        sx={{ mb: 5, fontSize: { xs: "1rem", md: "1.125rem" } }}
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
