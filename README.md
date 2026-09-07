# Purple Profile

A lightweight, static personal developer/creator profile website — dark purple,
atmospheric, and fast. No backend, no build step, no framework. Just HTML, CSS
and vanilla JavaScript, ready for **GitHub Pages**.

## Customize everything from `config/` — no code editing needed

| File | Controls |
| --- | --- |
| `config/profile.json` | nickname, avatar, bio, status, social links |
| `config/music.json` | the music player playlist |
| `config/projects.json` | the project cards |
| `config/about.json` | the About section text, languages, tools, interests |

Replace `assets/avatar.png` with your own avatar, drop your `.mp3` files into
`music/`, and you're done.

## Run locally

Because the site loads JSON with `fetch()`, open it through a local web server
(not the `file://` protocol). Any static server works, for example:

```bash
npx serve .
```

Then open the printed URL.

## Deploy to GitHub Pages

1. Push these files to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Set **Source** to your default branch (root).
4. Your site goes live at `https://<username>.github.io/<repository>/`.

All paths are relative, so it works both at the domain root and in a
`/repository-name/` subpath.

## Notes

- Music does **not** autoplay — browsers block that. Press play to start.
- Respects `prefers-reduced-motion` for accessibility.
- `package.json` only exists to run a local dev server; it is not needed for
  GitHub Pages hosting.
