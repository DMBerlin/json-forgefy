# Changelog

All notable changes to the JSON Forgefy Playground will be documented in this file.

## [3.0.0] - 2025-10-11

### 🚀 Major Update - json-forgefy 3.2.0

#### Added
- **Updated to json-forgefy 3.2.0** - Latest version with new operators and improvements
- **New Operators Support**:
  - `$round` - Round numbers to specified precision
  - `$none` - Check if all conditions are false
  - `$every` - Check if all conditions are true
  - `$some` - Check if any condition is true
  - `$coalesce` - Return first non-null value
  - `$default` - Provide default value for null/undefined
  - `$regexReplace` - Advanced regex-based string replacement with flags support
  - `$replace` - Replace multiple values in strings
  - `$dateDiff` - Calculate difference between dates
  - `$isNumber` - Validate if value is a number
  - `$isNaN` - Check if value is NaN
  - `$isNull` - Check if value is null/undefined
  - `$exists` - Check if field exists
  - `$regex` - Pattern matching with regex
- **Enhanced Autocomplete** - Added all new operators with examples and descriptions
- **Version Display** - Discrete version tag in playground footer

#### Changed
- **Operator List**: Updated autocomplete with 50+ operators from json-forgefy 3.2.0
- **Documentation**: Updated README with complete operator reference
- **Examples**: Enhanced examples to showcase new operators

#### Improved
- **Type Safety**: Better type conversion operators
- **String Operations**: Advanced regex and replacement capabilities
- **Validation**: More validation operators for data integrity
- **Conditional Logic**: Enhanced conditional operators for complex scenarios

---

## [2.0.0] - 2025-10-10

### 🎨 Major UI Overhaul

#### Added
- **Material Oceanic Theme by Default** - Professional dark theme inspired by Material Design
- **Dreamweaver Light Theme** - Classic light theme option
- **Menlo Font** - Professional monospace font for better code readability
- **IDE-like Experience** - VSCode-inspired editor with syntax highlighting
- **Product-Focused Examples** - Real-world business use cases
- **Copy to Clipboard** - One-click result copying
- **Success Notifications** - Toast messages for user feedback
- **Welcome Message** - Onboarding for new users
- **Keyboard Shortcuts Display** - Visible in footer
- **Syntax Highlighting** - Color-coded JSON output
- **Professional Layout** - Full-height responsive design
- **Smooth Transitions** - Polished animations throughout

#### Changed
- **Default Theme**: Changed from light to dark (Material Oceanic)
- **File Structure**: Moved app files to `src/` folder, scripts to `src/scripts/`
- **Layout**: Full-screen IDE-like layout
- **Colors**: Professional Material Oceanic color scheme
- **Font**: Changed to Menlo for better readability
- **Typography**: Better font choices and sizing
- **Buttons**: More prominent and accessible
- **Error Messages**: Better formatting and visibility

#### Improved
- **User Experience**: More intuitive and professional
- **Accessibility**: Better ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and transitions
- **Mobile Support**: Better responsive design
- **Code Readability**: Syntax highlighting for JSON

### 🏗️ Technical Improvements

#### Added
- **GitHub Actions Workflow** - Automated deployment to GitHub Pages
- **Structured Source** - Organized `src/` folder for application files
- **Better Documentation** - Comprehensive README and guides
- **Deployment Guide** - Step-by-step deployment instructions

#### Changed
- **Build Process**: Streamlined browser library generation
- **Dependencies**: Updated to latest versions
- **File Organization**: Cleaner project structure

### 📚 Documentation

#### Added
- `DEPLOYMENT.md` - Deployment guide
- `STRUCTURE_EXPLAINED.md` - Project structure documentation
- `CHANGELOG.md` - This file
- Enhanced `README.md` with badges and better formatting

### 🐛 Bug Fixes
- Fixed favicon 404 error
- Fixed duplicate playground folder issue
- Fixed theme persistence
- Fixed mobile layout issues

---

## [1.0.0] - 2025-10-09

### Initial Release

#### Features
- Basic JSON transformation playground
- Light theme
- Example data
- Transform, Clear, and Load Example buttons
- Basic styling
- GitHub Pages deployment

---

## Future Plans

### Planned Features
- [ ] Monaco Editor integration for advanced editing
- [ ] Share transformation via URL
- [ ] Save/load transformations
- [ ] More example templates
- [ ] Export results as file
- [ ] Transformation history
- [ ] Performance metrics
- [ ] Dark/Light/Auto theme modes
- [ ] Custom theme builder
- [ ] Collaborative editing
- [ ] API endpoint for transformations

### Under Consideration
- [ ] Multiple language support
- [ ] Video tutorials
- [ ] Interactive documentation
- [ ] Transformation marketplace
- [ ] VS Code extension
- [ ] CLI tool integration

---

**Note**: This project follows [Semantic Versioning](https://semver.org/).
