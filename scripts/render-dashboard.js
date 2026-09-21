#!/usr/bin/env node
/**
 * Writes public/index.html: Domo Cafe PRD cards, then links to every other file
 * so the static server still has a homepage index after index.html exists.
 */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const outFile = path.join(publicDir, 'index.html');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function listEntries() {
  return fs
    .readdirSync(publicDir, { withFileTypes: true })
    .filter((entry) => entry.name !== 'index.html' && entry.name !== '.DS_Store')
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    .map((entry) => {
      const isDir = entry.isDirectory();
      const href = isDir ? `/${entry.name}/` : `/${entry.name}`;
      return { name: isDir ? `${entry.name}/` : entry.name, href };
    });
}

const fileLinks = listEntries()
  .map(
    (entry) =>
      `        <li><a href="${escapeHtml(entry.href)}">${escapeHtml(entry.name)}</a></li>`
  )
  .join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jarvis HQ — SPS Dashboard</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0a0a0f;
      --surface: #111118;
      --border: rgba(255,255,255,0.08);
      --text: #f0f0f5;
      --muted: #888899;
      --green: #22c55e;
      --accent: #7c6af8;
    }
    body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 32px 20px 64px;
    }
    main { max-width: 1100px; margin: 0 auto; }
    header { margin-bottom: 28px; }
    .eyebrow {
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 8px;
    }
    h1 { font-size: 32px; letter-spacing: -0.6px; line-height: 1.15; }
    .lede { color: var(--muted); margin-top: 10px; max-width: 640px; line-height: 1.5; }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
      margin: 8px 0 14px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 14px;
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
      text-decoration: none;
      color: inherit;
    }
    .card.current { border-color: rgba(34,197,94,0.45); }
    .card:hover { border-color: rgba(255,255,255,0.28); }
    .badge {
      align-self: flex-start;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border-radius: 999px;
      padding: 4px 10px;
    }
    .badge-live { background: rgba(34,197,94,0.15); color: var(--green); }
    .badge-prev { background: rgba(255,255,255,0.08); color: var(--muted); }
    .card h2 { font-size: 18px; line-height: 1.3; }
    .card p { color: var(--muted); font-size: 14px; line-height: 1.45; }
    .url { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: #a78bfa; word-break: break-all; }
    .files { margin-top: 36px; }
    .files ul { list-style: none; columns: 2; gap: 24px; }
    .files a { color: #d6d6e0; text-decoration: none; font-size: 13px; display: inline-block; padding: 4px 0; }
    .files a:hover { color: white; text-decoration: underline; }
    .hq-link { color: var(--accent); }
    @media (max-width: 700px) {
      h1 { font-size: 26px; }
      .files ul { columns: 1; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <div class="eyebrow">Jarvis HQ · SPS Dashboard</div>
      <h1>Domo Cafe</h1>
      <p class="lede">PRD navigation for the Domo Cafe App and CHOMPS loyalty. v0.2 is the current document. The full project directory also lives on <a class="hq-link" href="https://izzy-spsi.github.io/jarvis-dashboard/">Jarvis HQ</a>.</p>
    </header>

    <div class="section-title">Domo Cafe</div>
    <div class="grid">
      <a class="card current" href="https://sps-production-7dbc.up.railway.app/domo-app-prd-v0.2">
        <span class="badge badge-live">Current · Live v0.2</span>
        <h2>Domo Cafe App &amp; CHOMPS Loyalty — PRD v0.2</h2>
        <p>Current PRD for the Domo Cafe App and CHOMPS loyalty system. Merges the v0.1 app PRD with the CHOMPS v0.2 loyalty mechanic and adds the UX/UI design workflows section.</p>
        <div class="url">sps-production-7dbc.up.railway.app/domo-app-prd-v0.2</div>
      </a>

      <a class="card" href="https://sps-production-7dbc.up.railway.app/domo-app-prd-v0.1">
        <span class="badge badge-prev">Previous v0.1</span>
        <h2>Domo Cafe App &amp; Chomps Loyalty — PRD v0.1</h2>
        <p>Full product requirements doc for the Domo Cafe App and Chomps loyalty system. 12 sections: Domo Crew tiers, order-connected surveys, fan engagement, merch drops, events, digital menu, Toast API integration, intelligence layer, off-peak demand levers, and out-of-town fan strategy. Kept for reference. v0.2 is current.</p>
        <div class="url">sps-production-7dbc.up.railway.app/domo-app-prd-v0.1</div>
      </a>

      <a class="card" href="https://sps-production-7dbc.up.railway.app/chomps-prd-v0.2">
        <span class="badge badge-live">CHOMPS · Live v0.2</span>
        <h2>CHOMPS — PRD v0.2</h2>
        <p>Standalone product requirements doc for Chomps, the Domo Cafe membership/status platform. No redemption — lifetime score + tier unlocks, rolling annual tier re-qualification, curated Legend tier, automated anti-fraud tracking. IP-touch considerations for NHK.</p>
        <div class="url">sps-production-7dbc.up.railway.app/chomps-prd-v0.2</div>
      </a>
    </div>

    <section class="files">
      <div class="section-title">All files</div>
      <ul>
${fileLinks}
      </ul>
    </section>
  </main>
</body>
</html>
`;

fs.writeFileSync(outFile, html);
console.log(`Wrote ${outFile} (${listEntries().length} file links)`);
