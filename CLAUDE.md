# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static Jekyll 3.9 personal site for kpisek.com (writing + advisory practice). No plugins, no JS build, no
Node, no Python, no test suite. Deployed by **Cloudflare Pages** from `main` (`bundle exec jekyll build` →
`_site`); every other branch gets a preview at `<branch>.<project>.pages.dev`. GitHub Pages is disabled —
ignore any stray comment that says it builds the site. The repo name `casedone` is historical; the domain is
`kpisek.com`.

`README.md` is the source of truth for structure, publishing steps and deploy settings — keep it in sync when
any of those change.

## Commands

The host Ruby is too old for the gem set; always build in a container pinned to `.ruby-version` (3.4):

```bash
# build (this is the only "test": a clean build with no Liquid errors)
docker run --rm -v "$PWD":/site -w /site ruby:3.4 \
  bash -lc 'bundle install && bundle exec jekyll build'

# preview (static server; does NOT rebuild — re-run the build, then refresh)
cd _site && python3 -m http.server 8791   # http://127.0.0.1:8791/
```

`Gemfile.lock` is committed on purpose so Cloudflare installs the exact tested Jekyll. The extra gems in
`Gemfile` (`csv`, `logger`, `base64`, …) exist only for Ruby 3.4 compatibility with Jekyll 3.9 — don't drop them.

## Architecture

Everything is driven by `site.posts`; there is no hand-maintained list of articles anywhere.

- **Layouts:** `_layouts/default.html` (head + header + `<main>` + footer) wraps everything;
  `_layouts/post.html` adds title block, hero, prose column and prev/next. `_config.yml` `defaults` gives every
  post `layout: post` and `nav: article`.
- **Post rendering pipeline (shared by three includes + the post layout):**
  - `post-lead.html` — cover story: the post with `featured: true`, else the newest.
  - `post-list.html` — card grid; params `limit=` and `skip=<url>`. Used with no limit on `writing/index.html`.
  - `post-feed.html` — home composition: lead + `post-list limit=3 skip=lead.url`. It recomputes the lead with
    the same `featured`/newest rule as `post-lead.html`; change both together or the lead will appear twice.
  - Each of these (and `post.html`) applies the same fallbacks: `dek` → `excerpt_override` → `excerpt`;
    `tag` → `categories.last`; `read_time` → `words / 180 + 1`. Keep the fallback chain identical across files.
- **Nav state:** pages set `nav: home | writing | work | article` in front matter; `_includes/header.html` uses it
  for `aria-current`. On `home`, "Writing" is an in-page `#writing` anchor.
- **SEO/social (`_includes/head.html`):** the OG/Twitter image is *derived* from `featured_image` by rewriting
  `/covers/` → `/og/` and `.webp` → `.jpg`. Every post therefore needs a matching 1200×630 JPEG at
  `assets/img/og/<slug>.jpg` (LinkedIn won't render WebP); pages without `featured_image` fall back to
  `og/portrait.jpg`.
- **`sitemap.xml`** is Liquid-generated from `site.pages` + `site.posts`; set `sitemap: false` in a page's front
  matter to exclude it.
- **URLs:** `permalink: /writing/:title/` (slug from the filename, so the filename date and the front-matter
  `date` may differ). `baseurl` is empty, but all internal paths must still go through `| relative_url`.
- **Timezone:** front-matter dates are written `+0700`; `timezone: Asia/Bangkok` in `_config.yml` keeps
  rendered dates from shifting a day in the UTC build environment.
- **CSS:** `assets/css/site.css` (`@import`s `base.css`) is the only stylesheet linked. `base.css` holds the
  design tokens (`:root` vars) and shared components; `site.css` holds the "D3 / Cover" page composition.
  Colour rule from `base.css`: `--green` (#1F5C33) for text/links; `--green-bright` (#51B316) is for fills only —
  never text (fails contrast). Dark (`--night*`) surfaces are reserved for the practice/commerce band.
- **`_archive/`** holds retired pages (e.g. courses). Underscore dirs aren't built; it's also in `exclude`.
  Each archived file has a comment at the top describing how to restore it.

## Publishing a post (checklist)

1. `_posts/YYYY-MM-DD-slug.md` with front matter: `title`, `date` (with `+0700`), `categories`,
   `excerpt_override`, `featured_image`. Optional: `dek`, `tag`, `read_time`, `featured: true`.
2. In-article images: `assets/img/posts/<slug>/*.webp` (~1200px wide), referenced as
   `{{ '/assets/img/posts/<slug>/<name>.webp' | relative_url }}`.
3. Cover: `assets/img/covers/<slug>.webp` (what `featured_image` points at) **and** the OG JPEG
   `assets/img/og/<slug>.jpg` (1200×630).
4. End with the standard footer line:
   `> *Following along*: I post these on [LinkedIn](https://www.linkedin.com/in/kpisek) — that's where the conversation happens now.`

## Site conventions

- No newsletter, no RSS, no Substack, no embeds/forms. LinkedIn (`site.linkedin_url`) is the only follow
  channel; GitHub is the only other outbound link. Don't add feed/subscribe features.
- No `CNAME` file — the custom domain is attached in the Cloudflare dashboard.
