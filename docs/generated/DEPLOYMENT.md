# 🚀 Deployment Guide

## Overview

This playground is automatically deployed to GitHub Pages from the `playground` branch.

## Deployment Flow

```
Push to playground branch
        ↓
GitHub Actions triggered (.github/workflows/deploy.yml)
        ↓
Install dependencies (pnpm install)
        ↓
Build browser library (pnpm run build)
        ↓
Upload to GitHub Pages
        ↓
Deploy to https://dmberlin.github.io/json-forgefy/
```

## GitHub Pages Configuration

### Required Settings

1. Go to: `https://github.com/DMBerlin/json-forgefy/settings/pages`
2. Configure:
   - **Source**: GitHub Actions
   - **Branch**: playground (automatically handled by workflow)
   - **Folder**: / (root)

### Workflow Permissions

Ensure the workflow has proper permissions:

1. Go to: `Settings > Actions > General`
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

## Manual Deployment

If you need to deploy manually:

```bash
# Ensure you're on playground branch
git checkout playground

# Install dependencies
pnpm install

# Build browser library
pnpm run build

# Commit changes
git add .
git commit -m "chore: update playground"

# Push to trigger deployment
git push origin playground
```

## Updating json-forgefy Version

When a new version of json-forgefy is published:

```bash
# Switch to playground branch
git checkout playground

# Update to latest version
pnpm add json-forgefy@latest

# Rebuild browser library
pnpm run build

# Test locally
pnpm run serve

# Commit and deploy
git add package.json pnpm-lock.yaml forgefy-browser.js
git commit -m "chore: update to json-forgefy vX.X.X"
git push
```

## Monitoring Deployment

### Check Deployment Status

1. Go to: `https://github.com/DMBerlin/json-forgefy/actions`
2. Look for "Deploy Playground to GitHub Pages" workflow
3. Click on the latest run to see details

### Deployment Time

- **Build time**: ~1-2 minutes
- **Propagation time**: ~2-3 minutes
- **Total time**: ~3-5 minutes from push to live

## Troubleshooting

### Deployment Failed

1. Check GitHub Actions logs
2. Verify workflow file syntax
3. Ensure all dependencies are in package.json
4. Check for build errors

### Changes Not Appearing

1. Wait 2-3 minutes for propagation
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache
4. Check if deployment completed successfully

### Build Errors

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Rebuild
pnpm run build

# Test locally
pnpm run serve
```

## Project Structure

```
playground branch/
├── src/                    # Application source files
│   ├── scripts/           # Build scripts
│   │   └── build-browser.js  # Browser library builder
│   ├── app.js             # Main application logic
│   └── styles.css         # Dracula theme styles
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
├── index.html             # Main HTML file
├── forgefy-browser.js     # Generated browser library
├── favicon.svg            # Favicon
├── package.json           # Dependencies
├── .gitignore            # Git ignore rules
└── README.md             # Documentation
```

## Environment Variables

No environment variables are required for deployment.

## Custom Domain (Optional)

To use a custom domain:

1. Create a `CNAME` file in the root:
   ```
   playground.yourdomaincom
   ```

2. Configure DNS:
   - Add CNAME record pointing to `dmberlin.github.io`

3. Update GitHub Pages settings with custom domain

## Security

- No sensitive data in repository
- All dependencies from npm registry
- HTTPS enforced by GitHub Pages
- No API keys or secrets required

## Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Total Bundle Size**: ~150KB

## Monitoring

### Analytics (Optional)

To add Google Analytics:

1. Add tracking code to `index.html`
2. Update privacy policy if needed

### Error Tracking (Optional)

To add Sentry or similar:

1. Add SDK to `index.html`
2. Configure in `src/app.js`

## Rollback

To rollback to a previous version:

```bash
# Find the commit hash
git log --oneline

# Reset to that commit
git reset --hard <commit-hash>

# Force push
git push --force origin playground
```

## Best Practices

1. **Test locally** before pushing
2. **Use semantic versioning** in commit messages
3. **Keep dependencies updated** regularly
4. **Monitor deployment** after each push
5. **Document changes** in commit messages

## Support

- **Issues**: https://github.com/DMBerlin/json-forgefy/issues
- **Discussions**: https://github.com/DMBerlin/json-forgefy/discussions
- **Email**: Check GitHub profile

---

**Last Updated**: 2025-10-10
