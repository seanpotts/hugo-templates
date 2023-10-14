---
title: Custom heading shortcode
description:
menu:
  shortcodes:
    parent: shortcodes
---

The following headings are examples of this shortcode:

{{< heading level=2 text="Example heading level 2" >}}

{{< heading level=3 text="Esimerkkiotsikko oletuskielitunnisteella (Suomi)" lang="true" >}}

{{< heading level=4 text="Exempeltitel med Svenska språktagg" lang="sv" >}}

```go-html-template
{{</* heading level=2 text="Heading text" */>}}
```

{{< copy-to-clipboard-button >}}

It would also be possible to customise this shortcode with a `lang` attribute that could, for example, be used to specificy the heading's language if different from the site's default language.

{{< heading level=2 text="Shortcode template" >}}

[Link to shortcode template on GitHub](https://github.com/seanpotts/hugo/blob/main/layouts/shortcodes/heading.html)

```go-html-template
<!--
  A <span> must exist around the title, either for full encapsulation
  or partial words, for the sidebar's table-of-contents component to
  drill down and findRE/replaceRE findings consistently. This would
  be especially necessary if passing something like a "lang" attribute,
  for example.
-->

{{ $level := .Get "level" }}
{{ $text := .Get "text" | markdownify }}
{{ $lang := .Get "lang" }}

{{ $id := $text | plainify | lower }}
{{ $id = $id | replaceRE "&" "and" }}
{{ $id = $id | anchorize }}
{{ $id = $id | replaceRE " " "-" | replaceRE "---" "-" | replaceRE "--" "-" | replaceRE "-+" "-" | replaceRE "," "-" }}

<!-- Catch any options for true or defaults -->
{{ $languageCode := "fi" }}
{{ if or (ne $lang 1) (ne $lang true) (ne $lang "true") (ne $lang "fi") }}
  {{ $languageCode = $lang }}
{{ end }}

<h{{ $level }}>
  <a
    id="{{ $id }}"
    href="#{{ $id }}"
    class="inline-flex transition-colors duration-100 ease-linear focus:outline-none focus:ring hover:text-indigo-600 focus:text-indigo-600 group decoration-2"
  >
    <span class="transition duration-100 ease-linear group-focus:ring">
      <span {{ if $languageCode }}lang="{{ $languageCode }}"{{ end }}>{{ $text }}</span>
    </span>
  </a>
</h{{ $level }}>
```

{{< copy-to-clipboard-button >}}