import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO = resolve(fileURLToPath(new URL("..", import.meta.url)));

function runValidator(cwd = REPO) {
  return spawnSync(process.execPath, [join(cwd, "scripts", "validate-package.mjs")], { cwd, encoding: "utf8" });
}

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "oats-machine-validator-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  cpSync(REPO, dir, {
    recursive: true,
    filter: (src) => src !== `${REPO}/.git` && !src.startsWith(`${REPO}/.git/`) && !src.startsWith(`${REPO}/node_modules`),
  });
  return dir;
}

function mutate(t, relativePath, fn) {
  const dir = fixture(t);
  const path = join(dir, relativePath);
  writeFileSync(path, fn(readFileSync(path, "utf8")));
  return runValidator(dir);
}

const CARE = "oats-package/capabilities/machine-care";

test("validator accepts the real package", () => {
  const result = runValidator();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 capabilities, 4 skills, 2 package soul/);
});

test("validator rejects another package id", (t) => {
  const result = mutate(t, "oats-package/oats-package.json", (text) => text.replace('"oats.machine"', '"oats.other"'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /must be oats\.machine/);
});

test("validator rejects a payload version that differs from package.json", (t) => {
  const { version } = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  const result = mutate(t, "package.json", (text) => text.replace(`"version": "${version}"`, '"version": "9.9.9"'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /must equal package\.json version 9\.9\.9/);
});

test("validator rejects an inject that does not name one of its skills", (t) => {
  const result = mutate(t, `${CARE}/injects/machine-care.md`, (text) => text.replaceAll("`/ask-the-person`", "ask-the-person"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /inject must name its skill \/ask-the-person/);
});

test("validator rejects a reference to a skill the package does not ship", (t) => {
  const result = mutate(t, `${CARE}/skills/machine-upkeep/SKILL.md`, (text) => `${text}\nSee \`/no-such-skill\`.\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /skill reference \/no-such-skill names no package skill/);
});

test("validator rejects a soul whose from: here names no package capability", (t) => {
  const result = mutate(t, "oats-package/souls/technician/soul.yaml", (text) => text.replace("oats.machine-care:", "oats.machine-other:"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /from: here names unknown package capability oats\.machine-other/);
});

test("validator rejects a capability manifest that breaks the schema", (t) => {
  const result = mutate(t, `${CARE}/oats.json`, (text) => text.replace('"oats.machine-care"', '"Machine Care"'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /machine-care\/oats\.json\/capability/);
});
