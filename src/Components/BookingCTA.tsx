import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTranslation } from "react-i18next";

function BookingCTA() {
    const theme = useTheme();
    const { t } = useTranslation();

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
            {/* Radial glow */}
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
                        {t("cta.heading")}
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
                        {t("cta.body")}
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
                            {t("cta.call")}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default BookingCTA;
