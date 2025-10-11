# JSON Forgefy Playground

Interactive playground for testing and experimenting with json-forgefy.

## Development

```bash
# Install latest version of json-forgefy
pnpm install:latest

# Build the browser library
pnpm run build

# Start local development server
pnpm run serve
```

Then open http://localhost:8000 in your browser.

## Deployment

This playground is automatically deployed to GitHub Pages when pushing to the `playground` branch.

## Updating json-forgefy Version

To test a new version of json-forgefy:

1. Update the version in package.json or run `pnpm install:latest`
2. Run `pnpm run build` to rebuild the browser library
3. Test locally with `pnpm run serve`
4. Commit and push to the `playground` branch to deploy

## Structure

- `index.html` - Main playground interface
- `app.js` - Playground application logic
- `styles.css` - Playground styles
- `forgefy-browser.js` - Browser-compatible json-forgefy library (generated)
