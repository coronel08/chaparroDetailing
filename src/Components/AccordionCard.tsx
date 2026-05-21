import { type ReactNode } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  defaultExpanded: boolean;
  title: string;
  backgroundColor?: string;
  children: ReactNode;
};

function AccordionCard({ defaultExpanded, title, backgroundColor, children }: Props) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        backgroundColor: backgroundColor ?? "white",
        boxShadow: 3,
        p: 1,
        m: 1,
        borderRadius: 2,
      }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={title} id={title}>
        <Typography variant="h3">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default AccordionCard;
