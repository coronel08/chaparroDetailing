import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";

function BookingCTA() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            id="book"
            sx={{
                py: { xs: 12, md: 18 },
                bgcolor: "background.paper",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Radial glow — only the theme colour stays in sx */}
            <Box
                className="cta-glow"
                sx={{ background: alpha(theme.palette.primary.main, 0.05) }}
            />

            <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
                <Box className="section-header" data-aos="fade-up">
                    <Typography
                        variant="h2"
                        sx={{
                            mb: 3,
                            fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                        }}
                    >
                        Ready to make it shine?
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 6,
                            maxWidth: "560px",
                            mx: "auto",
                            color: "text.secondary",
                            fontSize: { xs: "1rem", md: "1.125rem" },
                        }}
                    >
                        Book your appointment today and experience the pinnacle
                        of automotive care. Our schedule fills up quickly.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2,
                        }}
                    >
                        <Button
                            component="a"
                            href="tel:+13235109665"
                            variant="contained"
                            color="secondary"
                            disableElevation
                            startIcon={<PhoneIcon />}
                            sx={{
                                width: { xs: "100%", sm: "auto" },
                                px: 4,
                                py: 1.75,
                                fontSize: "1rem",
                                bgcolor: alpha(theme.palette.divider, 0.6),
                                color: "text.primary",
                                "&:hover": {
                                    bgcolor: alpha(theme.palette.divider, 0.9),
                                },
                            }}
                        >
                            Call (323) 510-9665
                        </Button>

                        {/* Book online button */}
                        {/* <Button
                            component="a"
                            href="#"
                            variant="contained"
                            color="primary"
                            disableElevation
                            startIcon={<CalendarMonthIcon />}
                            sx={{
                                width: { xs: "100%", sm: "auto" },
                                px: 4,
                                py: 1.75,
                                fontSize: "1rem",
                                "&:hover": {
                                    boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                },
                            }}
                        >
                            Book Online
                        </Button> */}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default BookingCTA;
