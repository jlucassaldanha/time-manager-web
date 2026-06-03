import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import AllowanceCard from "../AllowanceCard/AllowanceCard";
import {
  SingleAllowanceState,
  SubmitSingleAllowanceAction,
} from "@/actions/AllowanceActions";
import { useActionState, useEffect } from "react";

interface AllowanceModalProps {
  date: string | null;
  onClose: () => void;
  onSuccessRefresh: () => void;
}

const initialState: SingleAllowanceState = {};

export default function AllowanceModal({
  date,
  onClose,
  onSuccessRefresh,
}: AllowanceModalProps) {
  const isOpen = Boolean(date);
  const [state, formAction, isPending] = useActionState(
    SubmitSingleAllowanceAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      if (typeof onSuccessRefresh === "function") onSuccessRefresh();
      onClose();
    }
  }, [state.success, onSuccessRefresh, onClose]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" sx={{display: "flex", justifyContent: "center"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 2,
        }}
      >
        <DialogTitle>Adicionar</DialogTitle>
        <Button onClick={onClose}>Fechar</Button>
      </Box>
      <DialogContent dividers>
        {state.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {state.error}
          </Alert>
        )}
        <AllowanceCard
          date={date}
          formAction={formAction}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
