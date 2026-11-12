function noteExcerpt(text) {
  let excerpt = "";
  let length = 0;
  for (const character of text) {
    if (length === 500) return excerpt.trimEnd() + "…";
    excerpt += character;
    length++;
  }
  return excerpt;
}

function run(input) {
  // TRMNL normally supplies merge variables at the top level. Also accept
  // the POST envelope when testing a raw webhook body in the editor.
  const payload = input?.merge_variables ?? input;
  const note = typeof payload?.Note === "string" ? payload.Note.trim() : "";
  const date = typeof payload?.DateSent === "string"
    ? payload.DateSent.replace(/\s+/gu, " ").trim().slice(0, 32)
    : "";

  // Keep the existing Shortcut keys. Never pass through attachments, metadata,
  // or unrelated keys. Even with JSON escaping, this stays below 5 KB.
  return { Note: noteExcerpt(note), DateSent: date };
}
