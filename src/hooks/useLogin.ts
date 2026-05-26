import { loginAction } from "@/actions/AuthActions";
import { useState } from "react";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleLogin = async () => {
    await loginAction(email, password);
  };

  return {
	email,
	password,
	handleEmailChange,
	handlePasswordChange,
	handleLogin
  }
}
