---
name: machine-survey
description: Take stock of the computer you run on and of the OATS agents on it (system, load, disk, failed services, crashes, pending updates, deployments, instances, tooling versions), and record the result. Use at the start of a session, on a schedule, before an upgrade, and whenever the person asks how the machine is doing.
---

# Machine survey

Build the picture from the machine itself. Each fact gets the command that
produced it. A check you could not run is reported as *not checked, because
...*, never as fine.

## 1. What machine this is

- `uname -srm` and the distribution: `cat /etc/os-release` on Linux,
  `sw_vers` on macOS.
- Omarchy: `command -v omarchy`, then `omarchy version` when present. On an
  Omarchy machine, also use the `omarchy` skill if your harness has it.
- `hostname`, and `uptime`.

## 2. Is it healthy

- **Load and memory:** `uptime`, and `free -h` (Linux) or `vm_stat` (macOS).
  Compare the load averages with the core count (`nproc`, or
  `sysctl -n hw.ncpu`).
- **Disk:** `df -h` for the home and root filesystems. Over 85% used is worth
  reporting; over 95% is urgent. To see what grows, run `du -sh` on the
  deployment directories and on `~/.cache`, never on the whole home.
- **Failed services (Linux):** `systemctl --user --failed` and
  `systemctl --failed`.
- **Crashes (Linux):** `coredumpctl list --since -7d --no-pager`. Hand any
  crash worth investigating to a technician (`/route-a-request`).

## 3. Are updates waiting

Only look; never install from here (see `/machine-upkeep`).

- **Arch and Omarchy:** `checkupdates` when installed (it needs no root);
  otherwise say the pending-package check was not run.
- **macOS:** `softwareupdate -l` and `brew outdated`.
- **Agent tooling:** `oats version --json`, `aw version`, and each harness's
  own version command (`claude --version`, `codex --version`, `pi --version`).
  Compare them with the latest published versions: `npm view @awebai/oats version`
  and `npm view @awebai/aw version`.

## 4. The agents on this machine

- `oats deployments` lists every deployment the machine knows.
- In each deployment: `oats status --json` (instances, running or stopped, and
  who is waiting on the person) and `oats readiness --json` (what would stop a
  spawn or a launch).
- The OATS tmux server: `tmux -L oats ls`.

Report an instance that is stopped but expected to run, one that is waiting
on the person, or a readiness failure. Don't fix another deployment's
instances yourself; tell that deployment's coordinator (`/route-a-request`).

## 5. Record it

Write a dated **Machine** section in your STATE.md: one line per area, with the
finding and the command behind it, and a short list of what needs action and
by whom. On the next survey, compare against it and report what changed. Only
mail the person when something needs them (`/ask-the-person`).
