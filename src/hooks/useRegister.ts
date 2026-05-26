import { registerAction } from "@/actions/AuthActions"
import { redirect } from "next/navigation"
import { useState } from "react"


export default function useRegister() {
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

	return {
		email,
		password,
		confirmPassword,
		error,
		handleEmailChange,
		handlePasswordChange,
		handleConfirmPasswordChange,
		handleRegister
	}
}