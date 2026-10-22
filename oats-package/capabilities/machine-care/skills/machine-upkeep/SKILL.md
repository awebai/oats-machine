---
name: machine-upkeep
description: Keep the computer and its agent tooling current within clear limits. It says what may be changed without asking, what is only proposed to the person, how OATS, aw and the harnesses are upgraded, and how a configuration change is agreed, made, reviewed and undone. Use before any change to the machine, its packages, its agent tooling or its configuration files.
---

# Machine upkeep

The machine belongs to the person. You keep it in good order; you do not
decide what it becomes.

## Three kinds of change

**You may do these yourself, then report them:**

- Read-only checks (`/machine-survey`).
- Restart a stopped instance of your own deployment that is expected to run
  (`oats session start --home <abs>`), when its record says why it stopped
  and the cause is gone.

**You propose these, and do them only after the person's yes:**

- Upgrading OATS, aw, a harness or a plugin (below).
- Freeing disk space: list the exact paths and their sizes, and say what each
  one is. Delete only the paths the person said yes to.
- Changing a configuration file: shell, window manager, terminal, editor,
  keybindings, services.
- Anything that changes how the person works: new keys, new defaults,
  removed features.

**Only the person does these** (`/ask-the-person`):

- Anything with sudo: system packages, system services, `omarchy update`
  (it asks for a password).
- Logins, tokens, keys, payments, and anything sent outside the machine.

## Upgrading the agent tooling

An upgrade moves every agent on the machine, so it always goes through the
tool's own upgrade path, never a bare `npm install -g`:

- **OATS** (the Desktop, the CLI, the bridges, each deployment's check): the
  steward carries it out with `/oats-upgrade` from `oats.setup`. That skill
  reads the steps from the latest release, shows the whole plan, and takes
  each step on the person's yes. A technician doesn't upgrade OATS.
- **aw:** `aw upgrade`. If it fails, report the exact error; never retry with
  sudo or a different install method.
- **A harness or a plugin:** use the way it was installed. On Omarchy, the
  harnesses are installed with mise, so check with `mise ls` before
  proposing anything.

Afterwards, check each deployment again (`/machine-survey`, section 4) and
report what changed.

## How a configuration change lands

1. **Agree it first.** Write down what the person asked for, in their words,
   and what you will change to get it. If the change takes something away (a
   key that stops working in another program, a default that disappears), say
   so. Nothing is changed, and no technician is spawned, before the person's
   yes to that plan.
2. **Have a technician make it** (`/route-a-request`). It keeps a dated copy
   of every file it touches, next to the original.
3. **Have it reviewed** before it counts as done: someone who didn't write it
   reads the change against the agreed plan. On Omarchy, reload and check
   (`hyprctl reload`, `hyprctl configerrors`).
4. **Tell the person** what changed, how to try it, and how to undo it, with
   the path of each copy.
5. **Record it** in STATE.md: the change, why, and where the copies are, so a
   later instance knows it was intended. The copies stay until the person says
   they can go.

A change the person did not ask for is not made, however good it looks.
Propose it instead.
