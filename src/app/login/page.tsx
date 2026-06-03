"use client"

import { loginAction } from "@/actions/AuthActions";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useActionState } from "react";

const initialState = { error: undefined }

export default function Login() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)

  return (
    <Box component="form" action={formAction} sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, mt: 15}}>
      <Box>
        <Typography variant="h4">Entrar</Typography>
      </Box>
      <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
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
      </Box>
      {state?.error && <Alert severity="error" >{state.error}</Alert>}
      <Box sx={{display: "flex", flexDirection: "column", gap: 2, width: "100%"}}>
        <Button variant="contained" type="submit" loading={isPending} >Entrar</Button>
        <Button onClick={() => redirect("/register")}>Cadastrar</Button>
      </Box>
    </Box>
  );
}
