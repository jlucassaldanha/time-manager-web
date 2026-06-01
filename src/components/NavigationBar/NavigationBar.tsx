"use client"

import { logoutAction } from "@/actions/AuthActions";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button href="/summary" color="inherit">
            Relatório
          </Button>
          <Button href="/punch" color="inherit">
            Ponto
          </Button>
          <Button href="/preferences" color="inherit">
            Jornada
          </Button>
          <Button color="inherit" onClick={logoutAction}>Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
