# 🔧 JSON Forgefy Playground

> **Transform JSON data with powerful MongoDB-style operators**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://dmberlin.github.io/json-forgefy/)
[![npm version](https://img.shields.io/npm/v/json-forgefy)](https://www.npmjs.com/package/json-forgefy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 🌟 Features

- **🎨 Material Oceanic Theme** - Professional dark theme by default with Dreamweaver Light mode option
- **⚡ Real-time Transformation** - Instant JSON transformation with MongoDB-style operators
- **💡 Smart Examples** - Product-focused examples to get you started
- **✨ Auto-formatting** - Beautify JSON with one click
- **📋 Copy to Clipboard** - Easy result copying
- **⌨️ Keyboard Shortcuts** - Efficient workflow with shortcuts
- **🎯 Syntax Highlighting** - Color-coded JSON for better readability
- **📱 Responsive Design** - Works on all devices
- **📖 Interactive API Reference** - Searchable operator documentation with autocomplete

## 🚀 Quick Start

Visit the live playground: **[https://dmberlin.github.io/json-forgefy/](https://dmberlin.github.io/json-forgefy/)**

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Transform JSON
- `Ctrl/Cmd + K` - Open API Reference
- `Tab` in projection - Trigger autocomplete

## 💻 Local Development

```bash
# Install dependencies
pnpm install

# Build everything (API reference + browser bundle)
pnpm run build

# Build API reference only (from GUIDE.md)
pnpm run build:api

# Build browser bundle only
pnpm run build:browser

# Start development server
pnpm run serve

# Or build and serve
pnpm run dev
```

Then open http://localhost:8001 in your browser (or the port specified in `env` file).

## ⚙️ Configuration

### Port Configuration

The playground server port can be configured in the `env` file:

```bash
# playground/env
PORT=8001
```

Default port is 8000 if not specified. The serve script will:
1. Read PORT from `env` file
2. Fall back to `process.env.PORT` 
3. Default to 8000 if neither is set

## 🏗️ Build Process

### API Reference Generation

The playground's API reference is auto-generated from `GUIDE.md`:

```bash
pnpm run build:api
```

**How it works:**
1. Parses `../GUIDE.md` to extract operator documentation
2. Extracts operator names, descriptions, categories, parameters, examples
3. Generates `api-reference-data.js` with structured data
4. Powers autocomplete and API reference sidebar

**When to rebuild:**
- After updating `GUIDE.md` in the project root
- After adding new operators
- After changing operator descriptions or examples

### Browser Bundle

Creates a browser-compatible library bundle:

```bash
pnpm run build:browser
```

**How it works:**
1. Creates temporary entry point importing `json-forgefy`
2. Bundles with esbuild into IIFE format
3. Exposes `window.Forgefy` for browser use
4. Cleans up temporary files

## 🏗️ Project Structure

```
playground/
├── build-api-reference.js    # GUIDE.md parser
├── build-browser.js           # Browser bundle builder
├── api-reference-data.js      # Generated operator data
├── forgefy-browser.js         # Generated browser bundle
├── app.js                     # Application logic
├── styles.css                 # Theming and styles
├── index.html                 # Main interface
├── favicon.svg                # Favicon
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🎯 Example Transformation

**Input Payload:**
```json
{
  "user": {
    "firstName": "Sarah",
    "lastName": "Johnson",
    "email": "sarah.johnson@company.com"
  }
}
```

**Projection Blueprint:**
```json
{
  "fullName": {
    "$concat": ["$user.firstName", " ", "$user.lastName"]
  },
  "email": {
    "$toLower": "$user.email"
  }
}
```

**Result:**
```json
{
  "fullName": "Sarah Johnson",
  "email": "sarah.johnson@company.com"
}
```

## 🔧 Available Operators (77 total)

The playground uses json-forgefy 4.0.0 with 77 MongoDB-style operators across 8 categories:

### Mathematical (15)
`$add`, `$subtract`, `$multiply`, `$divide`, `$abs`, `$ceil`, `$floor`, `$max`, `$min`, `$mod`, `$pow`, `$sqrt`, `$round`, `$toFixed`, `$trunc`

### String Operations (15)
`$concat`, `$toUpper`, `$toLower`, `$substr`, `$slice`, `$split`, `$trim`, `$ltrim`, `$rtrim`, `$replace`, `$replaceOne`, `$replaceAll`, `$regexReplace`, `$size`, `$indexOf`

### Comparison (9)
`$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`, `$regex`

### Logical (4)
`$and`, `$or`, `$not`, `$none`

### Conditional (6)
`$cond`, `$switch`, `$ifNull`, `$coalesce`, `$some`, `$every`

### Array (8)
`$filter`, `$map`, `$reduce`, `$sum`, `$avg`, `$arrayAt`, `$arrayFirst`, `$arrayLast`

### Type Operations (12)
`$type`, `$toString`, `$toNumber`, `$toDate`, `$exists`, `$isNull`, `$isNumber`, `$isNaN`, `$isString`, `$isBoolean`, `$isArray`, `$isDate`

### Date Operations (8)
`$addDays`, `$dateDiff`, `$dateShift`, `$dayOfMonth`, `$dayOfWeek`, `$dayOfYear`, `$isWeekend`, `$isHoliday`

[Complete documentation with examples →](https://github.com/DMBerlin/json-forgefy/blob/main/GUIDE.md)

## 📝 Updating Documentation

The playground documentation is kept in sync with `GUIDE.md`:

1. **Update GUIDE.md** in the project root with new operators or changes
2. **Run build:api** in the playground directory:
   ```bash
   cd playground && pnpm run build:api
   ```
3. **Commit changes** including the updated `api-reference-data.js`

**Important:** Always use `GUIDE.md` as the single source of truth for operator documentation.

## 🎨 Theme

The playground uses a beautiful **Material Oceanic theme** by default (dark), with an optional **Dreamweaver Light** mode. Your preference is saved automatically. The editor uses **Menlo** font for optimal code readability.

## 🤝 Contributing

Found a bug or have a feature request? 

1. Check the [issues page](https://github.com/DMBerlin/json-forgefy/issues)
2. Create a new issue if needed
3. Or submit a pull request!

## 📄 License

ISC License - see [LICENSE](https://github.com/DMBerlin/json-forgefy/blob/main/LICENSE)

## 🙏 Credits

- **Library**: [json-forgefy](https://github.com/DMBerlin/json-forgefy)
- **Theme**: Material Oceanic (dark) and Dreamweaver Light
- **Built by**: [Daniel Marinho](https://github.com/DMBerlin)

---

**Made with ❤️ for the developer community**

[⭐ Star on GitHub](https://github.com/DMBerlin/json-forgefy) | [📦 View on NPM](https://www.npmjs.com/package/json-forgefy) | [🐛 Report Bug](https://github.com/DMBerlin/json-forgefy/issues)
