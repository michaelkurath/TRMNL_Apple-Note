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

The shortcut sends the note to TRMNL. Text size automatically adjusts to the amount of content:

- very short messages use a centered, giant-text treatment;
- short notes remain centered and scale to the available view;
- longer notes use progressively smaller, left-aligned text;
- TRMNL OG and TRMNL X use separate size scales.

All four TRMNL layouts are supported: Full, Half Horizontal, Half Vertical, and Quadrant.

## Development

The repository includes a `trmnlp` preview configuration and CI rendering for empty, tiny, short, medium, and long notes on TRMNL OG and TRMNL X.

```sh
trmnlp lint
trmnlp serve
```

## License

This project is published under the [TRMNL Community Plugin License](LICENSE).
