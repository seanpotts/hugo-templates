---
title: Table of contents based on custom headings
description:
menu:
  layouts:
    parent: layouts
---

Hugo contains its own [Table of Contents](https://gohugo.io/content-management/toc/) function but this seems to only handle native markdown headings. The following code can be used to assemble a table of contents based on custom headings. Only heading levels 2-4 are supported within the example. The same code is used to create the table of contents listings for this site, which use a custom heading shortcode. An example can be seen either within the "Table of contents" listing on desktop or within the "On this page" accordion on mobile.

{{< heading level=2 text="Layout partial template" >}}

[Link to layout partial template on GitHub](https://github.com/seanpotts/hugo/blob/main/layouts/partials/navigation/table-of-contents.html)

```go-html-template
<!--
  Relevant TOC related links to this template:
  - https://github.com/gohugoio/hugo/issues/1778
  - https://gist.github.com/skyzyx/a796d66f6a124f057f3374eff0b3f99a

  Other related TOC links:
  - https://github.com/gohugoio/hugo/issues/225
  - https://github.com/gohugoio/hugo/issues/1778
-->

{{ $scratch := newScratch }}
{{ $scratch.Set "last_level" 1 }}

{{ $headers := findRE "<h[2-4].*?>(.|\n)*?</h[2-4]>" .theContent }}

<!-- Requires at least 2 headers to show TOC -->
{{ if ge (len $headers) 2 }}

  <div class="lg:sticky lg:top-4">
    <div class="pt-2 pb-8 lg:pb-0 lg:pt-0">
      <button
        class="flex items-center justify-between w-full px-3 py-2 text-left transition duration-100 ease-linear bg-gray-100 border border-gray-300 border-solid js-accordionTrigger lg:hidden focus:outline-none focus:ring underline-trigger"
        id="table-of-contents"
        data-id="table-of-contents"
        aria-expanded="false"
        aria-controls="control-table-of-contents"
      >
        <span class="underline-target">
          On this page
        </span>
        <span class="sr-only">
          Toggle the table of contents
        </span>
        <span class="pl-4">
          <span class="flex items-center transition duration-200 transform icon">
            {{ partial "icons/chevron" (dict "color" "text-inherit" "rotate" "rotate-90") . }}
          </span>
        </span>
      </button>

      <div class="transition duration-200 opacity-0 lg:opacity-100 accordion-target table-of-contents">
        <div
          id="control-table-of-contents"
          class="hidden pt-4 lg:block lg:pt-0 sidebar"
        >
          <div class="px-2 py-1">
            <strong>Table of contents</strong>
          </div>
          <div class="pb-4 pl-6">
            <nav aria-label="Table of contents">
              {{ range $headers }}

                {{ $header := . }}

                <!--
                  Drill down into heading's anchor's spans to find/replace certain patterns.
                  Largely requires an inner <span> to exist, which is handled primarily by
                  the heading and table-data shortcodes.
                -->
                {{ $heading := "" }}

                {{ $findAnchor := findRE "<a[^>]*>(.|\n)*?</a>" . 1 }}

                {{ if $findAnchor }}
                  {{ $findSpan := findRE "<span class=[^>]*>(.|\n)*?</span>(.|\n)*?</span>" . 1 }}

                  {{ range $findSpan }}
                    <!-- Be cautious of the " > space -->
                    {{ $heading = . | replaceRE `<span class="transition duration-100 ease-linear group-focus:ring">` `` }}
                    {{ $heading = substr $heading 0 -7 }}
                  {{ end }}

                {{ end }}

                {{ $anchor := ($header | plainify | lower | anchorize) }}
                {{ $anchor := $anchor | replaceRE "-amp-" "-and-" | replaceRE "/" "-" | replaceRE " " "-" | replaceRE "---" "-" | replaceRE "--" "-" | replaceRE "-+" "-" }}

                {{ range findRE "[2-4]" . 1 }}

                  {{ $next_heading := (int .) }}

                  {{ if gt $next_heading ($scratch.Get "last_level") }}
                    <ul class="list-disc">
                  {{ else if lt $next_heading ($scratch.Get "last_level") }}
                    </li></ul>
                  {{ else }}
                    </li>
                  {{ end }}

                  <li>
                    <a
                      href="#{{ $anchor | safeURL }}"
                      class="inline-flex px-2 py-1 -my-1 -mr-2 no-underline transition duration-100 ease-linear js-hashSet focus:outline-none focus:ring underline-trigger hover:text-indigo-600 focus:text-indigo-600"
                    >
                      <span class="sr-only">Skip to</span> <span class="underline-target">{{ $heading | safeHTML }}</span> <span class="sr-only">section</span>
                    </a>
                  {{ $scratch.Set "last_level" $next_heading }}

                {{ end }}
              {{ end }}
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>

{{ end }}
```

{{< copy-to-clipboard-button >}}

{{< heading level=2 text="Calling the partial" >}}

The partial can be called from a template with the following code:

```go-html-template
{{ partial "navigation/table-of-contents.html" (dict "theContent" .Content) . }}
```

{{< copy-to-clipboard-button >}}