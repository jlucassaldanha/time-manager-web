"use client";

import useRealtimePunch from "@/hooks/useRealtimePunch";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  const {
    isPending,
    error,
    handleRealtimePunch
  } = useRealtimePunch()

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Button
        onClick={handleRealtimePunch}
        variant="contained"
        disabled={!isPending}
      >
        Bater ponto
      </Button>
      <Typography color="error">{error}</Typography>
    </Box>
  );
}
