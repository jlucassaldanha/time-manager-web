"use client"

import { loginAction } from "@/actions/AuthActions";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleEmailChange = (email: string) => {
		setEmail(email)
	}

	const handlePasswordChange = (password: string) => {
		setPassword(password)
	}

	const handleLogin = async () => {
		await loginAction(email, password)
	}

  return (
	// depois que logar, se a pessoa tentar registrar ponto sem colocar a jornada da um erro
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, mt: 15}}>
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
      <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
        <Button variant="contained" onClick={handleLogin}>Entrar</Button>
        <Button variant="contained" >Cadastrar</Button>
      </Box>
    </Box>
  );
}
