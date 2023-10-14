---
title: List sub pages by menu
description:
menu:
  shortcodes:
    parent: shortcodes
---

The following shortcode can be used to list all pages that have a specific menu and are within the `content` directory. Perhaps usable either for a miniature sitemap of specific directories or for index based pages.

{{< heading level=2 text="Example" >}}

{{< list-sub-pages-by-menu menu="shortcodes" >}}

```go-html-template
{{</* list-sub-pages-by-menu menu="shortcodes" */>}}
```

{{< copy-to-clipboard-button >}}

{{< heading level=2 text="Shortcode template" >}}

[Link to shortcode template on GitHub](https://github.com/seanpotts/hugo/blob/main/layouts/shortcodes/list-sub-pages-by-menu.html)

```go-html-template
{{ $menu := .Get "menu" }}

{{ if $menu }}
  {{ $menu = print $menu "/" }}
  <ul>
    {{ range where .Site.RegularPages "File.Dir" $menu }}
      <li>
        <a href="{{ .Permalink }}">
          {{ .Title }}
        </a>
      </li>
    {{ end }}
  </ul>
{{ end }}
```

{{< copy-to-clipboard-button >}}