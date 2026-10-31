import { siteConfig } from "@/lib/constants/site";

/**
 * Temporary maintenance mode, controlled by one environment variable: set MAINTENANCE_MODE=true
 * (in `.env.local` or the host's environment settings) and restart the server to take the site
 * offline; remove it or set it to anything else and restart to bring the site back. No rebuild
 * is needed, because `proxy.ts` reads it at request time. `proxy.ts` serves `maintenanceHtml()`
 * instead of every page, so no page, component or data is touched.
 */
export function isMaintenanceMode(): boolean {
  return process.env.MAINTENANCE_MODE?.trim().toLowerCase() === "true";
}

const title = "Website Temporarily Disabled";

/** Self-contained page (inline CSS, no layout or scripts) so nothing from the normal site is reachable. */
export function maintenanceHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title} | ${siteConfig.name}</title>
<link rel="icon" href="/icon.png">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;
background:#faf6ea;color:#2a2f3a;text-align:center;
font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
h1{margin:0;font-size:clamp(1.5rem,5vw,2.5rem);font-weight:600;line-height:1.25}
</style>
</head>
<body>
<h1>${title}</h1>
</body>
</html>`;
}
