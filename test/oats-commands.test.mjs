import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO = resolve(fileURLToPath(new URL("..", import.meta.url)));
const PAYLOAD = join(REPO, "oats-package");

// Namespaces a capability adds to `oats` inside an instance that holds it;
// the kernel's own help does not list them.
const CAPABILITY_NAMESPACES = new Set(["aweb"]);

function markdownFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return markdownFiles(path);
    return name.endsWith(".md") ? [path] : [];
  });
}

// Every `oats <verb>` written in code, inline or fenced (not tmux's `-L oats`).
function oatsVerbs(text) {
  const code = [...text.matchAll(/```[^\n]*\n([\s\S]*?)```/g), ...text.matchAll(/`([^`\n]+)`/g)].map((m) => m[1]);
  return code.flatMap((snippet) => [...snippet.matchAll(/(?:^|[\s(])(?<!-L )oats ([a-z][a-z-]*)/g)].map((m) => m[1]));
}

// The kernel the package's compatibility floor names.
const FLOOR = JSON.parse(readFileSync(join(PAYLOAD, "oats-package.json"), "utf8")).compatibility.oats.replace(/^>=/, "");
const atLeast = (version, floor) => {
  const [a, b] = [version, floor].map((v) => v.split(".").map(Number));
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] > b[i];
  return true;
};

const versionRun = spawnSync("oats", ["version", "--json"], { encoding: "utf8" });
const installed = versionRun.status === 0 ? JSON.parse(versionRun.stdout).version : null;
const skip = !installed ? `oats is not installed; install @awebai/oats@${FLOOR} to run this check`
  : !atLeast(installed, FLOOR) ? `oats ${installed} is below the package floor ${FLOOR}`
  : false;
if (skip) process.stderr.write(`oats-commands: skipped: ${skip}\n`);

const help = skip ? null : spawnSync("oats", ["--help"], { encoding: "utf8" });
const kernelVerbs = help ? new Set([...help.stdout.matchAll(/^\s+oats ([a-z][a-z-]*)/gm)].map((m) => m[1])) : null;

test("every oats command the package names exists in the kernel", { skip }, () => {
  const unknown = [];
  for (const file of markdownFiles(PAYLOAD)) {
    for (const verb of oatsVerbs(readFileSync(file, "utf8"))) {
      if (!kernelVerbs.has(verb) && !CAPABILITY_NAMESPACES.has(verb)) unknown.push(`${relative(REPO, file)}: oats ${verb}`);
    }
  }
  assert.deepEqual(unknown, []);
});
