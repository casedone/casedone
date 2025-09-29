# Navigation Architecture Documentation

## Overview

This document outlines the navigation system architecture implemented for the Case Done website. The system uses Jekyll includes for HTML structure and CSS imports for styling to ensure consistency across all pages.

## Architecture Components

### 1. Jekyll Include Files

#### `_includes/navigation.html`
- **Purpose:** Single source of truth for navigation HTML structure
- **Contains:** Header, navigation links, mobile navigation HTML
- **Features:**
  - Responsive navigation with hamburger menu
  - Active state detection for current page
  - Consistent logo and menu structure
  - Mobile-friendly overlay navigation

#### `_includes/navigation-script.html`
- **Purpose:** Shared JavaScript functionality for navigation
- **Contains:** Mobile navigation toggle logic, event handlers
- **Features:**
  - Hamburger menu toggle
  - Mobile navigation open/close functions
  - Overlay click handling
  - Body scroll lock during mobile navigation

### 2. CSS Architecture

#### `assets/css/nav-styles.css`
- **Purpose:** Single source of truth for all navigation styles
- **Contains:** 
  - Navigation CSS variables (`--nav-primary-color`, `--nav-bg-color`, etc.)
  - Header and navigation layout styles
  - Hamburger menu animations
  - Mobile navigation styles
  - Responsive breakpoints for navigation
  - Focus states and accessibility features

#### `assets/css/styles.css`
- **Purpose:** Main stylesheet that imports navigation styles
- **Import Statement:** `@import url('nav-styles.css');`
- **Contains:** General site styles (typography, buttons, sections, etc.)
- **Navigation Dependency:** Automatically loads navigation styles via CSS import

## Implementation Pattern

### For All Pages

1. **HTML Structure:**
   ```html
   <!-- Add Jekyll front matter -->
   ---
   layout: null
   ---
   
   <!-- Include navigation in body -->
   {% include navigation.html %}
   
   <!-- Include navigation script before closing body -->
   {% include navigation-script.html %}
   ```

2. **CSS References:**
   ```html
   <!-- Only reference main stylesheet -->
   <link rel="stylesheet" href="assets/css/styles.css">
   <!-- Navigation styles automatically loaded via @import -->
   ```

### Page-Specific Stylesheets

- **Course Pages:** `styles.css` + `course-styles.css`
- **Project Pages:** `styles.css` + `project-styles.css`
- **Knowledge Base:** `styles.css` + `kb-styles.css`
- **Main Site:** `styles.css` only

## File Structure

```
casedone-website/
├── _includes/
│   ├── navigation.html          # Navigation HTML structure
│   └── navigation-script.html   # Navigation JavaScript
├── assets/css/
│   ├── nav-styles.css          # Navigation styles (source of truth)
│   ├── styles.css              # Main styles (@import nav-styles.css)
│   ├── course-styles.css       # Course-specific styles
│   ├── project-styles.css      # Project-specific styles
│   └── kb-styles.css           # Knowledge base styles
├── index.html                  # Main site page
├── courses/
│   └── prompt-mastery.html     # Course pages
├── projects/
│   ├── generative-ai-workshop.html
│   ├── in-house-trainings.html
│   └── coming-soon.html
└── knowledge-base/
    └── _layouts/
        └── default.html        # Knowledge base layout
```

## Benefits

### 1. Single Source of Truth
- **HTML:** All navigation structure defined in `_includes/navigation.html`
- **CSS:** All navigation styles defined in `assets/css/nav-styles.css`
- **JavaScript:** All navigation behavior defined in `_includes/navigation-script.html`

### 2. Automatic Propagation
- Changes to navigation automatically appear on all pages
- No manual synchronization required
- Consistent behavior across entire site

### 3. Clean Separation of Concerns
- Navigation logic isolated from page content
- CSS architecture prevents duplication
- Modular system allows independent updates

### 4. Easy Maintenance
- Update navigation: Edit include files only
- Update navigation styles: Edit `nav-styles.css` only
- Add new pages: Include navigation components

## Navigation Menu Structure

Current navigation menu items:
- **Courses** → `#courses` (main site section)
- **Previous Work** → `#previous-work` (main site section)
- **Knowledge Base** → `/knowledge-base/` (separate section)
- **About Us** → `#about` (main site section)

### Active State Logic
- Knowledge Base pages automatically get `active` class on Knowledge Base link
- Uses Jekyll conditional: `{% if page.layout == 'default' and page.url contains 'knowledge-base' %}`

## Responsive Behavior

### Desktop (>768px)
- Full navigation menu visible
- Hover effects on navigation links
- Fixed header with backdrop blur

### Mobile (≤768px)
- Hamburger menu button
- Slide-in navigation from right
- Semi-transparent overlay
- Body scroll lock when navigation open

### Small Mobile (≤480px)
- Adjusted navigation width
- Optimized touch targets

## CSS Variables Reference

### Navigation-Specific Variables (in nav-styles.css)
```css
--nav-primary-color: #51B316;    /* Primary green */
--nav-secondary-color: #2B463C;  /* Dark green */
--nav-text-color: #2B463C;      /* Text color */
--nav-bg-color: rgba(255, 255, 255, 0.95); /* Background */
--nav-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Shadow */
--nav-transition: all 0.3s ease; /* Transitions */
--nav-height: 70px;              /* Header height */
```

## Future Enhancements

### Potential Improvements
1. **Breadcrumb Navigation:** Add breadcrumb component for deep pages
2. **Search Integration:** Add search functionality to navigation
3. **Multi-level Menus:** Support dropdown menus for complex navigation
4. **Analytics Integration:** Track navigation usage patterns

### Adding New Pages
1. Add Jekyll front matter to enable includes
2. Include navigation components
3. Reference appropriate stylesheets
4. Navigation will automatically work

## Troubleshooting

### Common Issues

1. **Navigation not appearing:**
   - Check Jekyll front matter is present
   - Verify include statements are correct
   - Ensure Jekyll is processing the file

2. **Styles not loading:**
   - Verify `@import url('nav-styles.css');` in styles.css
   - Check CSS file paths are correct
   - Ensure nav-styles.css exists and is accessible

3. **Mobile navigation not working:**
   - Verify `navigation-script.html` is included
   - Check JavaScript console for errors
   - Ensure CSS classes match JavaScript selectors

## Maintenance Checklist

### When Adding New Navigation Items
- [ ] Update `_includes/navigation.html`
- [ ] Update mobile navigation in same file
- [ ] Test on all page types
- [ ] Verify responsive behavior

### When Updating Navigation Styles
- [ ] Edit `assets/css/nav-styles.css` only
- [ ] Test across all browsers
- [ ] Verify mobile responsiveness
- [ ] Check accessibility (focus states, contrast)

---

**Last Updated:** September 29, 2025  
**Architecture Version:** 2.0  
**Maintainer:** Case Done Development Team
