# Project Structure Explained

## Current Setup (Playground Branch)

You're currently on the **playground branch**, which is deployed to GitHub Pages.

### What You're Using ✅

```
json-forgefy/ (root directory on playground branch)
├── node_modules/          # Dependencies (json-forgefy from npm)
├── package.json           # Playground package config
├── pnpm-lock.yaml         # Lock file
├── index.html             # Playground UI
├── app.js                 # Playground logic
├── styles.css             # Playground styles
├── build-browser.js       # Build script
├── forgefy-browser.js     # Generated browser library
├── favicon.svg            # Favicon
└── README.md              # Playground docs
```

**This is the ONLY structure you need on the playground branch!**

### What Was Removed ❌

The duplicate `playground/` folder has been removed. It was leftover from the initial setup.

## Branch Structure

### Main Branch (Library Development)
```
json-forgefy/
├── src/                   # TypeScript source
├── dist/                  # Compiled library
├── tests/                 # Test files
├── scripts/               # Build scripts
├── playground/            # Playground folder (excluded from npm)
│   ├── package.json
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── build-browser.js
├── package.json           # Library package
└── .npmignore            # Excludes playground from npm
```

### Playground Branch (GitHub Pages)
```
json-forgefy/
├── node_modules/          # Just json-forgefy from npm
├── package.json           # Playground package
├── index.html             # Playground UI
├── app.js                 # Playground logic
├── styles.css             # Playground styles
├── build-browser.js       # Build script
├── forgefy-browser.js     # Generated browser library
├── favicon.svg            # Favicon
└── README.md              # Playground docs
```

## Why Two Branches?

### Main Branch
- **Purpose**: Library development and npm publishing
- **Contains**: Full source code, tests, build tools
- **Publishes to**: npm registry
- **Excludes**: Playground folder from npm package

### Playground Branch
- **Purpose**: Interactive demo for users
- **Contains**: Only playground files
- **Publishes to**: GitHub Pages
- **Depends on**: json-forgefy from npm

## File Purposes

### package.json
- **Main branch**: Library configuration
- **Playground branch**: Playground configuration (depends on json-forgefy)

### node_modules/
- **Main branch**: All dev dependencies + json-forgefy dependencies
- **Playground branch**: Just json-forgefy + http-server

### build-browser.js
- **Main branch**: In `scripts/` folder, builds from `dist/`
- **Playground branch**: In root, builds from `node_modules/json-forgefy`

## No Duplication!

After cleanup, there's **no duplication**:
- Main branch has playground in `playground/` folder
- Playground branch has playground in root directory
- They're completely separate branches

## Workflow

### Developing Library (Main Branch)
```bash
git checkout main
pnpm install
pnpm build
pnpm test
pnpm publish
```

### Updating Playground (Playground Branch)
```bash
git checkout playground
pnpm install:latest        # Get latest json-forgefy
pnpm run build             # Build browser version
pnpm run serve             # Test locally
git commit && git push     # Deploy to GitHub Pages
```

## Summary

✅ **One set of files per branch**
✅ **No duplication**
✅ **Clear separation of concerns**
✅ **Clean npm package (no playground)**
✅ **Easy to maintain**

The structure is now clean and efficient!
