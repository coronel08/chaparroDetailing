import {
    Box,
    Container,
    Divider,
    Link,
    Typography,
    useTheme,
} from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function Footer() {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "background.default",
                borderTop: `1px solid ${theme.palette.divider}`,
                pt: { xs: 8, md: 12 },
                pb: 4,
            }}
        >
            <Container maxWidth="lg">
                {/* ── 3-column grid ──────────────────────────────────── */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                            md: "2fr 1fr 1fr",
                        },
                        gap: { xs: 5, md: 20 },
                        mb: 8,
                    }}
                >
                    {/* Brand */}
                    <Box>
                        <Link href="#" className="footer-brand-link">
                            <Typography
                                className="footer-brand-name"
                                sx={{
                                    fontFamily: theme.typography.h4.fontFamily,
                                    color: "text.primary",
                                }}
                            >
                                Hertz
                            </Typography>
                            <Typography
                                className="footer-brand-sub"
                                sx={{ color: "primary.main" }}
                            >
                                Key Library
                            </Typography>
                        </Link>
                        <Typography
                            variant="body2"
                            sx={{ lineHeight: 1.8, maxWidth: "460px" }}
                        >
                            {t("footer.tagline1")}
                            <br />
                            <br />
                            {t("footer.tagline2")}
                        </Typography>
                    </Box>

                    {/* Contact */}
                    <Box>
                        <Typography
                            className="footer-section-heading"
                            sx={{
                                fontFamily: theme.typography.h4.fontFamily,
                                color: "text.primary",
                            }}
                        >
                            {t("footer.contact")}
                        </Typography>
                        <Box className="col-list">
                            <Box className="footer-contact-row">
                                <AccessTimeIcon
                                    sx={{
                                        fontSize: "1rem",
                                        color: "primary.main",
                                        mt: "2px",
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography variant="body2">
                                    {t("footer.sameDay")}
                                </Typography>
                            </Box>
                            <Box className="footer-contact-row">
                                <PlaceIcon
                                    sx={{
                                        fontSize: "1rem",
                                        color: "primary.main",
                                        mt: "2px",
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography variant="body2">
                                    {t("footer.serving")}
                                </Typography>
                            </Box>
                            <Box className="footer-contact-row footer-contact-row--center">
                                <PhoneIcon
                                    sx={{
                                        fontSize: "1rem",
                                        color: "primary.main",
                                        mt: "2px",
                                        flexShrink: 0,
                                    }}
                                />
                                {/* <Link
                                    href="tel:+13235109665"
                                    underline="hover"
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "0.875rem",
                                        "&:hover": { color: "primary.light" },
                                    }}
                                >
                                    (323) 510-9665
                                </Link> */}
                            </Box>
                        </Box>
                    </Box>

                    {/* Socials */}
                    <Box>
                        <Typography
                            className="footer-section-heading"
                            sx={{
                                fontFamily: theme.typography.h4.fontFamily,
                                color: "text.primary",
                            }}
                        >
                            {t("footer.socials")}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1.5 }}>
                            <Link
                                href="#"
                                aria-label="Read our Yelp reviews"
                                className="footer-social-btn"
                                sx={{
                                    bgcolor: alpha(
                                        theme.palette.divider,
                                        0.4,
                                    ),
                                    color: "text.secondary",
                                    "&:hover": {
                                        bgcolor: "primary.main",
                                        color: "primary.contrastText",
                                    },
                                }}
                            >
                                <ReviewsIcon fontSize="small" />
                                Yelp
                            </Link>
                        </Box>
                    </Box>
                </Box>

                {/* ── Bottom bar ───────────────────────────────────────── */}
                <Divider />
                <Box className="footer-bottom">
                    <Link
                        sx={{ color: "text.disabled", fontSize: "0.75rem" }}
                        href="http://portfolio.fdlme.com/"
                    >
                        © {new Date().getFullYear()} By Fidel Coronel
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
