import { loginAction } from "@/actions/AuthActions";
import { useState } from "react";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null)

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleLogin = async () => {
    const response = await loginAction(email, password);

    if (response.error) {
      setError(response.error)
    } else {
      setError(null)
    }
  };

  return {
	email,
	password,
  error,
	handleEmailChange,
	handlePasswordChange,
	handleLogin
  }
}
