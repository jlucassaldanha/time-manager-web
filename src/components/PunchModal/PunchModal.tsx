import { Box, Button, Dialog, DialogContent, DialogTitle, Alert } from "@mui/material"
import EditPunchCard from "../EditPunchCard/EditPunchCard"
import { useActionState, useEffect } from "react"
import { SinglePunchState, SubmitSinglePunchAction } from "@/actions/PunchActions"
import { PunchDto } from "@/core/domain/entities/Summary"

interface PunchModalProps {
	date: string | null
	initialData: PunchDto | null
	onClose: () => void
	onSuccessRefresh: () => void
}

const initialState: SinglePunchState = {};

export default function PunchModal({ date, initialData, onClose, onSuccessRefresh }: PunchModalProps) {
	const isOpen = Boolean(date)

	const [state, formAction, isPending] = useActionState(SubmitSinglePunchAction, initialState);

	useEffect(() => {
    if (state.success) {
      onSuccessRefresh();
      onClose();
    }
  }, [state.success, onSuccessRefresh, onClose]);

	return (
		<Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pr: 2 }}>
				<DialogTitle>{initialData?.id ? "Editar" : "Adicionar"}</DialogTitle>
				<Button onClick={onClose} disabled={isPending}>Fechar</Button>
			</Box>
			<DialogContent dividers>
				{state.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
				<EditPunchCard initialData={initialData} isPending={isPending} date={date} formAction={formAction}/>
			</DialogContent>
		</Dialog>
	)
}