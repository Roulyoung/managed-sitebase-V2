import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const readGit = (command) => execSync(command, { cwd: rootDir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

console.log(`[preflight] root: ${rootDir}`);
console.log(`[preflight] CURRENT PROJECT: managed-sitebase-V2`);

if (!fs.existsSync(path.join(rootDir, "PROJECT_CONTEXT.md"))) {
  console.error("[preflight] PROJECT_CONTEXT.md is missing");
  process.exit(1);
}

console.log(`[preflight] branch: ${readGit("git rev-parse --abbrev-ref HEAD")}`);
const status = (() => { try { return readGit("git status --short"); } catch { return ""; } })();
if (status) {
  console.warn("[preflight] working tree is dirty");
  console.warn(status);
}

console.log("\n[preflight] ok");
