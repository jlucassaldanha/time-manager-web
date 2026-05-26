import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AllowanceCard from "../AllowanceCard/AllowanceCard";
import { AllowanceDto } from "@/core/domain/entities/Allowance";

interface AllowanceModalProps {
  title: string;
  date: string | null;
  initialData?: AllowanceDto[] | null;
  onClose: () => void;
  onSave: (idsToDelete: string[], date: string, allowances: AllowanceDto[]) => void;
  onDelete?: (id: string) => void;
}

export default function AllowanceModal({
  title,
  date,
  initialData,
  onClose,
  onSave,
  onDelete,
}: AllowanceModalProps) {
  const isOpen = Boolean(date);

  const handleSave = (idsToDelete: string[], allowances: AllowanceDto[]) => {
    if (date) {
      onSave(idsToDelete, date, allowances);
      onClose();
    }
  };

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 2,
        }}
      >
        <DialogTitle>
          {title} - {date}
        </DialogTitle>
        <Button onClick={onClose}>Fechar</Button>
      </Box>
      <DialogContent dividers>
        <AllowanceCard
          key={date || "closed"}
          initialData={initialData}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
