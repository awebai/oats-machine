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

Do both:

1. **Raise attention, from inside your own session:**
   `oats instance attention --message "<one line: what you need>"`. The
   desktop's waiting panel reads this, so the person sees you waiting on
   them. Clear it with `oats instance attention --clear` once answered.
2. **Record it as an aweb task assigned to the person**, on your team:
   `aw task create --title "<what>" --assignee <their alias> --description-file <file>`.
   They see it on the aweb dashboard's Tasks page, and answer by mail or a
   task comment.
   - Use the alias from a message they sent you; never guess it.
   - The oats.aweb inject says `aw task` isn't part of that integration. That
     is about the messaging provider. This skill uses aweb tasks deliberately,
     because the OATS tasks slot has no aweb provider today.

## Talking to the person by mail

You can't open a conversation with a person; on aweb, only they can start
one. When they have written to you (their dashboard chat arrives as mail with
a `conversation_id`), reply on that conversation. Otherwise the attention
flag and the task are how you reach them.

Then stop working on that item and get on with other work. Don't poll and
don't re-ask. When the answer comes, act on it, close the task, clear the
attention, and say what you did.
