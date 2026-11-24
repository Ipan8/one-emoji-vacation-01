// One Emoji, One Dream Vacation — make.fun entry
// The entry is a single emoji: a sunrise over the sea.
// Why this one: the island is the cliche every other entry will send.
// A sunrise is the moment you actually dream about — golden light
// spilling over water, the first morning of a trip, the feeling that
// makes a stranger reach for their phone and book the flight.
// One glyph, no words: the whole vacation is in the light.
import * as fs from "node:fs";

const EMOJI = "🌅";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", EMOJI + "\n");
console.log("entry written:", EMOJI);
