import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

type GridCardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

function GridCard({ title, icon, children }: GridCardProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }} data-aos="fade-up" data-aos-delay="100">
      <Paper elevation={3} className="grid-card">
        <Box className="card-header">
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          {icon}
        </Box>
        {children}
      </Paper>
    </Grid>
  );
}
export default GridCard;
