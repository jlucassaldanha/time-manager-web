import { Box, Typography } from "@mui/material";

interface DisplayInfoProps {
	title: string
	info: string
}

export function DisplayInfo({title, info}: DisplayInfoProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="body2">{info}</Typography>
    </Box>
  );
}
