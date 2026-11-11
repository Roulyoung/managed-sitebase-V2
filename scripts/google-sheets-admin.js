import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

const getArg = (name, fallback = "") => {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  const value = args[index + 1];
  return value && !value.startsWith("--") ? value : fallback;
};

const SHEET_ID = getArg("--sheet-id") || process.env.SHEET_ID || "";
const SERVICE_ACCOUNT_PATH =
  process.env.SERVICE_ACCOUNT_PATH || path.resolve(__dirname, "..", "worker", "secretgogle", "service-account.json");
const SCHEMA_PATH = getArg("--schema", "");
const RANGE = getArg("--range", "");
const TAB = getArg("--tab", "");
const VALUES_RAW = getArg("--values", "");

const USAGE = [
  "Usage:",
  "  node scripts/google-sheets-admin.js info --sheet-id <id>",
  "  node scripts/google-sheets-admin.js read --sheet-id <id> --range <Sheet!A1:B10>",
  "  node scripts/google-sheets-admin.js write --sheet-id <id> --range <Sheet!A1:B10> --values '[[\"a\",\"b\"]]'",
  "  node scripts/google-sheets-admin.js append --sheet-id <id> --tab <Sheet> --values '[[\"a\",\"b\"]]'",
  "  node scripts/google-sheets-admin.js bootstrap --sheet-id <id> --schema <schema.json>",
].join("\n");

if (!command || !["info", "read", "write", "append", "bootstrap"].includes(command)) {
  console.error(USAGE);
  process.exit(1);
}

if (!SHEET_ID) {
  console.error("Missing sheet id. Set SHEET_ID or pass --sheet-id.");
  process.exit(1);
}

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error(`Missing service account file: ${SERVICE_ACCOUNT_PATH}`);
  console.error("Set SERVICE_ACCOUNT_PATH to a local JSON key outside the repo.");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));

function base64url(input, skipEncode = false) {
  const str = skipEncode ? input : Buffer.from(input).toString("base64");
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claimSet = base64url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  );

  const unsigned = `${header}.${claimSet}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(serviceAccount.private_key, "base64");
  const jwt = `${unsigned}.${base64url(signature, true)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Token request failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function requestJson(url, token, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }
  if (!res.ok) {
    throw new Error(`Google Sheets API request failed (${res.status}): ${typeof parsed === "string" ? parsed : JSON.stringify(parsed)}`);
  }
  return parsed;
}

function loadSchema(schemaPath) {
  if (!schemaPath) return null;
  const resolved = path.isAbsolute(schemaPath) ? schemaPath : path.resolve(process.cwd(), schemaPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Schema file not found: ${resolved}`);
  }
  return JSON.parse(fs.readFileSync(resolved, "utf8"));
}

async function clearRange(token, range) {
  await requestJson(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:clear`, token, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

async function info(token) {
  const data = await requestJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=spreadsheetId,properties.title,sheets.properties.title`,
    token,
  );
  console.log(JSON.stringify(data, null, 2));
}

async function readRange(token, range) {
  if (!range) throw new Error("--range is required for read");
  const data = await requestJson(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}`, token);
  console.log(JSON.stringify(data, null, 2));
}

async function writeRange(token, range, values) {
  if (!range) throw new Error("--range is required for write");
  if (!Array.isArray(values)) throw new Error("--values must be a JSON array of rows");

  const data = await requestJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
    token,
    {
      method: "PUT",
      body: JSON.stringify({ values }),
    },
  );
  console.log(JSON.stringify(data, null, 2));
}

async function appendRows(token, tab, values) {
  if (!tab) throw new Error("--tab is required for append");
  if (!Array.isArray(values)) throw new Error("--values must be a JSON array of rows");

  const range = `${tab}!A:Z`;
  const data = await requestJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
    token,
    {
      method: "POST",
      body: JSON.stringify({ values }),
    },
  );
  console.log(JSON.stringify(data, null, 2));
}

async function bootstrap(token, schemaPath) {
  const schema = loadSchema(schemaPath);
  if (!schema || typeof schema !== "object") {
    throw new Error("Bootstrap requires --schema <schema.json> with a tabs object.");
  }

  const tabs = schema.tabs && typeof schema.tabs === "object" ? schema.tabs : null;
  if (!tabs) {
    throw new Error("Schema must contain a tabs object.");
  }

  const sheetMeta = await requestJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties.title,sheets.properties.sheetId`,
    token,
  );
  const existingTabs = new Set((sheetMeta.sheets || []).map((sheet) => sheet.properties?.title));
  const requests = [];
  for (const tabName of Object.keys(tabs)) {
    if (!existingTabs.has(tabName)) {
      requests.push({ addSheet: { properties: { title: tabName } } });
    }
  }

  if (requests.length > 0) {
    await requestJson(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, token, {
      method: "POST",
      body: JSON.stringify({ requests }),
    });
  }

  for (const [tabName, headers] of Object.entries(tabs)) {
    if (!Array.isArray(headers) || headers.length === 0) {
      throw new Error(`Schema tab '${tabName}' must be an array of header names.`);
    }
    await requestJson(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`${tabName}!A1`)}?valueInputOption=USER_ENTERED`,
      token,
      {
        method: "PUT",
        body: JSON.stringify({ values: [headers] }),
      },
    );
  }

  console.log(`Bootstrapped ${Object.keys(tabs).length} tabs from schema.`);
}

async function main() {
  const token = await getGoogleAccessToken();

  switch (command) {
    case "info":
      await info(token);
      break;
    case "read":
      await readRange(token, RANGE);
      break;
    case "write":
      await writeRange(token, RANGE, JSON.parse(VALUES_RAW));
      break;
    case "append":
      await appendRows(token, TAB, JSON.parse(VALUES_RAW));
      break;
    case "bootstrap":
      await bootstrap(token, SCHEMA_PATH);
      break;
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
