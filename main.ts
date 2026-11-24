// One Letter: Coffee or Tea — entry program.
//
// Writes exactly one letter to $MAKEFUN_OUTPUT_DIR/entry.txt:
//   "A"  — coffee
// No trailing newline, no other bytes. Deterministic: the same
// single byte is written on every run, whatever the environment.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const ENTRY_FILE = join(OUTPUT_DIR, "entry.txt");

// The entry: A for coffee.
const ENTRY = "A";

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(ENTRY_FILE, ENTRY, "utf8");

// Verify the gate contract before finishing: exactly one byte,
// UTF-8, and not whitespace. Fail loudly rather than shipping
// an entry the gate would refuse.
const written = readFileSync(ENTRY_FILE);
if (written.length !== 1 || written[0] !== ENTRY.charCodeAt(0)) {
  throw new Error(
    `entry.txt must be exactly one byte "A", got ${written.length} byte(s)`,
  );
}
console.log(`Wrote entry to ${ENTRY_FILE} (${written.length} byte)`);
