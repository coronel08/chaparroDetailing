import { Box, Container, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

const images = [
    {
        url: "https://lirp.cdn-website.com/c3af4caf/dms3rep/multi/opt/mobile_detail_DSC_4439-640w.jpg",
        alt: "Mobile car wash",
        className: "gallery-span-2-col",
    },
    {
        url: "https://cdn.prod.website-files.com/685f5dd0a4967f2406fa8492/685f5dd0a4967f2406fa854b_car-detailing-beaverton-6-copy.jpg",
        alt: "Car wash 2",
        className: "",
    },
    {
        url: "https://images.squarespace-cdn.com/content/v1/5a7fb700d74cffd8f02428bf/1549039763632-Z29HWK0B1MPUE3YUKNXC/What-is-Mobile-Detailing-min.png?format=1500w",
        alt: " Rim wash",
        className: "",
    },
    {
        url: "https://i.ytimg.com/vi/CMBkBZOVkgo/maxresdefault.jpg",
        alt: "Foam wash",
        className: "",
    },
    {
        url: "https://cheetahclean.com/wp-content/uploads/2022/07/Screen-Shot-2022-07-25-at-6.25.40-PM.png",
        alt: " Wax",
        className: "",
    },
];

function GallerySection() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            id="gallery"
            sx={{
                py: { xs: 10, md: 14 },
                bgcolor: "background.paper",
            }}
        >
            <Container maxWidth="lg">
                {/* ── Header ─────────────────────────────────────────── */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { md: "flex-end" },
                        justifyContent: "space-between",
                        mb: 6,
                        gap: 2,
                    }}
                >
                    <Box data-aos="fade-up">
                        <Typography
                            variant="subtitle2"
                            sx={{ mb: 2, display: "block" }}
                        >
                            Our Work
                        </Typography>
                        <Typography variant="h2">The Gallery</Typography>
                    </Box>
                </Box>

                {/* ── Masonry-style grid ───────────────────────────────── */}
                <Box
                    data-aos="fade-up"
                    data-aos-delay="150"
                    className="gallery-grid"
                >
                    {images.map((img, index) => (
                        <Box
                            key={index}
                            className={`gallery-item ${img.className}`}
                            sx={{
                                // Overlay using theme color
                                "& .gallery-overlay": {
                                    background: alpha(
                                        theme.palette.background.default,
                                        0.2,
                                    ),
                                },
                                "&:hover .gallery-overlay": {
                                    background: "transparent",
                                },
                            }}
                        >
                            <Box className="gallery-overlay" />
                            <Box
                                component="img"
                                src={img.url}
                                alt={img.alt}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.7s ease",
                                    display: "block",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default GallerySection;
