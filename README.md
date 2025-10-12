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

## 🚀 Quick Start

Visit the live playground: **[https://dmberlin.github.io/json-forgefy/](https://dmberlin.github.io/json-forgefy/)**

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Transform JSON
- `Ctrl/Cmd + Shift + F` - Beautify all JSON
- `Ctrl/Cmd + Shift + C` - Copy result to clipboard

## 📦 Installation

Want to use json-forgefy in your project?

```bash
npm install json-forgefy
# or
pnpm add json-forgefy
# or
yarn add json-forgefy
```

## 💻 Local Development

```bash
# Install dependencies
pnpm install

# Build browser library
pnpm run build

# Start development server
pnpm run serve

# Or do both at once
pnpm run dev
```

Then open http://localhost:8000 in your browser.

## 🏗️ Project Structure

```
json-forgefy-playground/
├── src/
│   ├── scripts/
│   │   └── build-browser.js  # Browser library builder
│   ├── app.js                # Application logic
│   └── styles.css            # Dracula theme styles
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment
├── index.html                # Main HTML file
├── forgefy-browser.js        # Generated browser library
├── favicon.svg               # Favicon
├── package.json              # Dependencies
└── README.md                 # This file
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

## 🔧 Available Operators (json-forgefy 3.2.0)

The playground uses the full json-forgefy 3.2.0 library with 47 MongoDB-style operators:

### Mathematical
`$add`, `$subtract`, `$multiply`, `$divide`, `$abs`, `$ceil`, `$floor`, `$max`, `$min`, `$round`, `$toFixed`

### String Operations
`$concat`, `$substr`, `$slice`, `$toLower`, `$toUpper`, `$toString`, `$split`, `$size`, `$trim`, `$replace`, `$regexReplace`, `$regex`

### Comparison
`$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`

### Logical
`$and`, `$or`, `$not`, `$none`

### Conditional
`$cond`, `$switch`, `$ifNull`, `$coalesce`, `$every`, `$some`

### Array
`$in`, `$nin`

### Type Conversion
`$toNumber`, `$toString`

### Validation
`$exists`, `$isNull`, `$isNumber`, `$isNaN`

### Date Operations
`$dateDiff`

[See complete documentation with examples →](https://github.com/DMBerlin/json-forgefy#readme)

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
