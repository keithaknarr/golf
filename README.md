# golf

Golf scramble score tracker with a team page and leaderboard page.

## What it does

- Tracks a scramble team roster.
- Lets you enter hole-by-hole team scores.
- Calculates total strokes, front nine, back nine, and relative to par.
- Saves the current round in local storage.
- Tracks multiple scramble teams.
- Lets any teammate enter hole-by-hole scores on the team page.
- Shows a leaderboard sorted by score.
- Uses Skytop Golf Course as the first-day course.

## How to use

Run `npm start`, then open http://localhost:8000.

You can also open `index.html` directly in a browser if you prefer.

Use the Team page to enter scores. Use the Leaderboard page to compare teams.

## Files

- `package.json` defines the `npm start` command.
- `scripts/start.js` serves the static app.
- `index.html` contains the app shell.
- `src/app.js` contains the team and leaderboard logic.
- `src/styles.css` contains the UI styling.