# Knowledge Base Testing Workflow

## Overview
This guide outlines the steps to test the website when adding new posts to the knowledge base, including Jekyll local testing.

## Testing Workflow for Knowledge Base Posts

### 1. Add New Post
- Create a new markdown file in `knowledge-base/_posts/` 
- Follow naming convention: `YYYY-MM-DD-post-title.md`
- Include proper front matter with `title`, `date`, `categories`, etc.

### 2. Local Jekyll Testing
Since Jekyll is configured with `_config.yml` and `Gemfile`:

```bash
# Install Jekyll dependencies (first time only)
bundle install

# Start Jekyll development server
bundle exec jekyll serve

# Or serve with live reload
bundle exec jekyll serve --livereload
```

This will:
- Build the site locally at `http://localhost:4000`
- Watch for changes and auto-rebuild
- Allow testing the knowledge base at `http://localhost:4000/knowledge-base/`

### 3. Test Navigation
- Verify the knowledge base is **hidden** from main navigation (commented out)
- Test direct access via URL: `http://localhost:4000/knowledge-base/`
- Check that new posts appear in the knowledge base index
- Test individual post pages

### 4. Deploy When Ready
```bash
# Commit your new post
git add .
git commit -m "Add new knowledge base post: [title]"
git push
```

### 5. Re-enable Navigation (when ready for public)
Uncomment line 29 in `index.html`:
```html
<li><a href="knowledge-base/">Knowledge Base</a></li>
```

## Notes
- Jekyll setup uses existing styling from `assets/css/kb-styles.css`
- Posts will look consistent with main site brand
- Knowledge base remains accessible via direct URL during testing phase
