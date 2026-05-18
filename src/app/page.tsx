import {
  CreateManualPunchAction,
  CreateRealtimePunchAction,
} from "@/actions/PunchActions";
import { CreateWorkJourneyRuleAction } from "@/actions/WorkJourneyRuleActions";

export default function Home() {
  return (
    <div>
      <form action={CreateWorkJourneyRuleAction}>
        <div>
          <label htmlFor="monday">monday</label>
          <input type="text" id="monday" name="monday" required />
        </div>

        <div>
          <label htmlFor="tuesday">tuesday</label>
          <input type="text" id="tuesday" name="tuesday" required />
        </div>

        <div>
          <label htmlFor="wednesday">wednesday</label>
          <input type="text" id="wednesday" name="wednesday" required />
        </div>

        <div>
          <label htmlFor="thursday">thursday</label>
          <input type="text" id="thursday" name="thursday" required />
        </div>

        <div>
          <label htmlFor="friday">friday</label>
          <input type="text" id="friday" name="friday" required />
        </div>

        <div>
          <label htmlFor="saturday">saturday</label>
          <input type="text" id="saturday" name="saturday" required />
        </div>

        <div>
          <label htmlFor="sunday">sunday</label>
          <input type="text" id="sunday" name="sunday" required />
        </div>

        <button type="submit">Registrar</button>
      </form>
      <form action={CreateRealtimePunchAction}>
        <button type="submit">Bater ponto</button>
      </form>
      <form action={CreateManualPunchAction}>
        <div>
          <label htmlFor="datetime">datetime</label>
          <input type="datetime-local" id="datetime" name="datetime" required />
        </div>

        <div>
          <label htmlFor="type">type</label>
          <input type="text" id="type" name="type" required />
        </div>

        <div>
          <label htmlFor="note">note</label>
          <input type="text" id="note" name="note" required />
        </div>

        <button type="submit">Bater ponto</button>
      </form>
    </div>
  );
}
