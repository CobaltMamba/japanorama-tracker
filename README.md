# Japanorama Tracker

An interactive map and scoreboard for following **Jet Lag: The Game — Season 19: Japanorama**, tracking which prefectures each team has cleared, their route across the country so far, their current hand of cards, and what's on the board — episode by episode.

🔗 **Live site:** https://cobaltmamba.github.io/japanorama-tracker/

> This is an unofficial fan project, not affiliated with Jet Lag: The Game, Nebula, or Wendover Productions.

## What it does

- An interactive SVG map of all 47 Japanese prefectures (built from real boundary data, not hand-drawn), colour-coded by which team has cleared each one — yellow, red, or striped if both teams have
- A rough dashed line tracing each team's route across the whole season so far, with a stop marker at their position at the end of every episode
- An episode selector — with both Nebula and YouTube release dates — that defaults to whichever episode most recently went up on YouTube
- "Challenges on the board": a row of balls showing the current challenges and how many cards each is worth
- Playing-card style hands for both teams, up to 5 cards each

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `style.css` | All styling |
| `script.js` | Map rendering, interactions, and the tracker logic |
| `season-data.json` | **The only file you need to edit.** Episodes, unlocked prefectures, routes, hands, and challenges all live here — see the `_readme` field at the top of the file for the exact format |

## Keeping it up to date

Editing `season-data.json` after each episode is all it takes — no build step, no other files need to change. Once a prefecture is unlocked it stays unlocked for the rest of the season, so you only ever need to list what's *newly* unlocked and each team's route for that episode; the app works out the cumulative picture on its own.

## Running it locally

The app loads `season-data.json` with `fetch()`, so opening `index.html` straight from disk (`file://`) won't work — browsers block that for local files. From this folder, run:

```
python3 -m http.server
```

then open `http://localhost:8000`.

## ✨ Vibe coded with Claude Sonnet 5

This whole project — the map (real prefecture geometry, not hand-drawn approximations), the click/hover/zoom interactions, the episode tracker, and this README — was built conversationally with **Claude Sonnet 5** (Anthropic), one request at a time, without hand-writing the code directly. Any complaints, take it up with the robot.

## License

Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — free to use, modify, and share, including commercially, as long as it's credited.
