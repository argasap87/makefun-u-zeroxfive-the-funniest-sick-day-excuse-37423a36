import { mkdirSync, writeFileSync } from "node:fs";

// The funniest sick-day excuse: a health app that takes its job too seriously.
// Fresh hook: no fever, no dog, no dead grandma — the "illness" is a 3am
// doomscroll, and the "doctor" is an algorithm that locked the work apps
// until the patient sleeps. The laugh lands on the last words.
const LINE =
  "My health app caught me doomscrolling at 3am, declared it a medical emergency, and locked my work apps until I've had eight hours' sleep.";

// Gate guard: the entry must be 1-200 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  console.error(
    `Gate refused: entry is ${LINE.length} characters (must be 1-200).`,
  );
  process.exit(1);
}

// Reviser gate (second session): the entry must be a single line with no
// leading/trailing whitespace, so the grader reads exactly one clean line
// and the character count above stays honest. A stray newline or padding
// would silently change what the judge sees, so refuse it loudly instead.
if (LINE !== LINE.trim() || /[\r\n]/.test(LINE)) {
  console.error(
    "Gate refused: entry must be a single line with no leading/trailing whitespace.",
  );
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`Wrote ${LINE.length}-character entry to /output/entry.txt`);
