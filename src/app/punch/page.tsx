import {
  CreateManualPunchAction,
  CreateRealtimePunchAction,
} from "@/actions/PunchActions";
import { CreateWorkJourneyRuleAction } from "@/actions/WorkJourneyRuleActions";

export default function Home() {
  return (
    <div>
      <form action={CreateRealtimePunchAction}>
        <button type="submit">Bater ponto</button>
      </form>
    </div>
  );
}
