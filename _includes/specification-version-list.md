{% assign html_files = site.static_files | where: "extname", ".html" | sort: "basename" | reverse %}
{% assign last_version = "" %}
{%- for file in html_files -%}
{%- assign segments = file.path | split: "/" -%}
{%- assign firstchar = file.basename | slice: 0 -%}
{%- assign patch_separator = file.basename | slice: 4 -%}
{%- if segments[1] == include.specification and firstchar == "v" and patch_separator == "." -%}
{%- assign minor_version = file.basename | slice: 1, 3 -%}
{%- if minor_version != last_version -%}
{% assign last_version = minor_version %}
* **[{{ file.basename }}]({{ site.baseurl }}{{ file.path }})**
{%- else -%}
, [{{ file.basename }}]({{ site.baseurl }}{{ file.path }})
{%- endif -%}
{%- endif -%}
{%- endfor- %}
