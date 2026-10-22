# oats.machine

**A steward for each of your computers: the agent you meet when you sit down
at the machine, which keeps it in good order, routes every request to whoever
should handle it, and brings you only what needs you.**

`oats.machine` is an [OATS](https://github.com/awebai/oats) package. It gives
a machine's own workspace two souls and the skills they share:

| Soul | Lifetime | What it does |
|---|---|---|
| `oats.machine/steward` | long-running, one per machine | The machine's front door. It knows the state of the machine and its agents, keeps the machine and its agent tooling current within clear limits, routes each request (yours, the desktop's, other agents') to itself, a technician or a project team's coordinator, and turns anything needing you into a task you see in one place. |
| `oats.machine/technician` | one problem, then retires | Takes one machine problem from the steward (a crash to explain, or a configuration change the person agreed to), works with a copy of everything it touches, has the change reviewed, reports back and retires. |

Both souls get the `oats.machine-care` capability:

- **machine-survey:** take stock of the system, load, disk, failed services,
  crashes, pending updates, the deployments and instances on the machine, and
  the agent tooling versions.
- **machine-upkeep:** what may change without asking, what is only proposed,
  and how a configuration change is made, reviewed and undone.
- **route-a-request:** who handles what, how to brief a technician, and how
  to follow a request to its end.
- **ask-the-person:** turning a sudo command, a login or a decision into a
  prepared request that shows up in the person's waiting panel and on the aweb
  dashboard's Tasks page.

The souls never run sudo, never handle secrets, and never act outside the
machine without the person's yes to that exact act.

## Where it fits

Each machine gets its own OATS workspace and team. The steward is its first
agent; the technician and the knowledge harvester (from `oats.okf`) join it.
Each project keeps its own workspace and team elsewhere on the machine, and
the steward routes to those teams' coordinators instead of working in them.

The steward is generic: it works on any Linux or macOS machine. Platform
specifics come from other capabilities. On [Omarchy](https://omarchy.org), a
desktop integration is planned in
[oats-omarchy](https://github.com/awebai/oats-omarchy): the agent key would
open the steward, and crash notifications would go to it. It doesn't ship
yet. Today oats-omarchy's bar panel already shows the agents waiting on you,
the steward included.

The steward also holds `oats.setup` from `oats.framework`: it administers the
machine's own workspace, and upgrades OATS through that capability's upgrade
procedure.

## Use it

Until it is in the official catalog, pin it by its Git tag:

```bash
oats package add oats.machine git:github.com/awebai/oats-machine@v0.1.0
oats sync
oats spawn oats.machine/steward --name steward
```

Give the workspace `oats.okf` as its knowledge default: what the steward and
its technicians learn about the machine is harvested into the machine's
knowledge base.

## Develop it

```bash
npm test
```

runs `scripts/validate-package.mjs` (the manifests against the vendored OATS
schemas in `schemas/`, skill names and references, soul declarations) and the
tests in `test/`.

Changes come as pull requests, and a maintainer merges each one after an
independent review and green CI. MIT licensed.
