{% assign registry = site.collections | where:"label", page.collection  | first %}
# <a href=".">{{ registry.name }}</a>

## {{ page.slug }} - {{ page.description }}

{{ include.summary }}

### Schema

```yaml
{{page.schema}}
```

### Example

{{ include.example }}

