const STORAGE_KEY = "mcc-golf-2026-v1";
const MY_NAME_KEY  = "mcc-2026-my-name";
const STATE_VERSION = 2;

function getAppBasePath() {
  try {
    const currentPath = typeof window !== "undefined" && window.location?.pathname ? window.location.pathname : "/";
    const normalized = currentPath.endsWith("/") ? currentPath : `${currentPath}/`;
    if (normalized === "/") return "/";
    return normalized.replace(/\/index\.html\/?$/, "/");
  } catch {
    return "/";
  }
}

const APP_BASE_PATH = getAppBasePath();

function buildApiUrl(pathname) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (APP_BASE_PATH === "/") return normalizedPath;
  return `${APP_BASE_PATH.replace(/\/$/, "")}${normalizedPath}`;
}

const COURSES = {
  skytop: {
    name: "Skytop Golf Course",
    par: 72,
    pars:  [4,5,4,3,5,3,4,4,4, 4,5,4,3,4,5,3,4,4],
    yards: [283,535,347,93,493,120,271,327,317, 302,415,350,140,338,533,163,326,409],
    si:    [15,1,5,17,3,11,13,7,9, 12,10,6,18,16,2,14,8,4],
  },
  mountainView: {
    name: "Mountain View Golf Course",
    par: 71,
    pars:  [4,3,5,4,4,3,5,4,3, 3,4,4,5,4,5,3,4,4],
    yards: [392,102,546,343,258,180,457,300,131, 167,300,383,582,356,532,151,449,386],
    si:    [4,18,2,8,16,10,6,12,14, 17,13,3,1,11,5,15,9,7],
  },
};

const ROUNDS = [
  {
    id: "thu-pm", label: "Thu PM", fullLabel: "Thursday · Afternoon",
    course: COURSES.skytop,
    teams: [
      { tee:1, teeTime:"1:00 PM", headStart:-2, players:[
        {name:"Mike",hcp:9},{name:"Dave RN",hcp:10},
        {name:"Jap",hcp:11},{name:"Cisco",hcp:14}]},
      { tee:2, teeTime:"1:09 PM", headStart:-5, players:[
        {name:"Lloyd",hcp:12},{name:"Claudia",hcp:15},
        {name:"Eric",hcp:16},{name:"Ben",hcp:17}]},
      { tee:3, teeTime:"1:18 PM", headStart:-1, players:[
        {name:"Pandy",hcp:6},{name:"Donny",hcp:7},
        {name:"Keith",hcp:10},{name:"Kisel",hcp:12}]},
      { tee:4, teeTime:"1:27 PM", headStart:-5, players:[
        {name:"Betty",hcp:13},{name:"Jay",hcp:13},
        {name:"Josh",hcp:14},{name:"Sarka",hcp:18}]},
      { tee:5, teeTime:"1:36 PM", headStart:0, players:[
        {name:"Chris",hcp:4},{name:"Zeke",hcp:6},
        {name:"Ricky",hcp:10},{name:"Matt",hcp:12}]},
      { tee:6, teeTime:"1:45 PM", headStart:-1, players:[
        {name:"Nevin",hcp:7},{name:"Drew",hcp:8},
        {name:"Ryan",hcp:8.5},{name:"Larry",hcp:10}]},
    ],
  },
  {
    id: "fri-am", label: "Fri AM", fullLabel: "Friday · Morning",
    course: COURSES.mountainView,
    teams: [
      { tee:1, teeTime:"8:03 AM", headStart:-2, players:[
        {name:"Keith",hcp:10},{name:"Dave RN",hcp:10},
        {name:"Matt",hcp:12},{name:"Jay",hcp:13}]},
      { tee:2, teeTime:"8:12 AM", headStart:-1, players:[
        {name:"Zeke",hcp:6},{name:"Lloyd",hcp:12},
        {name:"Kisel",hcp:12},{name:"Josh",hcp:14}]},
      { tee:3, teeTime:"8:21 AM", headStart:0, players:[
        {name:"Chris",hcp:4},{name:"Nevin",hcp:7},
        {name:"Jap",hcp:11},{name:"Sarka",hcp:18}]},
      { tee:4, teeTime:"8:30 AM", headStart:0, players:[
        {name:"Donny",hcp:7},{name:"Mike",hcp:9},
        {name:"Larry",hcp:10},{name:"Betty",hcp:13}]},
      { tee:5, teeTime:"8:39 AM", headStart:-1, players:[
        {name:"Pandy",hcp:6},{name:"Ryan",hcp:8.5},
        {name:"Eric",hcp:16},{name:"Ben",hcp:17}]},
      { tee:6, teeTime:"8:48 AM", headStart:-2, players:[
        {name:"Drew",hcp:8},{name:"Ricky",hcp:10},
        {name:"Cisco",hcp:14},{name:"Claudia",hcp:15}]},
    ],
  },
  {
    id: "fri-pm", label: "Fri PM", fullLabel: "Friday · Afternoon",
    course: COURSES.mountainView,
    teams: [
      { tee:1, teeTime:"1:27 PM", headStart:0, players:[
        {name:"Nevin",hcp:7},{name:"Mike",hcp:9},
        {name:"Keith",hcp:10},{name:"Lloyd",hcp:12}]},
      { tee:2, teeTime:"1:36 PM", headStart:0, players:[
        {name:"Chris",hcp:4},{name:"Larry",hcp:10},
        {name:"Jay",hcp:13},{name:"Josh",hcp:14}]},
      { tee:3, teeTime:"1:45 PM", headStart:-3, players:[
        {name:"Kisel",hcp:12},{name:"Betty",hcp:13},
        {name:"Cisco",hcp:14},{name:"Eric",hcp:16}]},
      { tee:4, teeTime:"1:54 PM", headStart:-1, players:[
        {name:"Zeke",hcp:6},{name:"Pandy",hcp:6},
        {name:"Claudia",hcp:15},{name:"Sarka",hcp:18}]},
      { tee:5, teeTime:"2:03 PM", headStart:0, players:[
        {name:"Donny",hcp:7},{name:"Ryan",hcp:8.5},
        {name:"Dave RN",hcp:10},{name:"Ricky",hcp:10}]},
      { tee:6, teeTime:"2:12 PM", headStart:-2, players:[
        {name:"Drew",hcp:8},{name:"Jap",hcp:11},
        {name:"Matt",hcp:12},{name:"Ben",hcp:17}]},
    ],
  },
  {
    id: "sat-am", label: "Sat AM", fullLabel: "Saturday · Morning",
    course: COURSES.mountainView,
    teams: [
      { tee:1, teeTime:"7:54 AM", headStart:-1, players:[
        {name:"Pandy",hcp:6},{name:"Nevin",hcp:7},
        {name:"Ricky",hcp:10},{name:"Betty",hcp:13}]},
      { tee:2, teeTime:"8:03 AM", headStart:-4, players:[
        {name:"Mike",hcp:9},{name:"Matt",hcp:12},
        {name:"Josh",hcp:14},{name:"Eric",hcp:16}]},
      { tee:3, teeTime:"8:12 AM", headStart:0, players:[
        {name:"Chris",hcp:4},{name:"Donny",hcp:7},
        {name:"Drew",hcp:8},{name:"Lloyd",hcp:12}]},
      { tee:4, teeTime:"8:21 AM", headStart:-4, players:[
        {name:"Dave RN",hcp:10},{name:"Kisel",hcp:12},
        {name:"Claudia",hcp:15},{name:"Ben",hcp:17}]},
      { tee:5, teeTime:"8:30 AM", headStart:-1, players:[
        {name:"Zeke",hcp:6},{name:"Larry",hcp:10},
        {name:"Keith",hcp:10},{name:"Jap",hcp:11}]},
      { tee:6, teeTime:"8:39 AM", headStart:-4, players:[
        {name:"Ryan",hcp:8.5},{name:"Jay",hcp:13},
        {name:"Cisco",hcp:14},{name:"Sarka",hcp:18}]},
    ],
  },
  {
    id: "sat-pm", label: "Sat PM", fullLabel: "Saturday · Afternoon",
    course: COURSES.mountainView,
    teams: [
      { tee:1, teeTime:"1:36 PM", headStart:0, players:[
        {name:"Pandy",hcp:6},{name:"Drew",hcp:8},
        {name:"Dave RN",hcp:10},{name:"Josh",hcp:14}]},
      { tee:2, teeTime:"1:45 PM", headStart:0, players:[
        {name:"Zeke",hcp:6},{name:"Donny",hcp:7},
        {name:"Nevin",hcp:7},{name:"Eric",hcp:16}]},
      { tee:3, teeTime:"1:54 PM", headStart:-1, players:[
        {name:"Chris",hcp:4},{name:"Keith",hcp:10},
        {name:"Cisco",hcp:14},{name:"Ben",hcp:17}]},
      { tee:4, teeTime:"2:03 PM", headStart:-2, players:[
        {name:"Ryan",hcp:8.5},{name:"Jap",hcp:11},
        {name:"Betty",hcp:13},{name:"Claudia",hcp:15}]},
      { tee:5, teeTime:"2:12 PM", headStart:-2, players:[
        {name:"Mike",hcp:9},{name:"Ricky",hcp:10},
        {name:"Kisel",hcp:12},{name:"Jay",hcp:13}]},
      { tee:6, teeTime:"2:21 PM", headStart:-3, players:[
        {name:"Larry",hcp:10},{name:"Lloyd",hcp:12},
        {name:"Matt",hcp:12},{name:"Sarka",hcp:18}]},
    ],
  },
];

// --- Utilities ---

function parseNumber(value) {
  if (value == null || String(value).trim() === "") return null;
  const n = Number(String(value).trim());
  return Number.isFinite(n) ? n : null;
}

function fmtScore(n) {
  if (n === 0) return "E";
  return n > 0 ? `+${n}` : `${n}`;
}

function fmtHeadStart(hs) {
  return hs === 0 ? "E" : String(hs);
}

function holeCountForCourse(course) {
  return Array.isArray(course?.pars) ? course.pars.length : 18;
}

// --- State ---

function emptyScores() {
  const s = {};
  for (const r of ROUNDS) {
    s[r.id] = {};
    const holeCount = holeCountForCourse(r.course);
    for (const t of r.teams) s[r.id][t.tee] = Array(holeCount).fill("");
  }
  return s;
}

function normalizeScores(raw) {
  const s = {};
  for (const r of ROUNDS) {
    s[r.id] = {};
    const holeCount = holeCountForCourse(r.course);
    for (const t of r.teams) {
      const saved = raw?.[r.id]?.[t.tee];
      s[r.id][t.tee] = Array.isArray(saved)
        ? Array.from({ length: holeCount }, (_, i) => {
            const h = saved[i];
            return h == null || h === "" ? "" : String(h);
          })
        : Array(holeCount).fill("");
    }
  }
  return s;
}

function createDefaultState() {
  return {
    version: STATE_VERSION,
    activeRound: ROUNDS[0].id,
    activeView: "leaderboard",
    activeTee: null,
    scores: emptyScores(),
    pins: {},
    chat: [],
  };
}

function normalizeState(raw) {
  if (!raw || typeof raw !== "object") return createDefaultState();
  if (raw.version !== STATE_VERSION) return createDefaultState();
  const activeRound = ROUNDS.find(r => r.id === raw.activeRound)?.id ?? ROUNDS[0].id;
  const round = ROUNDS.find(r => r.id === activeRound);
  const activeTee = round?.teams.some(t => t.tee === raw.activeTee) ? raw.activeTee : null;
  return {
    version: STATE_VERSION,
    activeRound,
    activeView: activeTee && raw.activeView === "scorecard" ? "scorecard" : "leaderboard",
    activeTee,
    scores: normalizeScores(raw.scores),
    pins: (raw.pins && typeof raw.pins === "object") ? raw.pins : {},
    chat: Array.isArray(raw.chat) ? raw.chat.slice(-100) : [],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : createDefaultState();
  } catch { return createDefaultState(); }
}

let state  = loadState();
let myName = localStorage.getItem(MY_NAME_KEY) || null;
let syncTimer = null;
let syncPollTimer = null;
let isApplyingServerUpdate = false;
let pendingIncomingState = null;

function isScoreInputFocused() {
  const active = document.activeElement;
  return !!active && active.matches?.(".score-input");
}

function flushPendingIncomingState() {
  if (!pendingIncomingState || isScoreInputFocused()) return;
  const next = pendingIncomingState;
  pendingIncomingState = null;
  applyIncomingState(next);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!isApplyingServerUpdate) {
    syncToServer();
    try {
      const syncMarker = `${Date.now()}`;
      localStorage.setItem(`${STORAGE_KEY}:sync`, syncMarker);
    } catch {}
  }
}

function applyIncomingState(incoming) {
  if (!incoming?.scores) return;
  if (isScoreInputFocused()) {
    // Keep score entry stable while the user is typing.
    pendingIncomingState = incoming;
    return;
  }
  isApplyingServerUpdate = true;
  state.scores = normalizeScores(incoming.scores);
  if (incoming.pins && typeof incoming.pins === "object") state.pins = incoming.pins;
  if (Array.isArray(incoming.chat)) {
    const ids = new Set((state.chat || []).map(m => m.id));
    const fresh = incoming.chat.filter(m => !ids.has(m.id));
    state.chat = [...(state.chat || []), ...fresh].sort((a, b) => a.ts - b.ts).slice(-100);
    if (!document.getElementById("chat-modal").hidden) renderChat();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(`${STORAGE_KEY}:last-server-update`, String(Date.now()));
  renderAll();
  isApplyingServerUpdate = false;
}

// --- Metrics ---

function calcMetrics(roundId, tee, course) {
  const holes = state.scores[roundId]?.[tee] ?? [];
  const holeCount = holeCountForCourse(course);
  let gross = 0, parUsed = 0, played = 0, front = 0, back = 0;
  for (let i = 0; i < holeCount; i++) {
    const s = parseNumber(holes[i]);
    if (s !== null) {
      gross += s; parUsed += course.pars[i]; played++;
      if (i < 9) front += s; else back += s;
    }
  }
  return {
    gross: played > 0 ? gross : null,
    front: played > 0 ? front : null,
    back:  played > 0 ? back  : null,
    parUsed, played,
    relToPar: played > 0 ? gross - parUsed : null,
  };
}

// --- DOM refs ---

const viewLB    = document.getElementById("view-leaderboard");
const viewSC    = document.getElementById("view-scorecard");
const lbBody    = document.getElementById("lb-body");
const scBody    = document.getElementById("sc-body");
const lbRowTpl  = document.getElementById("lb-row-tpl");
const scHoleTpl = document.getElementById("sc-hole-tpl");
const scSubTpl  = document.getElementById("sc-sub-tpl");
const heroRound     = document.getElementById("hero-round");
const heroCourse    = document.getElementById("hero-course");
const heroLeader    = document.getElementById("hero-leader");
const lbRoundLabel  = document.getElementById("lb-round-label");
const lbCourseBadge = document.getElementById("lb-course-badge");
const scRoundLabel  = document.getElementById("sc-round-label");
const scTitle       = document.getElementById("sc-title");
const scHeadStart   = document.getElementById("sc-head-start");
const scTeamInline  = document.getElementById("sc-team-inline");
const scTeamToggle  = document.getElementById("sc-team-toggle");
const scPlayers     = document.getElementById("sc-players");
const scNet   = document.getElementById("sc-net");
const scGross = document.getElementById("sc-gross");
const scThru  = document.getElementById("sc-thru");
const scFront = document.getElementById("sc-front");
const scBack  = document.getElementById("sc-back");
const backBtn   = document.getElementById("back-btn");
const liveDot   = document.getElementById("live-dot");
const roundTabs = Array.from(document.querySelectorAll("[data-round]"));
const saveScoreBtn = document.getElementById("save-score-btn");
const lbPrimaryAction = document.getElementById("lb-primary-action");
let scorecardTeamDetailsOpen = false;
let saveFeedbackTimer = null;
let activePinPicker = null;

function showSaveFeedback(label = "Saved") {
  if (!saveScoreBtn) return;
  saveScoreBtn.textContent = label;
  if (saveFeedbackTimer) clearTimeout(saveFeedbackTimer);
  saveFeedbackTimer = setTimeout(() => {
    saveScoreBtn.textContent = "Save";
  }, 900);
}

// --- Render ---

function enforceScorecardSectionOrder() {
  const layout = viewSC?.querySelector(".sc-layout");
  if (!layout) return;

  const scoreWrap = layout.querySelector(".scorecard-wrap");
  const scoreSection = scoreWrap ? scoreWrap.closest(".subcard") : null;
  const teamList = layout.querySelector("#sc-players");
  const teamSection = teamList ? teamList.closest(".subcard") : null;
  const totals = layout.querySelector(".sc-totals");
  const scoreHeading = scoreSection?.querySelector(".subcard-heading");

  if (scoreSection) {
    scoreSection.classList.add("sc-score-entry");
    layout.prepend(scoreSection);
  }

  if (scoreSection && totals && !scoreSection.contains(totals)) {
    if (scoreWrap && scoreWrap.parentElement === scoreSection) {
      scoreSection.insertBefore(totals, scoreWrap.nextSibling);
    } else {
      scoreSection.appendChild(totals);
    }
  }

  if (scoreSection && saveScoreBtn && scoreHeading && !scoreHeading.contains(saveScoreBtn)) {
    scoreHeading.appendChild(saveScoreBtn);
  }

  if (teamSection) {
    teamSection.classList.add("sc-team-summary");
    layout.append(teamSection);
  }
}

function renderAll() {
  enforceScorecardSectionOrder();
  const identityOverlay = document.getElementById("identity-overlay");
  if (!myName) {
    identityOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    renderIdentityScreen();
    return;
  }
  identityOverlay.hidden = true;
  document.body.style.overflow = "";
  updateUserPill();

  const round = ROUNDS.find(r => r.id === state.activeRound) || ROUNDS[0];
  roundTabs.forEach(b => b.classList.toggle("is-active", b.dataset.round === state.activeRound));
  heroRound.textContent  = round.label;
  heroCourse.textContent = round.course.name.replace(" Golf Course", "");
  const showSC = state.activeView === "scorecard" && state.activeTee !== null;
  viewLB.hidden = showSC;
  viewSC.hidden = !showSC;
  if (showSC) renderScorecardView(round);
  else renderLeaderboard(round);
}

function sortedTeams(round) {
  return [...round.teams].sort((a, b) => {
    const am = calcMetrics(round.id, a.tee, round.course);
    const bm = calcMetrics(round.id, b.tee, round.course);
    if (am.played === 0 && bm.played === 0) return a.tee - b.tee;
    if (am.played === 0) return 1;
    if (bm.played === 0) return -1;
    const diff = (am.relToPar + a.headStart) - (bm.relToPar + b.headStart);
    return diff !== 0 ? diff : bm.played - am.played;
  });
}

function renderLeaderboard(round) {
  lbRoundLabel.textContent  = round.fullLabel;
  lbCourseBadge.textContent = round.course.name;
  const holeCount = holeCountForCourse(round.course);

  const teams = sortedTeams(round);
  lbBody.innerHTML = "";
  let pos = 1;

  const myTeamLB = myName ? round.teams.find(t => t.players.some(p => p.name === myName)) : null;
  const myMtrLB  = myTeamLB ? calcMetrics(round.id, myTeamLB.tee, round.course) : null;
  const myNetLB  = (myMtrLB && myMtrLB.relToPar !== null) ? myMtrLB.relToPar + myTeamLB.headStart : null;
  const isIndividual = round.format === "individual";

  if (lbPrimaryAction) {
    lbPrimaryAction.innerHTML = "";

    const makeTab = (label, onClick, { active = false, disabled = false } = {}) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ghost-button lb-tab-btn" + (active ? " is-active" : "");
      btn.textContent = label;
      btn.disabled = disabled;
      if (active) btn.setAttribute("aria-current", "page");
      btn.addEventListener("click", onClick);
      return btn;
    };

    lbPrimaryAction.appendChild(makeTab("Enter Scores", () => {
      if (!myTeamLB) return;
      state.activeView = "scorecard";
      state.activeTee = myTeamLB.tee;
      saveState();
      renderAll();
    }, { disabled: !myTeamLB }));

    lbPrimaryAction.appendChild(makeTab("Leaderboard", () => {
      state.activeView = "leaderboard";
      state.activeTee = null;
      saveState();
      renderAll();
    }, { active: true }));

  }

  teams.forEach((team, i) => {
    const m        = calcMetrics(round.id, team.tee, round.course);
    const isMyTeam = myTeamLB !== null && team.tee === myTeamLB.tee;
    const frag = lbRowTpl.content.cloneNode(true);
    const row  = frag.querySelector("tr");
    if (isMyTeam) row.classList.add("is-my-team");

    const posEl = frag.querySelector("[data-pos]");
    if (m.played > 0) {
      posEl.textContent = String(pos++);
      if (i === 0) row.classList.add("is-leader");
    } else {
      posEl.textContent = "—";
    }

    const playersCell = frag.querySelector("[data-players]");
    playersCell.textContent = isIndividual
      ? team.players[0].name
      : team.players.map(p => p.name.split(" ")[0]).join(", ");
    if (isMyTeam) {
      const badge = document.createElement("span");
      badge.className = "my-team-badge";
      badge.textContent = "YOU";
      playersCell.appendChild(badge);
    }
    const hsEl = frag.querySelector("[data-head-start]");
    hsEl.textContent = fmtHeadStart(team.headStart);
    hsEl.className = team.headStart < 0 ? "hs-negative" : "hs-even";

    frag.querySelector("[data-gross]").textContent = m.gross !== null ? String(m.gross) : "—";

    const netEl = frag.querySelector("[data-net]");
    if (m.relToPar !== null) {
      const net = m.relToPar + team.headStart;
      netEl.textContent = fmtScore(net);
      netEl.className = net < 0 ? "score-under" : net > 0 ? "score-over" : "score-even";
      if (!isMyTeam && myNetLB !== null && !isIndividual) {
        const gap = net - myNetLB;
        const gapEl = document.createElement("div");
        gapEl.className = "gap-label " + (gap < 0 ? "gap-ahead" : gap > 0 ? "gap-behind" : "gap-tied");
        gapEl.textContent = gap < 0 ? `${Math.abs(gap)} on you` : gap > 0 ? `+${gap} back` : "tied";
        netEl.appendChild(gapEl);
      }
    } else { netEl.textContent = "—"; }

    frag.querySelector("[data-thru]").textContent = m.played > 0 ? `${m.played}/${holeCount}` : "—";

    const actionCell = frag.querySelector("[data-action]");
    if (isMyTeam) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = (!isIndividual && isMyTeam) ? "ghost-button enter-scores-btn is-my-team-btn" : "ghost-button enter-scores-btn";
      btn.textContent = m.played === holeCount ? "My scores" : m.played > 0 ? "My card →" : "My card";
      btn.addEventListener("click", () => {
        state.activeView = "scorecard";
        state.activeTee  = team.tee;
        saveState();
        renderAll();
      });
      actionCell.appendChild(btn);
    } else {
      const lock = document.createElement("span");
      lock.className = "score-lock-pill";
      lock.textContent = "Locked";
      actionCell.appendChild(lock);
    }
    lbBody.appendChild(frag);
  });

  // Trophy for leader when all teams finish
  const allDone = round.teams.every(t => calcMetrics(round.id, t.tee, round.course).played === holeCount);
  if (allDone && teams.length > 0) {
    const winnerPosEl = lbBody.querySelector("tr:first-child [data-pos]");
    if (winnerPosEl) winnerPosEl.textContent = "🏆";
  }

  // Hero standing: personalized for identified user
  const myTeamHero = myName ? teams.find(t => t.players.some(p => p.name === myName)) : null;
  if (myTeamHero) {
    const myMH = calcMetrics(round.id, myTeamHero.tee, round.course);
    if (myMH.played > 0) {
      const myNetH = myMH.relToPar + myTeamHero.headStart;
      const started = teams.filter(t => calcMetrics(round.id, t.tee, round.course).played > 0);
      const rank    = started.indexOf(myTeamHero) + 1;
      const prefix  = allDone && rank === 1 ? "🏆 " : "";
      heroLeader.textContent = rank === 1
        ? `${prefix}You lead (${fmtScore(myNetH)})`
        : `You: #${rank} of ${started.length} (${fmtScore(myNetH)})`;
    } else {
      heroLeader.textContent = "Not started";
    }
  } else {
    const leader = teams.find(t => calcMetrics(round.id, t.tee, round.course).played > 0);
    if (leader) {
      const lm = calcMetrics(round.id, leader.tee, round.course);
      const prefix = allDone ? "🏆 " : "";
      heroLeader.textContent = `${prefix}${leader.players[0].name.split(" ")[0]} (${fmtScore(lm.relToPar + leader.headStart)})`;
    } else {
      heroLeader.textContent = "—";
    }
  }
}

function renderScorecardView(round) {
  const team = round.teams.find(t => t.tee === state.activeTee);
  if (!team) return;
  const canEdit = !!myName && team.players.some(p => p.name === myName);

  if (!canEdit) {
    const myTeam = myName ? round.teams.find(t => t.players.some(p => p.name === myName)) : null;
    state.activeView = "leaderboard";
    state.activeTee = myTeam ? myTeam.tee : null;
    saveState();
    renderAll();
    return;
  }

  scRoundLabel.textContent = round.fullLabel;
  scTitle.textContent      = round.format === "individual"
    ? team.players[0].name
    : `Tee ${team.tee} · ${team.teeTime}`;
  scHeadStart.textContent  = round.format === "individual"
    ? "Individual stroke play"
    : `Head start: ${fmtHeadStart(team.headStart)}`;

  if (scTeamInline) {
    scTeamInline.textContent = team.players
      .map((p) => `${p.name.split(" ")[0]} ${p.hcp}`)
      .join(" | ");
  }

  scPlayers.innerHTML = "";
  for (const p of team.players) {
    const li   = document.createElement("li");
    li.className = "player-ro";
    const name = document.createElement("span");
    name.className = "player-name";
    name.textContent = p.name;
    const hcp = document.createElement("span");
    hcp.className = "player-hcp";
    hcp.textContent = `HCP ${p.hcp}`;
    li.appendChild(name);
    li.appendChild(hcp);
    scPlayers.appendChild(li);
  }

  if (scPlayers && scTeamToggle) {
    scPlayers.hidden = !scorecardTeamDetailsOpen;
    scTeamToggle.textContent = scorecardTeamDetailsOpen ? "Hide details" : "Show details";
    scTeamToggle.setAttribute("aria-expanded", scorecardTeamDetailsOpen ? "true" : "false");
  }

  buildScorecardBody(round, team, canEdit);
  updateScorecardTotals(round, team);
}

if (scTeamToggle && scPlayers) {
  scTeamToggle.addEventListener("click", () => {
    scorecardTeamDetailsOpen = !scorecardTeamDetailsOpen;
    scPlayers.hidden = !scorecardTeamDetailsOpen;
    scTeamToggle.textContent = scorecardTeamDetailsOpen ? "Hide details" : "Show details";
    scTeamToggle.setAttribute("aria-expanded", scorecardTeamDetailsOpen ? "true" : "false");
  });
}

function updateStepperDisplay(displayEl, resultEl, score, par) {
  if (score === null) {
    displayEl.value = "";
    displayEl.className = "score-input score-input-empty";
    resultEl.textContent  = "";
    resultEl.className    = "result-pill";
  } else {
    displayEl.value = String(score);
    const diff = score - par;
    const cls = diff <= -2 ? "eagle" : diff === -1 ? "birdie" : diff === 0 ? "par" : diff === 1 ? "bogey" : "double";
    displayEl.className  = `score-input score-input-${cls}`;
    resultEl.textContent = fmtScore(diff);
    applyResultClass(resultEl, diff);
  }
}

function playersInRound(round) {
  const names = [];
  const seen = new Set();
  for (const t of round.teams) {
    for (const p of t.players) {
      if (!seen.has(p.name)) {
        seen.add(p.name);
        names.push(p.name);
      }
    }
  }
  return names;
}

function renderPinCell(cell, round, holeIdx, team) {
  cell.innerHTML = "";
  const winner = state.pins[round.id]?.[holeIdx] || null;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = winner ? "pin-winner-btn" : "pin-picker-btn";
  btn.textContent = winner ? `Beat it: ${winner.split(" ")[0]}` : "Beat it";
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    activePinPicker = { roundId: round.id, tee: team.tee, holeIdx };
    openPinPicker(cell, round, holeIdx, team, winner);
  });
  cell.appendChild(btn);
}

function openPinPicker(cell, round, holeIdx, team, currentWinner) {
  cell.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "pin-picker";
  for (const name of playersInRound(round)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pin-player-btn" + (name === currentWinner ? " is-selected" : "");
    btn.textContent = name.split(" ")[0];
    btn.addEventListener("click", () => {
      const next = name === currentWinner ? null : name;
      if (!state.pins[round.id]) state.pins[round.id] = {};
      if (next === null) delete state.pins[round.id][holeIdx];
      else state.pins[round.id][holeIdx] = next;
      activePinPicker = null;
      saveState();
      renderPinCell(cell, round, holeIdx, team);
      updateScorecardTotals(round, team);
    });
    wrap.appendChild(btn);
  }
  cell.appendChild(wrap);

  const placePinPicker = () => {
    wrap.classList.remove("pin-picker-up");
    const rect = wrap.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const hasRoomBelow = rect.bottom <= viewportHeight - 8;
    if (!hasRoomBelow) wrap.classList.add("pin-picker-up");
  };

  requestAnimationFrame(placePinPicker);
}

function buildScorecardBody(round, team, canEdit = true) {
  const course = round.course;
  const holeCount = holeCountForCourse(course);
  const holes  = state.scores[round.id][team.tee];
  scBody.innerHTML = "";
  scBody.closest("table").classList.toggle("has-pins", course.pars.includes(3));

  const addSubRow = (label, start, end) => {
    const frag = scSubTpl.content.cloneNode(true);
    const row  = frag.querySelector("tr");
    row.dataset.subtotal = label;
    const titles = { front: "Front 9", back: "Back 9", total: "Total" };
    frag.querySelector("[data-sub-label]").textContent = titles[label];
    const yds = course.yards.slice(start, end).reduce((s, y) => s + y, 0);
    const par = course.pars.slice(start, end).reduce((s, p) => s + p, 0);
    frag.querySelector("[data-sub-yds]").textContent = yds || "";
    frag.querySelector("[data-sub-par]").textContent = String(par);
    scBody.appendChild(frag);
  };

  for (let i = 0; i < holeCount; i++) {
    if (i === 9) addSubRow("front", 0, 9);
    const frag = scHoleTpl.content.cloneNode(true);
    const row  = frag.querySelector("tr");
    row.dataset.hole = String(i);
    frag.querySelector("[data-num]").textContent = String(i + 1);
    frag.querySelector("[data-yds]").textContent = course.yards[i] || "";
    frag.querySelector("[data-par]").textContent = String(course.pars[i]);
    frag.querySelector("[data-si]").textContent  = String(course.si[i]);
    const displayEl = frag.querySelector("[data-score-input]");
    const resultEl  = frag.querySelector("[data-result]");

    displayEl.setAttribute("aria-label", `Score for hole ${i + 1}`);
    displayEl.disabled = !canEdit;

    updateStepperDisplay(displayEl, resultEl, parseNumber(holes[i]), course.pars[i]);

    const setScore = (newVal) => {
      state.scores[round.id][team.tee][i] = newVal === null ? "" : String(Math.max(1, Math.min(12, newVal)));
      saveState();
      showSaveFeedback("Auto-saved");
      updateStepperDisplay(displayEl, resultEl, parseNumber(state.scores[round.id][team.tee][i]), course.pars[i]);
      updateSubtotals(round, team);
      updateScorecardTotals(round, team);
      row.classList.add("score-updated");
      setTimeout(() => row.classList.remove("score-updated"), 350);
    };

    displayEl.addEventListener("input", () => {
      const raw = displayEl.value.trim();
      if (raw === "") {
        setScore(null);
        return;
      }
      const parsed = Number.parseInt(raw, 10);
      if (Number.isNaN(parsed)) return;
      setScore(parsed);
    });

    displayEl.addEventListener("blur", () => {
      const curr = parseNumber(state.scores[round.id][team.tee][i]);
      if (curr === null) {
        displayEl.value = "";
        setTimeout(flushPendingIncomingState, 0);
        return;
      }
      setScore(curr);
      setTimeout(flushPendingIncomingState, 0);
    });

    if (course.pars[i] === 3) {
      const pinCell = frag.querySelector("[data-pin-cell]");
      if (pinCell && canEdit) {
        renderPinCell(pinCell, round, i, team);
        const isActivePicker = activePinPicker
          && activePinPicker.roundId === round.id
          && activePinPicker.tee === team.tee
          && activePinPicker.holeIdx === i;
        if (isActivePicker) {
          const winner = state.pins[round.id]?.[i] || null;
          openPinPicker(pinCell, round, i, team, winner);
        }
      }
      if (pinCell && !canEdit) {
        const winner = state.pins[round.id]?.[i] || null;
        pinCell.textContent = winner ? `Beat it: ${winner.split(" ")[0]}` : "";
      }
    }
    scBody.appendChild(frag);
  }

  if (holeCount > 9) addSubRow("back", 9, holeCount);
  addSubRow("total", 0, holeCount);
  updateSubtotals(round, team);
}

function updateSubtotals(round, team) {
  const course = round.course;
  const holeCount = holeCountForCourse(course);
  const holes  = state.scores[round.id][team.tee];

  const updateRow = (label, start, end) => {
    const row = scBody.querySelector(`[data-subtotal="${label}"]`);
    if (!row) return;
    const slice  = holes.slice(start, end).map(parseNumber);
    const played = slice.filter(n => n !== null);
    const gross  = played.reduce((s, n) => s + n, 0);
    const par    = course.pars.slice(start, end).reduce((s, p) => s + p, 0);
    row.querySelector("[data-sub-score]").textContent = played.length > 0 ? String(gross) : "";
    const rel = row.querySelector("[data-sub-result]");
    if (played.length === (end - start)) {
      const diff = gross - par;
      if (label === "total") {
        const net = diff + team.headStart;
        rel.textContent = `Net ${fmtScore(net)}`;
        rel.className   = net < 0 ? "score-under" : net > 0 ? "score-over" : "score-even";
      } else {
        rel.textContent = fmtScore(diff);
        rel.className   = diff < 0 ? "score-under" : diff > 0 ? "score-over" : "score-even";
      }
    } else {
      rel.textContent = played.length > 0 ? `${played.length}/${end - start}` : "";
      rel.className   = "";
    }
  };

  updateRow("front", 0, Math.min(9, holeCount));
  if (holeCount > 9) updateRow("back", 9, holeCount);
  updateRow("total", 0, holeCount);
}

function updateScorecardTotals(round, team) {
  const holeCount = holeCountForCourse(round.course);
  const m = calcMetrics(round.id, team.tee, round.course);
  scGross.textContent = m.gross !== null ? String(m.gross) : "—";
  scFront.textContent = m.front !== null ? String(m.front) : "—";
  scBack.textContent  = holeCount > 9 && m.back !== null ? String(m.back) : "—";
  scThru.textContent  = `${m.played}/${holeCount}`;
  if (m.relToPar !== null) {
    const net = m.relToPar + team.headStart;
    scNet.textContent = fmtScore(net);
    scNet.className   = net < 0 ? "score-under" : net > 0 ? "score-over" : "score-even";
  } else {
    scNet.textContent = "—";
    scNet.className   = "";
  }
  const pinCard = document.getElementById("sc-pins");
  if (pinCard) {
    const hasPar3 = round.course.pars.includes(3);
    pinCard.hidden = !hasPar3;
    if (hasPar3) {
      const teamNames = new Set(team.players.map((p) => p.name));
      const myPins = Object.values(state.pins[round.id] || {}).filter((p) => teamNames.has(p)).length;
      document.getElementById("sc-pins-count").textContent = String(myPins);
    }
  }
}

function applyResultClass(el, diff) {
  el.className = "result-pill";
  if (diff <= -2)       el.classList.add("result-eagle");
  else if (diff === -1) el.classList.add("result-birdie");
  else if (diff === 0)  el.classList.add("result-par");
  else if (diff === 1)  el.classList.add("result-bogey");
  else                  el.classList.add("result-double");
}

// --- Events ---

backBtn.addEventListener("click", () => {
  state.activeView = "leaderboard";
  state.activeTee  = null;
  saveState();
  renderAll();
});

if (saveScoreBtn) {
  saveScoreBtn.addEventListener("click", () => {
    saveState();
    showSaveFeedback("Saved");
  });
}

roundTabs.forEach(btn => {
  btn.addEventListener("click", () => {
    activePinPicker = null;
    state.activeRound = btn.dataset.round;
    state.activeView  = "leaderboard";
    state.activeTee   = null;
    saveState();
    renderAll();
  });
});

// --- Live sync ---

function isServed() { return window.location.protocol !== "file:"; }

function syncToServer() {
  if (!isServed()) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    fetch(buildApiUrl("/api/state"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    }).then((response) => {
      if (response.status === 409) requestStateFromServer();
    }).catch(() => {});
  }, 300);
}

function requestStateFromServer() {
  if (!isServed()) return;
  fetch(buildApiUrl("/api/state"), { method: "GET" })
    .then((response) => response.ok ? response.json() : null)
    .then((incoming) => {
      if (incoming && typeof incoming === "object") applyIncomingState(incoming);
    })
    .catch(() => {});
}

let sseErrorTimer = null;

function connectToServer() {
  if (!isServed()) return;
  try {
    const es = new EventSource(buildApiUrl("/api/events"));
    es.addEventListener("open", () => {
      if (liveDot) liveDot.classList.add("is-live");
      if (sseErrorTimer) { clearTimeout(sseErrorTimer); sseErrorTimer = null; }
      requestStateFromServer();
      syncToServer();
    });
    window.addEventListener("storage", (event) => {
      if (event.key === `${STORAGE_KEY}:sync` && event.newValue) {
        syncToServer();
      }
    });
    es.addEventListener("message", (event) => {
      try {
        const incoming = JSON.parse(event.data);
        applyIncomingState(incoming);
      } catch { isApplyingServerUpdate = false; }
    });
    es.addEventListener("error", () => {
      if (liveDot) liveDot.classList.remove("is-live");
      // If SSE stays broken for 10s, tear down and reconnect from scratch
      if (!sseErrorTimer) {
        sseErrorTimer = setTimeout(() => {
          sseErrorTimer = null;
          es.close();
          connectToServer();
        }, 10_000);
      }
    });
    if (syncPollTimer) clearInterval(syncPollTimer);
    syncPollTimer = setInterval(requestStateFromServer, 5000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) requestStateFromServer();
    });
  } catch {
    if (liveDot) liveDot.classList.remove("is-live");
  }
}

// --- Player lookup & identity ---

const PLAYER_SCHEDULE = (() => {
  const map = new Map();
  for (const round of ROUNDS) {
    for (const team of round.teams) {
      for (const player of team.players) {
        if (!map.has(player.name)) map.set(player.name, []);
        map.get(player.name).push({ round, team });
      }
    }
  }
  return map;
})();

const ALL_PLAYERS = Array.from(PLAYER_SCHEDULE.keys()).sort();

const playerModal    = document.getElementById("player-modal");
const playerGrid     = document.getElementById("player-grid");
const playerSchedule = document.getElementById("player-schedule");
const userPillBtn    = document.getElementById("user-pill");
const matchupsBtn    = document.getElementById("matchups-btn");
const closeModalBtn  = document.getElementById("close-modal");
const changeIdentityBtn = document.getElementById("change-identity-btn");

function formatSelectorName(name) {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0];
  const second = parts[1] || "";
  if (parts.length === 2 && second.length <= 2) return `${parts[0]} ${second}`;
  return `${parts[0]} ${second[0]}.`;
}

function renderIdentityScreen() {
  const grid = document.getElementById("identity-player-grid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const name of ALL_PLAYERS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "identity-player-btn";
    btn.textContent = formatSelectorName(name);
    btn.addEventListener("click", () => selectIdentity(name));
    grid.appendChild(btn);
  }
}

function selectIdentity(name) {
  myName = name;
  localStorage.setItem(MY_NAME_KEY, name);
  document.getElementById("identity-overlay").hidden = true;
  document.body.style.overflow = "";
  updateUserPill();
  renderAll();
}

function updateUserPill() {
  if (!userPillBtn) return;
  if (myName) {
    userPillBtn.textContent = `⛳ ${myName.split(" ")[0]}`;
    userPillBtn.classList.remove("is-unset");
    if (matchupsBtn) matchupsBtn.disabled = false;
  } else {
    userPillBtn.textContent = "Who are you?";
    userPillBtn.classList.add("is-unset");
    if (matchupsBtn) matchupsBtn.disabled = true;
  }
}

function openPlayerModal(selectedName = null) {
  playerGrid.innerHTML = "";
  for (const name of ALL_PLAYERS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "player-select-btn" + (name === selectedName ? " is-selected" : "");
    btn.textContent = formatSelectorName(name);
    btn.addEventListener("click", () => showPlayerSchedule(name));
    playerGrid.appendChild(btn);
  }
  if (selectedName) showPlayerSchedule(selectedName);
  playerModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function showPlayerSchedule(name) {
  playerGrid.querySelectorAll(".player-select-btn").forEach(b => {
    b.classList.toggle("is-selected", b.textContent.split(" ")[0] === name.split(" ")[0]);
  });
  const rounds = PLAYER_SCHEDULE.get(name) || [];
  playerSchedule.innerHTML = "";
  const heading = document.createElement("h3");
  heading.className = "schedule-name";
  heading.textContent = name;
  playerSchedule.appendChild(heading);
  for (const { round, team } of rounds) {
    const teammates = team.players.filter(p => p.name !== name).map(p => p.name);
    const card = document.createElement("div");
    card.className = "schedule-round-card";
    const hsText = team.headStart === 0 ? "E" : `${team.headStart}`;
    card.innerHTML = `
      <div class="schedule-round-header">
        <span class="schedule-round-label">${round.fullLabel}</span>
        <span class="schedule-tee-time">${team.teeTime}</span>
      </div>
      <div class="schedule-course">${round.course.name}</div>
      <div class="schedule-teammates">With: ${teammates.join(", ")}</div>
      <span class="schedule-head-start">Head start ${hsText}</span>
    `;
    playerSchedule.appendChild(card);
  }
}

function closePlayerModal() {
  playerModal.hidden = true;
  document.body.style.overflow = "";
}

function openIdentityPicker() {
  closePlayerModal();
  const overlay = document.getElementById("identity-overlay");
  if (!overlay) return;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  renderIdentityScreen();
}

userPillBtn.addEventListener("click", () => {
  openIdentityPicker();
});
if (matchupsBtn) {
  matchupsBtn.addEventListener("click", () => {
    if (!myName) return;
    openPlayerModal(myName);
  });
}
closeModalBtn.addEventListener("click", closePlayerModal);
if (changeIdentityBtn) changeIdentityBtn.addEventListener("click", openIdentityPicker);
playerModal.addEventListener("click", (e) => { if (e.target === playerModal) closePlayerModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closePlayerModal(); closeChat(); } });
document.addEventListener("click", (event) => {
  if (!activePinPicker) return;
  if (event.target instanceof Element && event.target.closest(".pin-col")) return;
  activePinPicker = null;
  renderAll();
});

// --- Chat ---

const chatModal    = document.getElementById("chat-modal");
const chatMessages = document.getElementById("chat-messages");
const chatInput    = document.getElementById("chat-input");
const openChatBtn  = document.getElementById("open-chat");
const closeChatBtn = document.getElementById("close-chat");

function openChat() {
  chatModal.hidden = false;
  document.body.style.overflow = "hidden";
  // Clear notification badge
  const badge = document.getElementById("chat-badge");
  if (badge) badge.hidden = true;
  renderChat();
}

function closeChat() {
  chatModal.hidden = true;
  document.body.style.overflow = "";
}

function renderChat() {
  chatMessages.innerHTML = "";
  const msgs = state.chat || [];
  if (msgs.length === 0) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent = "No messages yet. Start the trash talk.";
    chatMessages.appendChild(empty);
    return;
  }
  let lastSender = null;
  for (const msg of msgs) {
    const isMe = msg.name === myName;
    const showName = msg.name !== lastSender && !isMe;
    lastSender = msg.name;
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + (isMe ? "chat-mine" : "chat-theirs");
    if (showName) {
      const s = document.createElement("div");
      s.className = "chat-sender";
      s.textContent = msg.name;
      bubble.appendChild(s);
    }
    const t = document.createElement("div");
    t.className = "chat-text";
    t.textContent = msg.text;
    bubble.appendChild(t);
    const ts = document.createElement("div");
    ts.className = "chat-time";
    ts.textContent = new Date(msg.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    bubble.appendChild(ts);
    chatMessages.appendChild(bubble);
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  if (!state.chat) state.chat = [];
  state.chat.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}`, name: myName || "Someone", text, ts: Date.now() });
  if (state.chat.length > 100) state.chat = state.chat.slice(-100);
  chatInput.value = "";
  saveState();
  renderChat();
}

openChatBtn.addEventListener("click", openChat);
closeChatBtn.addEventListener("click", closeChat);
chatModal.addEventListener("click", (e) => { if (e.target === chatModal) closeChat(); });
chatInput.addEventListener("keydown", (e) => { if (e.key === "Enter") sendMessage(); });
document.getElementById("chat-send").addEventListener("click", sendMessage);

renderAll();
connectToServer();
