# kpisek.com

Pisek Kultavewuti's personal site: long-form writing on AI systems, plus a small
advisory and training practice kept deliberately in its own band. Static Jekyll,
built by GitHub Pages, no plugins and no build workflow.

There is no newsletter, no Substack and no RSS feed. LinkedIn is the only channel
for updates, so every "follow" link points at the profile set in `_config.yml`.

## Structure

```
_config.yml              identity, urls, permalink, timezone, excludes
_layouts/default.html    html shell: head + header + <main> + footer
_layouts/post.html       article: title block, hero, prose, prev/next
_includes/head.html      meta, canonical, Open Graph, fonts, stylesheet
_includes/header.html    site nav (marks the current section from page.nav)
_includes/footer.html    footer: LinkedIn and GitHub only
_includes/follow.html    the LinkedIn follow band (links, no form, no embed)
_includes/post-lead.html cover story (the `featured: true` post, else newest)
_includes/post-list.html card grid; `limit=` to cap, `skip=` to omit a url
_includes/post-feed.html lead + "More writing" run (home page composition)
index.html               home: cover, writing, photo essay, practice band, about
writing/index.html       the full archive, one loop over site.posts
work/index.html          advisory, training, selected work, LinkedIn CTA
_archive/courses/        RETIRED courses page, kept for reference, not built
404.html                 not-found page
_posts/                  the articles (one markdown file each)
assets/css/base.css      design tokens + shared components
assets/css/site.css      D3 composition (cover, cards, essay, prose)
assets/img/              covers/, posts/ (in-article), work/, og/ (1200x630 JPEGs
                         for link previews — LinkedIn does not render WebP), portrait.webp
sitemap.xml              generated from site.pages and site.posts
robots.txt               allow all + sitemap pointer
```

`_archive/` holds pages taken off the site that may still be useful later. Jekyll
ignores underscore-prefixed directories, so nothing in there is built or reachable;
`_config.yml` lists it under `exclude` to make that explicit. Each archived page
carries a comment at the top recording how to bring it back.

## Publishing a post

1. Add `_posts/YYYY-MM-DD-slug.md`.
2. Front matter: `title`, `date` (with `+0700`), `categories`, `excerpt_override`
   and `featured_image`. Optional: `dek`, `tag`, `read_time`, `featured: true`.
3. Put the article's images in `assets/img/posts/<slug>/` as `.webp` (1200px wide
   is plenty) and reference them as
   `{{ '/assets/img/posts/<slug>/<name>.webp' | relative_url }}`.
4. Cover art goes to `assets/img/covers/<slug>.webp` and is what
   `featured_image:` points at.
5. Close with the one-line footer every post uses:
   `> *Following along*: I post these on [LinkedIn](https://www.linkedin.com/in/kpisek) — that's where the conversation happens now.`

The home page, the writing index and the prev/next links all read `site.posts` —
there is no list to update by hand anywhere.

## Local preview

The host Ruby is too old for the gem set, so build in the pinned container:

```bash
docker run --rm -e JEKYLL_NO_BUNDLER_REQUIRE=true -v "$PWD":/site -w /site \
  jekyll-3.10 /usr/local/bundle/bin/jekyll build

mkdir -p /tmp/serve && cp -R _site /tmp/serve/casedone
cd /tmp/serve && python3 -m http.server 8791
# http://127.0.0.1:8791/casedone/
```

(`jekyll-3.10` is a one-time `docker commit` of the Pages Jekyll version — see the
`site-audit-revamp` skill's Jekyll reference if the image is missing.)

## Deploying

GitHub Pages legacy build from `main`, no Actions workflow, no gems beyond Jekyll.
`baseurl: "/casedone"` exists only so the project-page preview resolves; with the
custom domain live, set `baseurl: ""` and add the `CNAME` file. Nothing else changes,
because every internal path goes through `relative_url`.
