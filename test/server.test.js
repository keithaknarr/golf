import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadStateFromDisk, persistStateToDisk } from "../scripts/start.js";

test("persists and reloads state from disk", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "golf-state-"));
  const stateFile = path.join(tmpDir, "state.json");
  const sampleState = {
    version: 2,
    activeRound: "thu-pm",
    activeView: "leaderboard",
    activeTee: null,
    scores: {
      "thu-pm": {
        1: ["3", "4", "5"],
      },
    },
    chat: [{ id: "chat-1", ts: 1, text: "hello" }],
  };

  persistStateToDisk(sampleState, stateFile);
  assert.equal(fs.existsSync(stateFile), true);

  const reloaded = loadStateFromDisk(stateFile);
  assert.deepEqual(reloaded, sampleState);

  fs.rmSync(tmpDir, { recursive: true, force: true });
});
