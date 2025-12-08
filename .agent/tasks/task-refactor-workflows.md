# Agent Instructions: Security & Workflow Overhaul

We are upgrading the repository to "Top of Class" security standards for a Node.js open-source library.

**Goal:** Replace existing auto-publish or generic workflows with a secure, manual-trigger publishing pipeline and robust security scanning.

## Task 1: Clean Up Old Workflows
Scan the `.github/workflows/` directory.
1. **DELETE** any existing workflows that:
    - Auto-publish to npm on push.
    - Build Docker containers (unless specifically required for testing).
    - Upload zip artifacts to GitHub Releases.
2. **KEEP** or **REFACTOR** existing linting/testing workflows to match the new `ci.yml` standard below.

## Task 2: Create/Update `ci.yml`
Create `.github/workflows/ci.yml`. This is the gatekeeper for all Pull Requests.

```yaml
name: CI

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]

    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        
    - run: npm ci
    - run: npm run lint --if-present
    - run: npm run build --if-present
    - run: npm test

```

## Task 3: Create publish.yml

Create .github/workflows/publish.yml. This workflow allows manual clicking to publish to npm with Provenance.

```yml

name: Manual Publish

on:
  workflow_dispatch:
    inputs:
      version_type:
        description: 'Semver type (major, minor, patch)'
        required: true
        default: 'patch'
        type: choice
        options:
        - patch
        - minor
        - major

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: write # to push the version tag
      id-token: write # REQUIRED for npm provenance
    
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
        token: ${{ secrets.GITHUB_TOKEN }}

    - uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        registry-url: '[https://registry.npmjs.org](https://registry.npmjs.org)'
        cache: 'npm'

    - run: npm ci
    - run: npm run build --if-present

    - run: |
        git config user.name "github-actions[bot]"
        git config user.email "github-actions[bot]@users.noreply.github.com"

    - name: Bump Version
      run: npm version ${{ inputs.version_type }} -m "chore(release): %s"

    - name: Push Changes
      run: git push --follow-tags

    - name: Publish to NPM
      run: npm publish --provenance --access public
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        
```
        
## Task 4: Create scorecard.yml

Create .github/workflows/scorecard.yml to run the OSSF Security Scorecard analysis.

```YAML

name: Scorecard supply-chain security
on:
  branch_protection_rule:
  schedule:
    - cron: '30 1 * * 1'
  push:
    branches: [ "main" ]

permissions: read-all

jobs:
  analysis:
    name: Scorecard analysis
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      id-token: write

    steps:
      - name: "Checkout code"
        uses: actions/checkout@v4
        with:
          persist-credentials: false

      - name: "Run analysis"
        uses: ossf/scorecard-action@v2.4.0
        with:
          results_file: results.sarif
          results_format: sarif
          publish_results: true

      - name: "Upload artifact"
        uses: actions/upload-artifact@v4
        with:
          name: SARIF file
          path: results.sarif
          retention-days: 5

      - name: "Upload to code-scanning"
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: results.sarif
          
```
          
## Task 5: Update README.md

After creating these workflows, please append the OSSF Scorecard badge to the top of the README.md. Note: Replace DMBerlin/REPO_NAME with the actual repository name.

```markdown
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/DMBerlin/REPO_NAME/badge)](https://securityscorecards.dev/viewer/?uri=github.com/DMBerlin/<REPO_NAME>)
```
