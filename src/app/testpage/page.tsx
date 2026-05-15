'use client'

import { RecordType } from "@/core/domain/entities/TimeRecord";
import { Box, Button, Card, CardContent, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

export interface PunchEntry {
	id: string,
	time: string,
	type: RecordType,
	note?: string
}

export default function TestPage() {
	const [punches, setPunches] = useState<PunchEntry[]>([])
	const [punchType, setPunchType] = useState<RecordType>("Entry")

	const addPunch = () => {
		const newPunch: PunchEntry = {
			id: crypto.randomUUID(),
			time: "",
			type: "Entry",
		}

		setPunches((prev) => [...prev, newPunch])
	}

	const removePunch = (id: string) => {
		setPunches((prev) => prev.filter((punch) => punch.id !== id))
	}

	const updatePunch = (id: string, field: keyof PunchEntry, value: string) => {
		setPunches((prev) => 
			prev.map((punch) => 
				punch.id === id ? { ...punch, [field]: value } : punch 
			)
		)
	}

	const handlePunchTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		newPunchType: RecordType,
	) => {
		setPunchType(newPunchType);
	};

	return (
		<Card>
			<CardContent>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Box>
						<Typography variant="h5" >Adicionar</Typography>
						<Typography variant="subtitle1" >04/11/2001</Typography>
					</Box>
					<Box>
						<Button onClick={addPunch} >Adicionar batida</Button>
					</Box>
				</Box>
				<Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
					{punches.length <= 0 
						&& <Typography variant="subtitle1" >Não há pontos registrados.</Typography>}
					{punches.map((punch) => (
						<Box key={punch.id} sx={{display: "flex", flexDirection: "column", gap: 2, mb: 3}}>
							<TextField 
								type="time"
								size="small"
							/>
							<ToggleButtonGroup
								value={punchType}
								exclusive
								onChange={handlePunchTypeChange}
							>
								<ToggleButton value="Entry" >
									Entrada
								</ToggleButton>
								<ToggleButton value="Exit" >
									Saida
								</ToggleButton>
							</ToggleButtonGroup>
							<Button onClick={() => removePunch(punch.id)} >Excluir</Button>
						</Box>
					))}
				</Box>
			</CardContent>
		</Card>
	)
}