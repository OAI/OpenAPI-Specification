# Contributing

## Building the site

The registry site uses [jekyll](https://jekyllrb.com/),
a Ruby based static site generator, with the Dinky theme.

### Docker dev

You can use the following Docker command to build and serve the site:

```shell
docker build . -t oas-spec/latest
docker run -v $(pwd):/site -p 4000:4000 oas-spec/latest
```

### Local Ruby dev

You will need to set up Ruby locally to run the server and see your changes.

``` bash
gem install bundler
bundle install
```

With all the gems (dependencies) installed, you can launch the jekyll server.

``` bash
bundle exec jekyll serve
```

It will show output like this, and you can grab the Server address
and open it in your browser.

```md
Configuration file: /site/_config.yml
            Source: /site
       Destination: /site/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 3.609 seconds.
 Auto-regeneration: enabled for '/site'
    Server address: http://0.0.0.0:4000
```

## Adding New Entries to the Registries

To add a new entry to the registries (either an OpenAPI
Specification Extension namespace or a specific OpenAPI
Specification Extension),
fork this repository in GitHub.
Make a local clone of your fork and check out the
`gh-pages` branch.

### Add a New Extension Namespace  Registry Entry

Working in the `gh-pages` branch,
add a new Markdown file in `registries/_namespace/`. The file name
should be the namespace name with a `.md` extension, without the `x-`
prefix.
For example, to add an extension namespace `abc` for extensions named `x-abc-*`,
create `registries/_namespace/abc.md`. Use the following template,
replacing the instruction text in `<<instruction-text>>` markers:

```md
---
owner: <<Your-GutHub-username>>
issue:
description: <<Briefly describe your namespace>>
layout: default
---

{% capture summary %}
The `x-{{page.slug}}-` prefix is reserved for extensions created by
<<describe your organization and namespace>>
{% endcapture %}

{% include namespace-entry.md summary=summary %}

```

You may use [GitHub Flavored Markdown](https://github.github.com/gfm/)
in the short and long descriptions.

See [oai.md](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/refs/heads/gh-pages/registries/_namespace/oai.md)
for an example for the `x-oai-*` namespace.

Next, locally build
the site as described above and view
[http://127.0.0.1:4000/registry/namespace/index.html](http://127.0.0.1:4000/registry/namespace/index.html)
to verify your namespace is listed.
(Modify the URL if Jekyll is running on a different IP or port.)
The namespace name in __Value__ column
should link to your namespace page, and the __Description__
text should be the `description:` from the Markdown frontmatter.

Preview your content at
`http://127.0.0.1:4000/registry/namespace/abc.html`
(change `abc` to your namespace name in the URL).

### Add a New Specification Extension Registry Entry

add a new Markdown file in `registries/_extension/`.
The file name should be your specification extension name with
a `.md` file extension, such as
`registries/_extension/x-abc-wander.md` to document the
`x-abc-wander` extension.

Use this template for your file,
replacing the instruction text in `<<instruction-text>>` markers:

```md
---
owner: <<Your-GutHub-username>>
issue:
description: <<Brief description of your Specification Extension>>.
schema:
  <<JSON Schema, in YAML format, for validating specification extension instances>>
 objects: <<Array of OAS objects where the specification may be used.>>
layout: default
---

{% capture summary %}
<<Detailed description of the extension.>>

Used by: (informational)

 * <<bullet list of representative users of the extension>>>
{% endcapture %}

{% capture example %}

<<YAML snippet of OpenAPI source code example showing use of your specification example>

{% endcapture %}

{% include extension-entry.md summary=summary example=example %}
```

You may use [GitHub Flavored Markdown](https://github.github.com/gfm/)
in the short and long descriptions.

See [x-twitter.md](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/refs/heads/gh-pages/registries/_extension/x-twitter.md)
for an example.

Build the site locally as described above.

Preview [http://127.0.0.1:4000/registry/extension/](http://127.0.0.1:4000/registry/extension/).

(Modify the URL if Jekyll is running on a different IP or port.)
Verify that your specification extension
is listed. The __Value__ column should contain your extension name
with a link to your documentation, such as
`http://127.0.0.1:4000/registry/extension/x-abc-wander.html`,
and the __Description__ should be your brief description.

### Submitting

When you have verified your content renders correctly,
submit a Pull Request against the `gh-pages` branch
of `git@github.com:OAI/OpenAPI-Specification.git`.
Committers will review the PR and you may be asked
to update the PR. When approved, committers
will merge your PR into `git@github.com:OAI/OpenAPI-Specification.git`
and the merge actions will publish your changes to
[https://spec.openapis.org/registry/](https://spec.openapis.org/registry/).
