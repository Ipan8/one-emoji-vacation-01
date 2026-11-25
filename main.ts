// One Emoji, One Dream Vacation — make.fun entry.
//
// The whole entry is one glyph: a sunrise over the sea.
// I picked the sunrise on purpose, and skipped the island.
// The island is the postcard everyone reaches for first, so it
// says nothing new. A sunrise is different: it is a moment in
// time, not a place on a map. It is the first morning of the
// trip, still quiet, the sky turning gold over open water
// before anyone else is awake. That light is the feeling that
// makes a stranger stop scrolling and book the flight —
// not a beach, not a palm tree, just the promise that the
// day ahead could look like this. One glyph, no words,
// because the light already says the whole dream.
//
// This script only does two honest jobs: it checks the pick
// really is exactly one emoji, then it writes that emoji
// (plus a trailing newline) to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const OUT_PATH = "/output/entry.txt";

// The dream, in a single glyph: sunrise over the sea.
function pickDreamEmoji(): string {
  return "🌅";
}

// A valid entry has exactly one visible glyph and nothing else:
// no words, no spaces, no second emoji sneaking in beside it.
function isSingleGlyph(value: string): boolean {
  if (value.length === 0) return false;
  if (value.trim() !== value) return false;
  return [...value].length === 1;
}

// The sunrise wins over the island for one more reason: it is
// the start of something. An island is a postcard you have
// already seen; a sunrise is a day you have not lived yet.
// That is what a dream vacation sells — a morning to look
// forward to, not a place to tick off a list.

// Short notes on the choice, printed for the human running this.
// Kept as data, not as part of the entry — the entry stays one glyph.
function whyThisOne(): string[] {
  return [
    "sunrise over water, not the island cliche",
    "the first morning of the trip, sky turning gold",
    "the light that makes a stranger book the flight",
  ];
}

async function writeEntry(): Promise<string> {
  const emoji = pickDreamEmoji();
  if (!isSingleGlyph(emoji)) {
    throw new Error("entry must be exactly one emoji glyph");
  }
  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, emoji + "\n", "utf8");
  return emoji;
}

// A tiny sanity check after the write: the file on disk must
// hold exactly the emoji plus one newline, nothing more.
function looksRightOnDisk(text: string, emoji: string): boolean {
  return text === emoji + "\n";
}

async function main(): Promise<void> {
  const emoji = await writeEntry();
  const { readFile } = await import("node:fs/promises");
  const saved = await readFile(OUT_PATH, "utf8");
  if (!looksRightOnDisk(saved, emoji)) {
    throw new Error("entry file does not match the chosen emoji");
  }
  for (const reason of whyThisOne()) {
    console.log("-", reason);
  }
  console.log("wrote entry to", OUT_PATH + ":", emoji);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
