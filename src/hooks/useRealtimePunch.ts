import { CreateRealtimePunchAction } from "@/actions/PunchActions";
import { useState } from "react";

export default function useRealtimePunch() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleRealtimePunch = async () => {
    setIsPending(true);
    setError(null);

    const response = await CreateRealtimePunchAction();

    if (!response?.success) {
      setError(response?.error || "Erro desconhecido.");
    }

    setIsPending(false);
  };

  return {
	isPending,
	error,
	handleRealtimePunch
  }
}
