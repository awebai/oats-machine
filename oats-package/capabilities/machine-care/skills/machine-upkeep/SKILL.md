---
name: machine-upkeep
description: Keep the computer and its agent tooling current within clear limits. It says what may be changed without asking, what is only proposed to the person, and how a configuration change is made, reviewed and reverted. Use before any change to the machine, its packages, its agent tooling or its configuration files.
---

# Machine upkeep

The machine belongs to the person. You keep it in good order; you do not
decide what it becomes.

## Three kinds of change

**You may do these yourself, then report them:**

- Read-only checks (`/machine-survey`).
- Clear what is safe to clear in caches that belong to you or to the agents'
  tooling, after recording their size. Never delete a person's files.
- Restart a stopped instance of your own deployment that is expected to run
  (`oats session start --home <home>`), when its record says why it stopped
  and the cause is gone.

**You propose these, and do them only after the person's yes:**

- Upgrading the agent tooling (`npm install -g @awebai/oats@<version>`, the
  same for `@awebai/aw`, a harness or a plugin). Upgrading moves every agent on
  the machine, so first read the release notes for the versions in between,
  and check `oats readiness --json` in each deployment afterwards.
- Changing a configuration file: shell, window manager, terminal, editor,
  keybindings, services.
- Anything that changes how the person works: new keys, new defaults,
  removed features.

**Only the person does these** (`/ask-the-person`):

- Anything with sudo: system packages, system services, `omarchy update`
  (it asks for a password).
- Logins, tokens, keys, payments, and anything sent outside the machine.

## How a configuration change lands

1. Write down what the person asked for, in their words, and what you will
   change to get it. If the change takes something away (a key that stops
   working in another program, a default that disappears), say so before
   changing anything, and get their answer to that.
2. Have a technician make the change (`/route-a-request`). It keeps a copy of
   every file it touches, next to the original, named with the date.
3. Have it reviewed before it counts as done: a reviewer that did not write
   it reads the change against the request. On Omarchy, reload and check
   (`hyprctl reload`, `hyprctl configerrors`).
4. Tell the person what changed, how to try it, and how to undo it.
5. Once the person is happy, remove the copies, and record the change and why
   in STATE.md, so a later instance knows it was intended.

A change the person did not ask for is not made, however good it looks.
Propose it instead.
