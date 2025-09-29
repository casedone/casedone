# Jekyll Configuration Notes

## Directory Exclusion

This `instructions-for-ai/` directory is **excluded** from Jekyll processing in `_config.yml`:

```yaml
exclude:
  - instructions-for-ai/
```

## Why This Is Important

- **Problem:** Jekyll tries to process all Markdown files and execute any Liquid syntax (like `{% include %}` tags)
- **Issue:** Documentation files containing Jekyll code examples would cause build errors on GitHub Pages
- **Solution:** Excluding this directory prevents Jekyll from processing these files during build

## What This Means

- ✅ Files in this directory remain in the repository
- ✅ Documentation is accessible to developers and AI assistants
- ✅ GitHub Pages builds successfully without processing errors
- ❌ Files in this directory are NOT published to the live website
- ❌ Jekyll will not process any Liquid syntax in these files

## Adding New Documentation

Any new AI instruction files or documentation added to this directory will automatically be ignored by Jekyll. This is the recommended location for:

- AI assistant instructions
- Development documentation with Jekyll code examples
- Internal notes and architecture documentation
- Any files that shouldn't be part of the public website

## Related Configuration

The exclusion is configured in `_config.yml` alongside other excluded items like:
- `node_modules`
- `vendor/`
- `Gemfile`
- `README.md`
- `dev/` (development files)

---

**Last Updated:** September 30, 2025  
**Purpose:** Prevent Jekyll build errors while maintaining documentation access
