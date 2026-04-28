import React from 'react';
import { DemoPlayer } from './DemoPlayer';
import type { Scenario } from './DemoPlayer';

const SCENARIOS: Scenario[] = [
  {
    id: 'blocked',
    tab: 'Blocked Origin',
    insight:
      "Your JS gets an error. The backend already processed the request, updated the database, and sent a response. CORS blocked your code from reading that response — not the request from reaching the server.",
    steps: [
      {
        label: 'Browser sends request from a non-whitelisted origin',
        panelType: 'browser',
        status: 'neutral',
        content: `fetch("https://api.mysite.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "getData" })
})

// Browser automatically attaches:
// Origin: https://evil.com`,
      },
      {
        label: 'Backend receives, processes, and responds',
        panelType: 'terminal',
        status: 'success',
        content: `POST /api/data HTTP/1.1
Host: api.mysite.com
Origin: https://evil.com
Content-Type: application/json

[server] ✓ Request received
[server] ✓ Business logic executed
[server] ✓ Database updated
[server] → Sending 200 OK...`,
      },
      {
        label: 'Backend sends 200 OK with the CORS header',
        panelType: 'terminal',
        status: 'success',
        content: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://mysite.com
Content-Type: application/json

{ "status": "success", "data": { ... } }

# Response is heading to the browser.
# Note: CORS header is set to mysite.com — not evil.com.`,
      },
      {
        label: 'Browser inspects the CORS header',
        panelType: 'browser',
        status: 'blocked',
        content: `Checking Access-Control-Allow-Origin...

  Header value:    "https://mysite.com"
  Request origin:  "https://evil.com"

  ✗ Mismatch — blocking JS from reading the response`,
      },
      {
        label: 'Your JavaScript sees an error. Backend already ran.',
        panelType: 'browser',
        status: 'blocked',
        content: `⛔ TypeError: Failed to fetch

Access to fetch at 'https://api.mysite.com/data'
from origin 'https://evil.com' has been blocked
by CORS policy.

──────────────────────────────────────────────
  Your JS sees this error.
  The backend already processed the request.
  The database was already updated.
  CORS blocked your code from reading the response.
  It did not stop the request from reaching the server.`,
      },
    ],
  },
  {
    id: 'allowed',
    tab: 'Allowed Origin',
    insight:
      'Clean flow. Origins match, browser hands the response to your JavaScript. This is CORS doing its intended job — selectively relaxing the Same-Origin Policy for trusted origins.',
    steps: [
      {
        label: 'Browser sends request from a whitelisted origin',
        panelType: 'browser',
        status: 'neutral',
        content: `fetch("https://api.mysite.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "getData" })
})

// Browser automatically attaches:
// Origin: https://mysite.com`,
      },
      {
        label: 'Backend receives and processes normally',
        panelType: 'terminal',
        status: 'success',
        content: `POST /api/data HTTP/1.1
Host: api.mysite.com
Origin: https://mysite.com

[server] ✓ Request received
[server] ✓ Business logic executed
[server] → Sending 200 OK...`,
      },
      {
        label: 'Backend sends response with matching CORS header',
        panelType: 'terminal',
        status: 'success',
        content: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://mysite.com
Content-Type: application/json

{ "status": "success", "data": { ... } }`,
      },
      {
        label: 'Browser inspects the CORS header',
        panelType: 'browser',
        status: 'success',
        content: `Checking Access-Control-Allow-Origin...

  Header value:    "https://mysite.com"
  Request origin:  "https://mysite.com"

  ✓ Match — allowing response through to JS`,
      },
      {
        label: 'Your JavaScript receives the response',
        panelType: 'browser',
        status: 'success',
        content: `✓ Response received

{
  "status": "success",
  "data": {
    "items": [ ... ],
    "total": 42
  }
}`,
      },
    ],
  },
  {
    id: 'curl',
    tab: 'curl — no browser',
    insight:
      "curl doesn't implement CORS because it's not a browser. The Origin header it sends is self-reported and completely unverifiable by the server. There's no enforcement layer outside the browser.",
    steps: [
      {
        label: 'curl sends a request with a fabricated Origin header',
        panelType: 'terminal',
        status: 'warning',
        content: `$ curl -X POST https://api.mysite.com/data \\
  -H "Origin: https://google.com" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "getData"}'

# No browser. No CORS enforcement.
# The Origin header is completely fabricated.
# The server cannot verify whether it's real.`,
      },
      {
        label: 'Backend receives and processes — no questions asked',
        panelType: 'terminal',
        status: 'success',
        content: `POST /api/data HTTP/1.1
Origin: https://google.com    ← self-reported, unverifiable

[server] ✓ Request received
[server] ✓ Business logic executed
[server] → Sending 200 OK...`,
      },
      {
        label: 'curl receives the full response — CORS header ignored',
        panelType: 'terminal',
        status: 'warning',
        content: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://mysite.com
Content-Type: application/json

{ "status": "success", "data": { ... } }

# curl displays this in full.
# It sees the CORS header and ignores it.
# No browser = no one to enforce CORS.
# "google.com" as Origin was never challenged.`,
      },
    ],
  },
];

export function CORSDemo() {
  return <DemoPlayer scenarios={SCENARIOS} title="Interactive CORS Demo" />;
}
