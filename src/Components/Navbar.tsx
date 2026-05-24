import * as React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";

const navLinks = [
    { label: "Process", href: "#process" },
    { label: "Gallery", href: "#gallery" },
];

function Navbar() {
    const theme = useTheme();
    const [scrolled, setScrolled] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            {/* ── AppBar: only dynamic scroll state stays in sx ──────── */}
            <AppBar
                component="nav"
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: scrolled
                        ? `${theme.palette.background.default}e6`
                        : "transparent",
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: scrolled
                        ? `1px solid ${theme.palette.divider}`
                        : "none",
                    transition:
                        "background-color 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease",
                    py: scrolled ? 0.5 : 1,
                }}
            >
                <Toolbar
                    sx={{
                        maxWidth: "1280px",
                        width: "90%",
                        mx: "auto",
                        px: { xs: 2, sm: 3 },
                        justifyContent: "space-between",
                    }}
                >
                    {/* ── Logo ──────────────────────────────────────── */}
                    <Box component="a" href="#" className="nav-logo">
                        <Typography
                            className="nav-logo-name"
                            sx={{
                                fontFamily: theme.typography.h4.fontFamily,
                                color: "text.primary",
                            }}
                        >
                            Chaparro
                        </Typography>
                        <Typography
                            className="nav-logo-sub"
                            sx={{ color: "primary.main" }}
                        >
                            Detailing
                        </Typography>
                    </Box>

                    {/* ── Desktop nav links ──────────────────────────── */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        {navLinks.map((link) => (
                            <Box
                                key={link.label}
                                component="a"
                                href={link.href}
                                className="nav-link"
                                sx={{
                                    color: "text.secondary",
                                    "&:hover": {
                                        color: theme.palette.primary.light,
                                    },
                                }}
                            >
                                {link.label}
                            </Box>
                        ))}
                    </Box>

                    {/* ── Desktop phone ──────────────────────────────── */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 3,
                        }}
                    >
                        <Box
                            component="a"
                            href="tel:+13235109665"
                            className="nav-phone-link"
                            sx={{
                                color: "text.primary",
                                "&:hover": {
                                    color: theme.palette.primary.light,
                                },
                            }}
                        >
                            <PhoneIcon sx={{ fontSize: "1rem" }} />
                            (323) 510-9665
                        </Box>
                    </Box>

                    {/* ── Mobile hamburger ───────────────────────────── */}
                    <IconButton
                        onClick={() => setMobileOpen(true)}
                        sx={{
                            display: { xs: "flex", md: "none" },
                            color: "text.primary",
                            paddingRight: "60px",
                        }}
                        aria-label="open menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* ── Mobile full-screen drawer ──────────────────────────── */}
            <Drawer
                anchor="top"
                open={mobileOpen}
                onClose={closeMobile}
                PaperProps={{
                    sx: {
                        bgcolor: "background.default",
                        height: "100dvh",
                        px: 3,
                        pt: 3,
                    },
                }}
            >
                {/* Close button */}
                <Box className="nav-drawer-close">
                    <IconButton
                        onClick={closeMobile}
                        sx={{ color: "text.primary" }}
                        aria-label="close menu"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Mobile nav links */}
                <List disablePadding>
                    {navLinks.map((link) => (
                        <React.Fragment key={link.label}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component="a"
                                    href={link.href}
                                    onClick={closeMobile}
                                    sx={{ px: 0, py: 1.5 }}
                                >
                                    <ListItemText
                                        primary={link.label}
                                        primaryTypographyProps={{
                                            fontFamily:
                                                theme.typography.h4.fontFamily,
                                            fontSize: "2rem",
                                            color: "text.primary",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider sx={{ my: 0.5 }} />
                        </React.Fragment>
                    ))}
                </List>

                {/* Mobile phone — col-list provides the flex column + 16px gap */}
                <Box className="nav-mobile-actions col-list">
                    <Box
                        component="a"
                        href="tel:+13235109665"
                        className="nav-mobile-phone"
                        sx={{ color: "text.primary" }}
                    >
                        <PhoneIcon
                            sx={{ color: "primary.main", fontSize: "1.25rem" }}
                        />
                        (323) 510-9665
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;
