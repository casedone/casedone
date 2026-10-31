# kpisek.com

Pisek Kultavewuti's personal site: long-form writing on AI systems, plus the Case
Done practice (advisory, training, courses) kept deliberately in its own band.
Static Jekyll, built by GitHub Pages, no plugins and no build workflow.

## Structure

```
_config.yml              identity, urls, permalink, timezone, excludes
_layouts/default.html    html shell: head + header + <main> + footer
_layouts/post.html       article: title block, hero, prose, prev/next
_includes/head.html      meta, canonical, Open Graph, fonts, stylesheet
_includes/header.html    site nav (marks the current section from page.nav)
_includes/footer.html    footer: links, RSS
_includes/subscribe.html Substack embed + fallback link
_includes/post-lead.html cover story (the `featured: true` post, else newest)
_includes/post-list.html card grid; `limit=` to cap, `skip=` to omit a url
_includes/post-feed.html lead + "More writing" run (home page composition)
index.html               home: cover, writing, photo essay, practice band, about
writing/index.html       the full archive, one loop over site.posts
work/index.html          advisory, training, courses CTA, selected work
courses/index.html       course catalogue
404.html                 not-found page
_posts/                  the articles (one markdown file each)
assets/css/base.css      design tokens + shared components
assets/css/site.css      D3 composition (cover, cards, essay, prose)
assets/img/              covers/, posts/ (in-article), work/, portrait.webp
feed.xml, sitemap.xml    generated from _posts and site.pages
robots.txt               allow all + sitemap pointer
```

## Publishing a post

1. Add `_posts/YYYY-MM-DD-slug.md`.
2. Front matter: `title`, `date` (with `+0700`), `categories`, `excerpt_override`
   and `featured_image`. Optional: `dek`, `tag`, `read_time`, `featured: true`.
3. Put the article's images in `assets/img/posts/<slug>/` as `.webp` (1200px wide
   is plenty) and reference them as
   `{{ '/assets/img/posts/<slug>/<name>.webp' | relative_url }}`.
4. Cover art goes to `assets/img/covers/<slug>.webp` and is what
   `featured_image:` points at.

The home page, the writing index, prev/next links and the feed all read
`site.posts` — there is no list to update by hand anywhere.

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
