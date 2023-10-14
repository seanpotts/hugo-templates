---
title: List files in a static diretory
description:
menu:
  shortcodes:
    parent: shortcodes
---

{{< heading level=2 text="Example" >}}

This shortcode can be used to list files in a directory, such as directory with images. For example:

{{< static-directory-file-listing directory="images/static-directory-file-listing" hideExtensions=true target=true >}}

```go-html-template
{{</* static-directory-file-listing directory="images/static-directory-file-listing" hideExtensions=true target=true */>}}
```

{{< copy-to-clipboard-button >}}

The `hideExtensions` boolean can also be set to `true` to hide file extensions.

{{< heading level=2 text="Shortcode template" >}}

[Link to shortcode template on GitHub](https://github.com/seanpotts/hugo/blob/main/layouts/shortcodes/static-directory-file-listing.html)

```go-html-template
{{ $baseURL := .Site.BaseURL }}
{{ $hideExtensions := .Get "hideExtensions" }}
{{ $target := .Get "target" }}

{{ $directory := .Get "directory" }}
{{ $path := print "/static/" ($.Get "directory") }}

{{ $files := readDir $path }}
{{ if $files }}
  <ul>
    {{ range $files }}
      {{ if eq .Name ".DS_Store" }}
        {{ continue }}
      {{ end }}

      <li>
        {{ $title := .Name }}
        {{ if eq $hideExtensions true }}
          {{ $title = replaceRE `(.*)\.[^.]+$` "$1" $title  }}
        {{ end }}

        <a href="{{ $baseURL }}{{ $directory }}/{{ .Name }}" {{ if eq $target true }}target="_blank"{{ end }}>
          <span>{{ $title }}</span>{{ if eq $target true }}<span class="pr-0.5 pl-2">{{ partial "icons/external" . }}</span><span class="sr-only">(Opens in new window)</span>{{ end }}
        </a>
      </li>
    {{ end }}
  </ul>
{{ end }}
```

{{< copy-to-clipboard-button >}}

Note: The above code should suffice regardless of host, but it would be good to double check the results. Typically Hugo should put the contents of the `/static/` folder (`/images/`, etc) into the root directory, but this page, for example, is hosted with [GitHub Pages](https://pages.github.com/), which creates a sub directory from one's GitHub URL. Mapping the file link to the root directory of the deployment doesn't work as a result, but by combining the base URL with the directory and file name yields positive results.
