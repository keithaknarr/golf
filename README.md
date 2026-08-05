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

Use the Team page to enter scores. Use the Leaderboard page to compare teams.

## Hosting

This app uses a small Node server for live score syncing, so it should be deployed on a host that supports server-side Node.js and keeps the process running continuously. The current Render configuration is the recommended path for a 6-day event because it can keep the app online and expose a health endpoint.

For reliable multi-phone access over several days:
- Use an always-on plan, not a free tier that can sleep or shut down.
- Keep the app on a single stable public URL.
- Make sure the server can write to persistent storage for shared state.

## Files

- `package.json` defines the `npm start` command.
- `scripts/start.js` serves the static app.
- `index.html` contains the app shell.
- `src/app.js` contains the team and leaderboard logic.
- `src/styles.css` contains the UI styling.