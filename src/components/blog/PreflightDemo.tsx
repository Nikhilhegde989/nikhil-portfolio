import React from 'react';
import { DemoPlayer } from './DemoPlayer';
import type { Scenario } from './DemoPlayer';

const SCENARIOS: Scenario[] = [
  {
    id: 'simple-get',
    tab: 'Simple GET',
    insight:
      "No preflight fires. The request hits your backend immediately regardless of origin. If this endpoint has any side effect — logging, modifying data, triggering a process — that side effect already happened before any CORS check.",
    steps: [
      {
        label: 'Browser prepares a plain GET with no custom headers',
        panelType: 'browser',
        status: 'neutral',
        content: `fetch("https://api.mysite.com/data")

// Method: GET
// No custom headers
// No Content-Type: application/json
// → This is a "simple request"
// → No preflight will fire`,
      },
      {
        label: 'Browser sends GET directly — no OPTIONS preflight',
        panelType: 'terminal',
        status: 'warning',
        content: `GET /api/data HTTP/1.1
Host: api.mysite.com
Origin: https://evil.com

# No OPTIONS request came before this.
# The browser sent the actual request immediately.`,
      },
      {
        label: 'Backend receives and processes the request',
        panelType: 'terminal',
        status: 'success',
        content: `[server] ✓ Request received
[server] ✓ Logic executed
[server] → Sending response...

# If this GET had side effects — they just happened.
# No preflight saved you.`,
      },
      {
        label: 'Browser does CORS check after the fact',
        panelType: 'browser',
        status: 'blocked',
        content: `Checking Access-Control-Allow-Origin...

  Header: "https://mysite.com"
  Origin: "https://evil.com"

  ✗ CORS blocked — JS cannot read the response.

──────────────────────────────────────────────
  But the backend already ran.
  Preflight never fired to prevent this.
  Simple requests bypass the preflight safety net.`,
      },
    ],
  },
  {
    id: 'post-json',
    tab: 'POST + application/json',
    insight:
      "Preflight fired and protected the backend. The actual POST was never sent — the backend never received it, never processed it. This is the one scenario where preflight genuinely saves you.",
    steps: [
      {
        label: 'Browser prepares POST with application/json',
        panelType: 'browser',
        status: 'neutral',
        content: `fetch("https://api.mysite.com/transfer", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: 1000, to: "attacker" })
})

// Content-Type: application/json makes this non-simple.
// Browser will send OPTIONS preflight first.`,
      },
      {
        label: 'Browser sends OPTIONS preflight before the actual POST',
        panelType: 'terminal',
        status: 'neutral',
        content: `OPTIONS /api/transfer HTTP/1.1
Host: api.mysite.com
Origin: https://evil.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type

# "Hey server, can I send a POST from evil.com
#  with Content-Type header?"`,
      },
      {
        label: 'Server responds to preflight — origin not in allowed list',
        panelType: 'terminal',
        status: 'blocked',
        content: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://mysite.com
Access-Control-Allow-Methods: POST

# evil.com is NOT in the allowed origins.
# Browser will see this and block the actual POST.`,
      },
      {
        label: 'Browser blocks the actual POST — it never leaves the browser',
        panelType: 'browser',
        status: 'blocked',
        content: `✗ Preflight failed

  Access-Control-Allow-Origin: "https://mysite.com"
  Request origin: "https://evil.com"

  The POST request was never sent.
  The backend never received it.
  The transfer never happened.

──────────────────────────────────────────────
  Preflight protected the backend here.
  This is what it was designed to prevent.`,
      },
    ],
  },
  {
    id: 'get-auth',
    tab: 'GET + Authorization',
    insight:
      "A plain GET triggered preflight — because of the Authorization header. The trigger isn't the method alone, it's any condition that makes the request non-simple. In practice, almost every real API call carries either application/json or an auth header. Preflight fires more often than most developers realise.",
    steps: [
      {
        label: 'Browser prepares GET — but with an Authorization header',
        panelType: 'browser',
        status: 'neutral',
        content: `fetch("https://api.mysite.com/data", {
  headers: { "Authorization": "Bearer user-token-xyz" }
})

// Method: GET — seems simple
// But Authorization is a custom header.
// → This is now a non-simple request.
// → Preflight will fire. For a GET.`,
      },
      {
        label: 'Browser sends OPTIONS preflight — even for a GET',
        panelType: 'terminal',
        status: 'warning',
        content: `OPTIONS /api/data HTTP/1.1
Host: api.mysite.com
Origin: https://evil.com
Access-Control-Request-Method: GET
Access-Control-Request-Headers: Authorization

# Preflight for a GET request.
# Most developers don't expect this.
# The Authorization header is what triggered it.`,
      },
      {
        label: 'Server responds — origin not allowed',
        panelType: 'terminal',
        status: 'blocked',
        content: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://mysite.com
Access-Control-Allow-Headers: Authorization

# evil.com not in allowed origins.`,
      },
      {
        label: 'Browser blocks the GET — backend never received it',
        panelType: 'browser',
        status: 'blocked',
        content: `✗ Preflight failed

  The GET request was never sent.
  Backend terminal shows nothing.

──────────────────────────────────────────────
  Key insight:
  The HTTP method alone doesn't determine
  whether preflight fires.

  A single custom header is enough.
  Authorization, X-API-Key, X-Request-ID —
  any of these on any method → preflight fires.`,
      },
    ],
  },
];

export function PreflightDemo() {
  return <DemoPlayer scenarios={SCENARIOS} title="Preflight Behaviour Demo" />;
}
