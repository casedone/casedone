---
layout: default
title: Home
---

<ul class="kb-post-list">
  {% for post in site.posts %}
    <li class="kb-post-item" data-categories="{% for category in post.categories %}{% unless category == 'Knowledge-Base' or category == 'knowledge-base' %}{{ category | strip | slugify }} {% endunless %}{% endfor %}">
      <h2>
        <a href="{{ post.url | relative_url }}">
          {{ post.title }}
        </a>
      </h2>
      <p class="kb-post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      {% if post.categories and post.categories.size > 0 %}
        <div class="kb-post-categories">
          {% for category in post.categories %}
            {% unless category == 'Knowledge-Base' or category == 'knowledge-base' %}
              <span class="kb-category-tag">{{ category | strip }}</span>
            {% endunless %}
          {% endfor %}
        </div>
      {% endif %}
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
