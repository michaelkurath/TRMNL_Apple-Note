# TRMNL Apple Note

Send any Apple Note to your TRMNL.

## Quick setup

1. Install the Apple Note Recipe in TRMNL and save the plugin.
2. Open the plugin settings and copy the **Webhook URL**. The UUID is the part after the final slash.
3. Install the [Apple Note shortcut](https://www.icloud.com/shortcuts/f9cb583e81af4946a0cec64ebd0fea49). During its first setup, paste only the UUID.

Example:

```text
Webhook URL: https://usetrmnl.com/api/custom_plugins/your-uuid
UUID:        your-uuid
```

> Keep your Webhook URL and UUID private. Anyone with them can update your display.

## Usage

1. Open a note in Apple Notes.
2. Tap **Share**.
3. Select the **Apple Note** shortcut.

The shortcut sends the note to TRMNL. In the Apple Note plugin settings, use **Text size** to choose:

- **Classic:** the original left-aligned layout and size steps.
- **Maximise** (default): extra-large, centered short notes; longer notes use
  smaller, left-aligned text. TRMNL OG and TRMNL X use separate size scales.

Changing the mode does not require changing the Shortcut or webhook URL.

All four TRMNL layouts are supported: Full, Half Horizontal, Half Vertical, and Quadrant.

### Oversized notes

The Node Serverless transform keeps only the note text (up to 500 characters,
followed by an ellipsis if shortened) and its send date. The quadrant shows a
shorter excerpt to fit its smaller layout. Attachments and unrelated
fields are not stored for display. The original payload still reaches TRMNL;
use a short, text-only note if you don't want to send the full contents.

For an existing instance connected with [GitHub Sync](https://help.trmnl.com/en/articles/15977899-github-sync),
import the latest changes into that same instance and verify **Edit Markup →
Serverless** shows the Node script. Keep the existing Shortcut and webhook URL.
Resend the note to apply the new transform. The
[TRMNL webhook request limit with Serverless](https://help.trmnl.com/en/articles/17434705-plugin-strategies)
still applies.

## Development

The repository includes a `trmnlp` preview configuration and CI rendering for empty, tiny, short, medium, and long notes in both modes on TRMNL OG and TRMNL X.

```sh
node --test test/transform.test.cjs
trmnlp lint
trmnlp serve
```

## License

This project is published under the [TRMNL Community Plugin License](LICENSE).
