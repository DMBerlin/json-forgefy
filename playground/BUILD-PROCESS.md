# Playground Build Process

This document explains how the playground build process works and how to maintain it.

## Overview

The playground has a two-step build process:

1. **API Reference Generation** - Parses `GUIDE.md` to extract operator documentation
2. **Browser Bundle** - Bundles `json-forgefy` library for browser use

## Build Commands

```bash
# Full build (recommended)
pnpm run build

# Individual builds
pnpm run build:api      # Generate API reference only
pnpm run build:browser  # Generate browser bundle only

# Development
pnpm run dev           # Build + serve
pnpm run serve         # Serve only (no build)

# Port configuration
# Edit playground/env file:
PORT=8001
```

## API Reference Generation

### Purpose
Keeps playground documentation in sync with project documentation by auto-generating operator data from `GUIDE.md`.

### Input
- `../GUIDE.md` - Single source of truth for operator documentation

### Output
- `api-reference-data.js` - Structured operator data for playground

### Process

The parser (`build-api-reference.js`) extracts:

1. **Operator Name** - From `### $operatorName` headers
2. **Description** - From `**Description**: ...` lines
3. **Category** - From `**Category**: ...` lines (Math, String, etc.)
4. **Parameters** - From `**Parameters**: ...` sections
5. **Returns** - From `**Returns**: ...` lines
6. **Example** - From first code block after `**Example**:`
7. **Notes** - From `**Notes**: ...` lines (optional)

### Output Format

```javascript
const forgefyOperators = [
  {
    op: "$add",
    desc: "Adds multiple numbers together and returns their sum.",
    category: "Math",
    usage: "Adds multiple numbers together and returns their sum.",
    params: "value: Array of numbers to add together",
    returns: "number - The sum of all numbers",
    example: "{ $add: [10, 20, 30] } → 60",
    notes: ""
  },
  // ... more operators
];
```

### When to Rebuild

Rebuild the API reference when you:
- Add new operators to `GUIDE.md`
- Change operator descriptions, examples, or parameters
- Update operator categories or return types
- Fix documentation errors

### Integration

The generated data is used by:
- **Autocomplete** - Shows operators while typing in projection textarea
- **API Reference Sidebar** - Searchable operator documentation
- **Examples** - Pre-filled code snippets

## Browser Bundle Generation

### Purpose
Creates a browser-compatible bundle of `json-forgefy` that exposes the library to `window.Forgefy`.

### Input
- `json-forgefy` npm package (from `node_modules`)

### Output
- `forgefy-browser.js` - IIFE bundle for browser use

### Process

1. Creates temporary entry point (`forgefy-entry.js`):
   ```javascript
   import Forgefy from 'json-forgefy';
   
   if (typeof window !== 'undefined') {
     window.Forgefy = Forgefy;
   }
   
   export { Forgefy };
   ```

2. Bundles with esbuild:
   - Format: IIFE (Immediately Invoked Function Expression)
   - Platform: browser
   - Target: es2015
   - Minify: false (for debugging)

3. Cleans up temporary files

### When to Rebuild

Rebuild the browser bundle when you:
- Update `json-forgefy` version in `package.json`
- Change the library's export format
- Fix browser compatibility issues

## Serve Script

### Purpose
Custom serve script (`serve.js`) that reads port configuration from `env` file.

### Features
- Reads PORT from `env` file
- Falls back to `process.env.PORT`
- Defaults to 8000 if neither is set
- Proper error handling and cleanup
- Ctrl+C support

### Configuration
Edit `playground/env`:
```bash
PORT=8001
```

## File Structure

```
playground/
├── build-api-reference.js    # Parses GUIDE.md
├── build-browser.js           # Bundles json-forgefy
├── serve.js                   # Port-aware server
├── env                        # Environment configuration
├── api-reference-data.js      # Generated (committed)
├── forgefy-browser.js         # Generated (committed)
├── app.js                     # Uses generated data
├── index.html                 # Loads generated files
└── package.json               # Build scripts
```

## Maintenance

### Updating GUIDE.md

1. Edit `GUIDE.md` in project root
2. Follow the established format:
   ```markdown
   ### $operatorName
   
   **Description**: One-line description.
   
   **Category**: CategoryName
   
   **Parameters**:
   - `param1`: Description
   - `param2`: Description
   
   **Returns**: `type` - Description
   
   **Example**:
   ```typescript
   // Example code
   { $operator: [args] }
   // Result: value
   ```
   
   **Notes**: Optional notes.
   ```

3. Run `pnpm run build:api` in playground directory
4. Verify changes in playground
5. Commit both `GUIDE.md` and `api-reference-data.js`

### Adding New Operators

1. Implement operator in library
2. Document in `GUIDE.md` following format above
3. Run `pnpm run build:api`
4. Test in playground
5. Commit changes

### Debugging

If API reference doesn't appear:

1. Check browser console for errors
2. Verify `api-reference-data.js` exists and loads
3. Check `forgefyOperators` is defined in console
4. Rebuild: `pnpm run build:api`

If browser bundle fails:

1. Check `forgefy-browser.js` exists
2. Verify `window.Forgefy` is defined in console
3. Check for esbuild errors in build output
4. Rebuild: `pnpm run build:browser`

## Best Practices

1. **Always update GUIDE.md first** - It's the single source of truth
2. **Run full build** - Use `pnpm run build` to ensure consistency
3. **Test in playground** - Verify changes work in browser
4. **Commit generated files** - Both `.js` files should be committed
5. **Keep examples simple** - Focus on clarity in GUIDE.md examples

## CI/CD Integration

For automated builds:

```yaml
- name: Build playground
  run: |
    cd playground
    pnpm install
    pnpm run build
    
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./playground
```

## Troubleshooting

### "API reference data not loaded"

**Cause**: `api-reference-data.js` not loaded or not built

**Solution**:
```bash
cd playground
pnpm run build:api
```

### "Forgefy library not loaded"

**Cause**: `forgefy-browser.js` not loaded or export issue

**Solution**:
```bash
cd playground
pnpm run build:browser
```

### Parser fails on GUIDE.md

**Cause**: Format doesn't match expected structure

**Solution**:
1. Check `### $operatorName` headers are correct
2. Verify `**Label**:` format is exact
3. Ensure code blocks use triple backticks
4. Run parser with debug output

### Operators missing from autocomplete

**Cause**: Parser didn't extract all operators

**Solution**:
1. Check GUIDE.md format for affected operators
2. Run `node build-api-reference.js` and check console
3. Verify operator count matches expected (78 operators)

---

Last Updated: October 2025
Version: 4.0.0

