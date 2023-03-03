---
layout: default
permalink: /registry/index.html
---

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) against the `gh-pages` branch and add a new Markdown file to a folder in the `registries/_{registryName}`. The name of the file is considered the registration entry, ignoring the file extension. Alternatively you can open an [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to discuss a registry value.

### Contents

{% for registry in site.collections %}{% unless registry.hidden %}* <a href="./{{ registry.slug }}">{{ registry.name }}{% endunless %}
{% endfor %}

#### API access

* [registries.json](./api/registries.json) - Registries meta-registry
{% for registry in site.collections %}{% unless registry.hidden %}* <a href="../api/{{ registry.slug }}.json">{{ registry.slug }}.json</a>{% endunless %}
{% endfor %}

#### RSS feed

* [feed.xml](../rss/feed.xml)

