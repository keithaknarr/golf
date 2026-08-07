import { clearTeamScores, loadStateFromDisk, persistStateToDisk } from "./start.js";

const [roundId, teeArg, explicitFilePath] = process.argv.slice(2);

if (!roundId || !teeArg) {
  console.error("Usage: node scripts/clear-team-scores.js <round-id> <tee> [state-file]");
  process.exit(1);
}

const tee = Number.parseInt(teeArg, 10);

if (!Number.isInteger(tee)) {
  console.error(`Invalid tee: ${teeArg}`);
  process.exit(1);
}

const stateFilePath = explicitFilePath || process.env.GOLF_STATE_FILE || "data/state.json";
const state = loadStateFromDisk(stateFilePath);

if (!state) {
  console.error(`No valid state found at ${stateFilePath}`);
  process.exit(1);
}

const nextState = clearTeamScores(state, roundId, tee);

if (nextState === state) {
  console.error(`No score entry found for round ${roundId} tee ${tee} in ${stateFilePath}`);
  process.exit(1);
}

persistStateToDisk(nextState, stateFilePath);
console.log(`Cleared scores for round ${roundId} tee ${tee} in ${stateFilePath}`);