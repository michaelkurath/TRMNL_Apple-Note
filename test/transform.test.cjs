const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const { runInNewContext } = require("node:vm");

const source = readFileSync(join(__dirname, "../src/transform.js"), "utf8");
const run = runInNewContext(source + "\nrun");
const result = (input) => ({ ...run(input) });

test("preserves existing Shortcut keys, multiline text, and the send date", () => {
  assert.deepEqual(result({ Note: "Dinner at 7\nBring bread", DateSent: "12 Nov 2026" }), {
    Note: "Dinner at 7\nBring bread",
    DateSent: "12 Nov 2026",
  });
});

test("trims an oversized webhook body and drops non-display fields", () => {
  const input = { merge_variables: {
    Note: "A".repeat(134027), DateSent: "12 Nov 2026", attachment: "ignored",
  }, trmnl: { unrelated: true } };
  assert.deepEqual(result(input), { Note: "A".repeat(500) + "…", DateSent: "12 Nov 2026" });
});

test("does not truncate at exactly 500 Unicode code points", () => {
  const note = "🙂".repeat(500);
  assert.equal(result({ Note: note }).Note, note);
  assert.equal(result({ Note: note + "a" }).Note, note + "…");
});

test("keeps the serialized output below the base limit even with JSON escaping", () => {
  const data = result({ Note: "\u0001".repeat(600), DateSent: "x".repeat(10000) });
  assert.equal(data.DateSent.length, 32);
  assert.ok(Buffer.byteLength(JSON.stringify(data), "utf8") < 5000);
});

test("renders an empty state for absent, blank, or non-text notes", () => {
  for (const input of [null, {}, { Note: " \n " }, { Note: { content: "not text" } }]) {
    assert.deepEqual(result(input), { Note: "", DateSent: "" });
  }
});
