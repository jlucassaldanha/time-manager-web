import { Card, CardContent, CardActionArea } from "@mui/material";

export default function ActionCard({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void;
}) {
  return (
    <Card sx={{display: "flex", alignItems: "center"}} >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{display: "flex", alignItems: "center", height: "100%"}}>
          {children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
