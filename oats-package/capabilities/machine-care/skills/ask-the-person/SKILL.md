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

1. **Raise attention on yourself:**
   `oats instance attention --message "<one line: what you need>"`, run from
   your own home. The desktop's waiting panel then shows you as waiting on the
   person. Clear it with `oats instance attention --clear` once answered.
2. **Record the request where they answer it:** create a task assigned to the
   person on your team (`aw task create --title "<what>" --assignee <their alias>
   --description-file <file>`). Use the alias from a message they sent you;
   never guess it. Don't mail them first: agents cannot start a conversation
   with a person. Their answer arrives as mail or as a task comment.

Then stop working on that item and get on with other work. Don't poll and
don't re-ask. When the answer comes, act on it, close the task, clear the
attention, and say what you did.
