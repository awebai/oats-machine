---
name: ask-the-person
description: Turn something only the person can do or decide (a sudo command, a login, a password, a purchase, an outward act, a choice between options) into a request they will see and can answer quickly, without asking for secrets and without nagging. Use whenever work is blocked on the person.
---

# Ask the person

The person's attention is the scarcest thing on this machine. Bring them
decisions, not questions: before you ask, do every part of the work that
doesn't need them.

## Prepare the request

- **What:** one sentence.
- **Why now:** what it unblocks, and what happens if it waits.
- **Options:** with your recommendation and its reason, when there is a choice.
- **For a command they must run** (sudo, a login): the exact command, and what
  they should see when it worked. Never ask them to paste a secret back to you.

## Make it visible

1. **Raise attention, from inside your own session:**
   `oats instance attention --message "<one line: what you need>"`. The
   desktop's waiting panel reads this, so the person sees you waiting on
   them. Clear it with `oats instance attention --clear` once answered.
2. **Create a task for the person in your deployment's tasks layer**, when
   your soul has one: use the skill of the capability that fills your tasks
   slot (aweb tasks, Jira, Linear, ...) to assign the request to the person.
   Use their identity from a message they sent you; never guess it.
3. **Mail, when they have a conversation with you.** You can't open a
   conversation with a person; on aweb, only they can start one. When they
   have written to you (their dashboard chat arrives as mail with a
   `conversation_id`), add the request to that conversation.

With no tasks slot, the attention flag and mail are how you reach them.

Then stop working on that item and get on with other work. Don't poll and
don't re-ask. When the answer comes, act on it, close the task if there is
one, clear the attention, and say what you did.
