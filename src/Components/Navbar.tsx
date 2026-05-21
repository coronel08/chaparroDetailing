import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
// import theme, { COLORS } from "../theme";

const pages = [
  { label: "Home", href: "#" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box component={"header"}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Common navbar section */}
            <>
              {/* <AdbIcon sx={{ mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: "orbitron",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}>
                Stratus<span style={{ color: "blue" }}>6</span>
              </Typography>
            </>
            {/* Desktop Navbar Section*/}
            <>
              <Box sx={{ flexGrow: 0.2, display: { xs: "none", md: "flex" } }}>
                {pages.map(page => (
                  <Button
                    key={page.label}
                    component="a"
                    href={page.href}
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}>
                    {page.label}
                  </Button>
                ))}
              </Box>
            </>

            {/* Mobile Navbar Section */}
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}>
                  {pages.map(page => (
                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                      <Typography component="a" href={page.href} sx={{ textAlign: "center" }}>
                        {page.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default Navbar;
