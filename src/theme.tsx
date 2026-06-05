import { createTheme } from "@mui/material";

// ── Design tokens from the mockup ──────────────────────────────────────────
export const COLORS = {
    obsidian: "#0d1117", // deepest background
    charcoal: "#141d2b", // secondary background / card surfaces
    amber: "#f99600", // primary accent (buttons, highlights, icons)
    blue: "#126baf",
    amberLight: "#ffb51b", // hover amber
    blueLight: "#1a8ad4", // hover blue
    sunnyYellow: "#FDD20B",
    zinc50: "#fafafa",
    zinc100: "#f4f4f5", // primary text
    zinc300: "#d4d4d8",
    zinc400: "#a1a1aa", // secondary text / muted
    zinc500: "#71717a",
    zinc600: "#52525b",
    zinc700: "#3f3f46",
    zinc800: "#27272a", // borders / dividers
    zinc900: "#18181b", // card backgrounds
};

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: COLORS.sunnyYellow,
            light: COLORS.blueLight,
            dark: "#cc6f00",
            contrastText: COLORS.obsidian, // dark text on amber buttons
        },
        secondary: {
            main: COLORS.zinc600,
            light: COLORS.zinc400,
            dark: COLORS.zinc800,
            contrastText: COLORS.zinc100,
        },
        background: {
            default: COLORS.obsidian,
            paper: COLORS.charcoal,
        },
        text: {
            primary: COLORS.zinc100,
            secondary: COLORS.zinc400,
            disabled: COLORS.zinc600,
        },
        divider: COLORS.zinc800,
        // Custom tokens accessible via theme.palette
        // @ts-expect-error – extending MUI palette with custom tokens
        obsidian: {
            main: COLORS.obsidian,
        },
        charcoal: {
            main: COLORS.charcoal,
        },
    },
    typography: {
        fontFamily: "'Inter', system-ui, sans-serif",
        h1: {
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            color: COLORS.zinc50,
            fontSize: "clamp(3rem, 8vw, 8rem)",
            lineHeight: 1.1,
        },
        h2: {
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            color: COLORS.zinc50,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
        },
        h3: {
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            color: COLORS.zinc50,
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
        },
        h4: {
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            color: COLORS.zinc50,
        },
        h5: {
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            color: COLORS.zinc50,
        },
        h6: {
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            color: COLORS.zinc50,
        },
        body1: {
            fontFamily: "'Inter', system-ui, sans-serif",
            color: COLORS.zinc300,
        },
        body2: {
            fontFamily: "'Inter', system-ui, sans-serif",
            color: COLORS.zinc400,
            fontSize: "0.975rem",
        },
        subtitle1: {
            fontFamily: "'Inter', system-ui, sans-serif",
            color: COLORS.zinc400,
        },
        subtitle2: {
            fontFamily: "'Inter', system-ui, sans-serif",
            color: COLORS.sunnyYellow,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
        },
        button: {
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            textTransform: "none",
            letterSpacing: "0.01em",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "2px", // sharp, minimal radius like the mockup
                    padding: "12px 32px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                },
                containedPrimary: {
                    backgroundColor: COLORS.sunnyYellow,
                    color: COLORS.obsidian,
                    "&:hover": {
                        backgroundColor: COLORS.blueLight,
                        boxShadow: "0 0 20px rgba(249,150,0,0.3)",
                    },
                },
                containedSecondary: {
                    backgroundColor: COLORS.zinc800,
                    color: COLORS.zinc100,
                    "&:hover": {
                        backgroundColor: COLORS.zinc700,
                    },
                },
                outlinedPrimary: {
                    borderColor: COLORS.zinc700,
                    color: COLORS.zinc100,
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(39,39,42,0.5)",
                    "&:hover": {
                        backgroundColor: "rgba(39,39,42,0.8)",
                        borderColor: COLORS.zinc600,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(24,24,27,0.5)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${COLORS.zinc800}`,
                    borderRadius: "2px",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: COLORS.zinc800,
                },
            },
        },
    },
});

export default theme;
