---
title: Custom link shortcode
description:
menu:
  shortcodes:
    parent: shortcodes
---

In most cases Hugo's [Render Hooks](https://gohugo.io/templates/render-hooks/) are suitable but if needing to support other features, such as adding a language attribute, the following shortcode might be useful.

{{< heading level=2 text="Examples" >}}

* {{< link text="Yle (Suomi)" url="https://yle.fi/" external=1 lang=1 >}}

```go-html-template
{{</* link text="Yle (Suomi)" url="https://yle.fi/" external=1 lang=1 */>}}
```

{{< copy-to-clipboard-button >}}

* {{< link text="Yle (Svenska)" url="https://yle.fi/" external=1 lang="sv" >}}

```go-html-template
{{</* link text="Yle (Svenska)" url="https://yle.fi/" external=1 lang="sv" */>}}
```

{{< copy-to-clipboard-button >}}

{{< heading level=2 text="Shortcode template" >}}

[Link to shortcode template on GitHub](https://github.com/seanpotts/hugo/blob/main/layouts/shortcodes/link.html)

```go-html-template
{{ $linkText := .Get "text" }}
{{ $linkUrl := .Get "url" }}
{{ $external := .Get "external" }}
{{ $lang := .Get "lang" }}

<!-- Catch any options for true or defaults -->
{{ $languageCode := "fi" }}
{{ if or (ne $lang 1) (ne $lang true) (ne $lang "true") (ne $lang "fi") }}
  {{ $languageCode = $lang }}
{{ end }}

<a href="{{ $linkUrl }}" {{ if $external }}target="_blank"{{ end }}>
  {{- if $external -}}<span {{ if $languageCode }}lang="{{ $languageCode }}"{{ end }}>{{- end -}}{{ $linkText }}{{- if $external -}}</span><span class="pl-2 pr-0.5">{{ partial "icons/external" . }}</span><span class="sr-only">(Opens in new window)</span>{{- end -}}
</a>
```

{{< copy-to-clipboard-button >}}

Note: The condensed anchor in the shortcode template is to ideally prevent excess spaces between the text and (possible) external icon.