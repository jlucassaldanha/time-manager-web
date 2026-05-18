import { PunchEntry } from "@/hooks/useDynamicPunches"
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material"
import DynamicPunchCard from "../DynamicPunchCard/DynamicPunchCard"

interface DynamicPunchModalProps {
	title: string
	date: string | null
	initialData?: PunchEntry[]
	onClose: () => void
	onSave: (idsToDelete: string[], date: string, punches: PunchEntry[]) => void
}

export default function DynamicPunchModal({ title, date, initialData = [], onClose, onSave }: DynamicPunchModalProps) {
	const isOpen = Boolean(date)

	const handleSave = (idsToDelete: string[], punches: PunchEntry[]) => {
		if (date) {
			onSave(idsToDelete, date, punches)
			onClose()
		}
	}

	return (
		<Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pr: 2 }}>
				<DialogTitle>{title} - {date}</DialogTitle>
				<Button onClick={onClose} >Fechar</Button>
			</Box>
			<DialogContent dividers>
				<DynamicPunchCard initialData={initialData} onSave={handleSave}/>
			</DialogContent>
		</Dialog>
	)
}