import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadStateFromDisk, persistStateToDisk } from "../scripts/start.js";

function parseNumberList(listText) {
  return listText
    .split(",")
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((n) => Number.isFinite(n));
}

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

test("mountain view hole 5 is a par 4", () => {
  const appJsPath = path.join(process.cwd(), "src", "app.js");
  const source = fs.readFileSync(appJsPath, "utf8");

  const mountainViewBlock = source.match(/mountainView:\s*\{([\s\S]*?)\n\s*\},/);
  assert.ok(mountainViewBlock, "Expected mountainView course block in src/app.js");
  const mountainViewParsMatch = mountainViewBlock[1].match(/pars:\s*\[([^\]]+)\]/);
  assert.ok(mountainViewParsMatch, "Expected mountainView pars array");
  const mountainViewPars = parseNumberList(mountainViewParsMatch[1]);
  assert.equal(mountainViewPars[4], 4, "Mountain View hole 5 should be par 4");
});

test("mountain view par-3 holes remain aligned for pin tracking", () => {
  const appJsPath = path.join(process.cwd(), "src", "app.js");
  const source = fs.readFileSync(appJsPath, "utf8");

  const mountainViewBlock = source.match(/mountainView:\s*\{([\s\S]*?)\n\s*\},/);
  assert.ok(mountainViewBlock, "Expected mountainView course block in src/app.js");

  const parMatch = mountainViewBlock[1].match(/par:\s*(\d+)/);
  assert.ok(parMatch, "Expected mountainView par value");
  assert.equal(Number.parseInt(parMatch[1], 10), 70);

  const parsMatch = mountainViewBlock[1].match(/pars:\s*\[([^\]]+)\]/);
  assert.ok(parsMatch, "Expected mountainView pars array");
  const pars = parseNumberList(parsMatch[1]);

  assert.equal(pars.length, 18, "Expected 18 hole pars");
  const parTotal = pars.reduce((sum, value) => sum + value, 0);
  assert.equal(parTotal, 70, "Mountain View par total should be 70");

  const par3Holes = pars
    .map((value, idx) => (value === 3 ? idx + 1 : null))
    .filter((value) => value !== null);
  assert.deepEqual(par3Holes, [2, 6, 9, 10, 16]);
});
