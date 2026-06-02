"use client";

import { registerAction } from "@/actions/AuthActions";
import { Box, Button, TextField, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useActionState } from "react";

const initialState = { error: undefined }

// necessario devolver dados ao cliente apos erro (progressive enhancement)
export default function Register() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState)

  if (state.success) {
    redirect("/login")
  }

  return (
    <Box
      component="form"
      action={formAction}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        mt: 15,
      }}
    >
      <Box>
        <Typography variant="h4">Cadastrar</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
        name="email"
          label="Email"
          type="text"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
        name="password"
          label="Senha"
          type="password"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
        name="confirmPassword"
          label="Confirmar Senha"
          type="password"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Box>
      {state?.error && <Typography color="error">{state.error}</Typography>}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <Button variant="contained" type="submit" loading={isPending}>
          Cadastrar
        </Button>
        <Button onClick={() => redirect("/login")}>
          Logar
        </Button>
      </Box>
    </Box>
  );
}
