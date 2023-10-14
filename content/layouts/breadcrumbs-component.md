---
title: Breadcrumbs component
description:
menu:
  layouts:
    parent: layouts
---

{{< heading level=2 text="Example" >}}

An example of the breadcrumbs component can be seen at the top of this page.

{{< heading level=2 text="Layout partial template" >}}

[Link to layout partial template on GitHub](https://github.com/seanpotts/hugo/blob/main/layouts/partials/navigation/breadcrumbs.html)

```go-html-template
<div class="hidden md:block">
  <nav aria-label="Breadcrumb navigation">
    <ul class="flex flex-wrap items-center p-0 -ml-2 list-none">
      {{ range .Ancestors.Reverse }}
        <li>
          <a
            class="px-2 py-1 transition duration-100 ease-linear focus:outline-none focus:ring focus:ring-inset underline-trigger"
            href="{{ .RelPermalink }}"
          >
            <span class="underline-target">
              {{ .Title }}
            </span>
          </a>
        </li>
        <li
          class="inline-flex items-center"
          aria-hidden="true"
        >
          {{ partial "icons/chevron" (dict "color" "text-gray-400") . }}
        </li>
      {{ end }}
      <li>
        <a
          class="px-2 py-1 transition duration-100 ease-linear focus:outline-none focus:ring focus:ring-inset underline-trigger"
          href="{{ .RelPermalink }}"
        >
          <span class="underline-target">
            {{ .Title }}
          </span>
        </a>
      </li>
    </ul>
  </nav>
</div>
```

{{< copy-to-clipboard-button >}}

{{< heading level=2 text="Calling the partial" >}}

The partial can be called from a template with the following code:

```go-html-template
{{ partial "navigation/breadcrumbs" . }}
```

{{< copy-to-clipboard-button >}}