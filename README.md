# The Forge

An anonymous progress board. People claim a random codename, set a PIN, and tick off shared tasks — everyone sees the grid, but only the admin knows who's behind each codename.

No backend to run, no database to manage: a Google Sheet is the database, a Google Apps Script is the API, and this page is the frontend.

```
GitHub Pages (this page)  →  Apps Script web app  →  private Google Sheet
```

## How it works

- **Tasks** are columns, **codenames** are rows, cells are checkmarks.
- People roll a random codename (e.g. *polite walrus*), set a PIN, and can only tick their own row.
- An optional real name is collected at signup and stored **only in the sheet** — it never reaches the board.
- The admin's own progress shows as a pinned row, driven by the sheet.
- Sessions persist on-device via `localStorage`, so people stay signed in across reloads.

## Setup

Full step-by-step instructions are in **`SETUP_GUIDE.md`**. The short version:

1. New Google Sheet → **Extensions → Apps Script** → paste `Code.gs` → run `setup()` once.
2. **Deploy → New deployment → Web app** (Execute as *Me*, access *Anyone*) → copy the `/exec` URL.
3. Paste that URL into `index.html` at `const SCRIPT_URL = "…"`.
4. Push `index.html` here and enable **GitHub Pages** (Settings → Pages → deploy from `main` / root).

## Config

A couple of constants near the top of the `<script>` in `index.html`:

| Constant | What it does |
|---|---|
| `SCRIPT_URL` | Your Apps Script web app URL. Required. |
| `ADMIN_NAME` | Label shown on the admin row. |

## Admin notes

- Add/edit tasks directly in the **Tasks** tab — no redeploy needed.
- The **Users** tab holds the codename → real name map (private to you).
- Reset a forgotten PIN by deleting that person's row in **Users**; they re-roll a new codename.
- If you change `Code.gs`, redeploy a **new version** for it to take effect.

## Files

- `index.html` — the page (hosted here on Pages).
- `Code.gs` — the Apps Script backend (lives in the Sheet, not this repo).
- `SETUP_GUIDE.md` — full deploy walkthrough.
