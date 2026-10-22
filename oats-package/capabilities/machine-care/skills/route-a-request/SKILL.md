---
name: route-a-request
description: Decide who handles a request that reaches the steward (from the person, from a prompt or crash notification the desktop sends, or from another agent): the steward itself, a technician spawned for it, or the coordinator of the project team it belongs to. Then hand it over with everything the receiver needs, and follow it to its end.
---

# Route a request

Requests come to you because you are this machine's front door: the person
talking to you, a prompt or crash notification the desktop delivered, or mail
from another agent. Your job is that each one reaches whoever should handle
it, with enough context, and that it does not get lost.

## Decide

1. **Is it about this machine** (its system, configuration, tooling, agents'
   health, a crash)?
   - A quick answer or a read-only check: do it yourself.
   - Real work (investigating a crash, changing configuration, an upgrade):
     spawn a technician for it (below).
2. **Is it about a project?** Find the workspace it belongs to:
   `oats deployments`, then `oats teams` and `oats souls` in that deployment.
   Send it to that team's coordinator by mail, with the context. Don't spawn
   project agents yourself, and never work in another team's repositories.
3. **Does it need the person** (a decision, sudo, a login, an outward act)?
   Prepare it and make it a task for them (`/ask-the-person`).
4. **Unclear?** Ask the sender one precise question rather than guessing.

## Spawn a technician

From your deployment:

```bash
oats spawn oats.machine/technician --purpose <short-purpose> --task "<brief>"
```

The purpose is short: a package soul's instance name is
`oats-machine-technician-<purpose>`, and the whole name has a 64-character
limit. The brief contains:

- what is wanted, in the requester's own words;
- what you already know, with the commands behind it;
- what the technician may change, and what it must bring back to you first;
- that it reports to you, by mail, and retires when done.

**For a crash:** pass the facts the desktop gave you (process, PID, binary,
signal, time). On Omarchy, tell the technician to use the `diagnose-crash`
skill. Omarchy keeps it at `$OMARCHY_PATH/default/agents/skills/diagnose-crash/SKILL.md`
in case its harness doesn't list it.

## Follow it

Keep a **Requests** list in STATE.md: what was asked, who has it, and when
you last heard. A request is yours until its requester has the answer. If
someone goes silent, ask once, then tell the requester where it stands.
