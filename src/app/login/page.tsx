"use client"

import useLogin from "@/hooks/useLogin";
import { Box, Button, TextField, Typography } from "@mui/material";
import { redirect } from "next/navigation";

export default function Login() {
	const {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin
  } = useLogin()

  return (
    <Box component="form" action={handleLogin} sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, mt: 15}}>
      <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Box>
      {error && <Typography color="error" >{error}</Typography>}
      <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
        <Button variant="contained" type="submit" loading={loading} >Entrar</Button>
        <Button variant="contained" onClick={() => redirect("/register")}>Cadastrar</Button>
      </Box>
    </Box>
  );
}
