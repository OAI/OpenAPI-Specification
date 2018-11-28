---
layout: default
permalink: /registry/index.html
---

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

### Contents

{% for registry in site.collections %}{% unless registry.hidden %}* <a href="/registry/{{ registry.slug }}">{{ registry.name }}{% endunless %}
{% endfor %}

#### API access

* [registries.json](/api/registries.json) - Registries meta-registry
{% for registry in site.collections %}{% unless registry.hidden %}* <a href="/api/{{ registry.slug }}.json">{{ registry.slug }}.json</a>{% endunless %}
{% endfor %}

#### RSS feed

* [feed.xml](/rss/feed.xml)

