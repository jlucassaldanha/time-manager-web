"use client"

import { registerAction } from "@/actions/AuthActions";
import { Box, Button, TextField, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Register() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

	const handleEmailChange = (email: string) => {
		setEmail(email)
	}

	const handlePasswordChange = (password: string) => {
		setPassword(password)
	}

	const handleConfirmPasswordChange = (password: string) => {
		setConfirmPassword(password)
	}

	const handleRegister = async () => {
		if (confirmPassword === password && (email.length > 0 && password.length > 0)) {
			const response = await registerAction({ email, password })

			if (response.success) {
				setError(null)
				redirect("/login")
			}

			if (response.error)
			{
				setError(response.error)
			}
		}
	}

  return (
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
		<TextField
		  label="Confirmar Senha"
		  type="password"
		  value={confirmPassword}
		  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
		  slotProps={{
			inputLabel: {
			  shrink: true,
			},
		  }}
		/>
		{confirmPassword !== password && <Typography color="error" >Senhas diferentes</Typography>}
		{error && <Typography color="error" >{error}</Typography>}
	  </Box>
	  <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
		<Button variant="contained" onClick={handleRegister}>Cadastrar</Button>
		<Button variant="contained" onClick={() => redirect("/login")}>Logar</Button>
	  </Box>
	</Box>
  );
}
