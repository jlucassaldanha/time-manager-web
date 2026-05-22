"use client"

import {
  CreateRealtimePunchAction,
} from "@/actions/PunchActions";
import { Box, Button } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form action={CreateRealtimePunchAction}>
        <Button type="submit" variant="contained">Bater ponto</Button>
      </form>
    </Box>
  );
}
