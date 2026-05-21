import { BottomNavigation, Typography } from "@mui/material";

function Footer() {
  return (
    <BottomNavigation
      sx={{
        bgcolor: "primary.main", // uses theme color
        color: "primary.contrastText",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography>
        Contact us: <a href="mailto:business@stratus6.com">business@stratus6.com</a>
      </Typography>
    </BottomNavigation>
  );
}

export default Footer;
