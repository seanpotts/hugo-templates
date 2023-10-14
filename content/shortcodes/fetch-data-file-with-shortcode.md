---
title: Fetch data file with shortcode
description:
menu:
  shortcodes:
    parent: shortcodes
---

{{< heading level=2 text="Examples" >}}

{{< heading level=3 text="Basic example" >}}

The basic example displays tabular content as per data files. The data files can be nested into subdirectories as well. For example:

{{< table-data headingLevel=4 title=accordionMobile=0 accordionPersist=0 path="tables/table-data-test" >}}

```go-html-template
{{</* table-data headingLevel=4 title=accordionMobile=0 accordionPersist=0 path="tables/table-data-test" */>}}
```

{{< copy-to-clipboard-button >}}

{{< heading level=3 text="Example with persisting accordion" >}}

The shortcode can also be set to wrap its contents in accordions that are only visible on smaller viewports. This might be useful on longer pages where such tabular data isn't necessarily primary content. For example:

{{< table-data headingLevel=4 title=accordionMobile=1 accordionPersist=0 path="tables/table-data-test-accordion" >}}

```go-html-template
{{</* table-data headingLevel=4 title=accordionMobile=1 accordionPersist=0 path="tables/table-data-test-accordion" */>}}
```

{{< copy-to-clipboard-button >}}

{{< heading level=3 text="Example with content wrapped in an accordion on mobile which becomes visible on desktop" >}}

The shortcode can also be set to persist the accordion across all views. This might be useful if there are many tables on the page or there is a series of tables in a row. For example:


{{< table-data headingLevel=4 title=accordionMobile=1 accordionPersist=1 path="tables/tables-sub-directory/table-sub-directory-data-test" >}}

```go-html-template
{{</* table-data headingLevel=4 title=accordionMobile=1 accordionPersist=1 path="tables/tables-sub-directory/table-sub-directory-data-test" */>}}
```

{{< copy-to-clipboard-button >}}

Note: Toggling the accordion open updates the URL bar with the ID of the title within. This is to ideally more easily share the location of such contents. This updates for each accordion toggling and gets cleared when accordions are closed. This functionality is also present in the previous mobile-only accordion setting but is more easily to preview when the accordion persists to desktop.

{{< heading level=2 text="Shortcode template" >}}

[Link to shortcode template on GitHub](https://github.com/seanpotts/hugo/blob/main/layouts/shortcodes/table-data.html)

```go-html-template
<!--
  - "headingLevel" variable gets set based on number. If set to 0 it will
  not show the heading.
  - File name and "title" field of json files need to match for data range
  to work properly.
  - "accordionMobile" will show the accordion on mobile but not desktop.
  - "persistAccordion" will show the accordion across all views.
-->

{{ $headingLevel := .Get "headingLevel" }}
{{ $accordionMobile := .Get "accordionMobile" }}
{{ $accordionPersist := .Get "accordionPersist" }}
{{ $path := .Get "path" }}

{{ $path := split $path "/" }}

{{ $directory := slice }}
{{ $file := "" }}
{{ range $index, $element := $path }}
  <!-- Pop file (last part of string/array) from path -->
  {{ if ne (add $index 1) (len $path) }}
    {{ $directory = $directory | append $element }}
  {{ end }}

  <!-- Get file (last part of string/array) -->
  {{ if eq (add $index 1) (len $path) }}
    {{ $file = $element }}
  {{ end }}
{{ end }}

{{ $data := ""}}
{{ range index $.Site.Data $directory }}
  {{ $title := lower .title | plainify | anchorize }}
  {{ if eq $title $file }}
    {{ $data = . }}
  {{ end }}
{{ end }}

{{ partial "content/table-data" (dict "data" $data "headingLevel" $headingLevel "accordionMobile" $accordionMobile "accordionPersist" $accordionPersist) . }}
```

{{< copy-to-clipboard-button >}}

{{< heading level=2 text="HTML template" >}}

[Link to HTML template on GitHub](https://github.com/seanpotts/hugo/blob/main/layouts/partials/content/table-data.html)

```go-html-template
{{ $headingLevel := .headingLevel }}
{{ $accordionMobile := .accordionMobile }}
{{ $accordionPersist := .accordionPersist }}

{{ with .data }}

  <!--
    If titleDisplay is used then set $title accordingly, followed by
    sanitizing magic.
  -->
  {{ $title := .title }}
  {{ if .titleDisplay }}
    {{ $title = .titleDisplay }}
  {{ end }}

  <!--
    "anchorize" doesn't strip out _italics_ and "markdownify" complicates
    the matter, so convert to <em> with "markdownify" and strip.
  -->
  {{ $id := $title | plainify | lower | markdownify | anchorize }}
  {{ $id = $id | replaceRE "<em>" "" | replaceRE "</em>" "" | replaceRE "/" "-" | replaceRE " " "-" | replaceRE "---" "-" | replaceRE "--" "-" | replaceRE "-+" "-" | replaceRE "," "" | replaceRE "-amp-" "-and-" }}

  <!--
    $heading is used by the .data range to get the proper index for mobile
    table view. Used with: `index $heading $index "title"`.
  -->
  {{ $heading := .heading }}

  {{ if or (eq $accordionMobile 1) (eq $accordionPersist 1) }}
    <div class="mb-2">
      <button
        class="flex items-center justify-between w-full px-3 py-2 text-left transition duration-100 ease-linear border border-gray-300 border-solid bg-gray-100 js-accordionTrigger focus:outline-none focus:ring underline-trigger print:hidden
          {{ if not (eq $accordionPersist 1) }}
            md:hidden
          {{ end }}
        "
        id="id-{{ lower $id }}"
        data-id="{{ lower $id }}"
        aria-expanded="false"
        aria-controls="control-{{ lower $id }}"
      >
        <span class="underline-target">
          {{ replace $title "\n" "<br />" | safeHTML | markdownify }}
        </span>
        <span class="sr-only">
          Toggle the {{ if $title | markdownify }} {{ $title }} {{ else }} {{ lower .title | markdownify }} {{ end }}chart
        </span>
        <span class="pl-4">
          <span class="flex items-center transition duration-200 transform icon">
            {{ partial "icons/chevron" (dict "color" "text-inherit" "rotate" "rotate-90") . }}
          </span>
        </span>
      </button>
      <div
        class="transition duration-200 opacity-0 accordion-target print:opacity-100
          {{ if not (eq $accordionPersist 1) }}
            md:opacity-100
          {{ end }}
        "
      >
        <div
          id="control-{{ lower $id }}"
          class="hidden pt-4 md:pt-0 print:block
            {{ if not (eq $accordionPersist 1) }}
              md:block
            {{ end }}
          "
        >
  {{ end }}

          {{ if ge $headingLevel 1 }}
            <h{{ $headingLevel }}>
              <a
                id="{{ lower $id }}"
                href="#{{ lower $id }}"
                class="inline-flex focus:outline-none js-hashSet group decoration-2"
              >
                <span class="transition duration-100 ease-linear group-focus:ring">
                  <span>
                    {{ $title | markdownify }}
                  </span>
                </span>
              </a>
            </h{{ $headingLevel }}>
          {{ end }}

          {{ if .description }}
            <p>{{ .description | markdownify }}</p>
          {{ end }}

          <div class="js-tableFilter">
            <table class="table-fixed">
              <caption class="sr-only">
                {{ if .caption }}
                  {{ .caption | markdownify }}
                {{ else }}
                  Table for {{ lower .title | markdownify }}
                {{ end }}
              </caption>
              {{ if .heading }}
                <thead>
                  <tr role="row">
                    {{ range .heading }}
                      {{ if .title }}
                        <th
                          role="columnheader"
                          scope="col"
                        >
                          <span>
                            {{ .title }}
                          </span>
                        </th>
                      {{ end }}
                    {{ end }}
                  </tr>
                </thead>
              {{ end }}
              {{ if .data }}
                <tbody>
                  {{ range .data }}
                    {{ if .row }}
                      <tr
                        role="row"
                        class="block md:table-row print:table-row"
                      >
                        {{ range $index, $row := .row }}
                          <td
                            role="cell"
                            class="block md:table-cell print:table-cell"
                          >
                            <div class="grid grid-cols-2 gap-4 md:block print:block">
                              <div
                                class="md:hidden print:hidden"
                                aria-hidden="true"
                              >
                                <strong>
                                  {{ index $heading $index "title" }}
                                </strong>
                              </div>
                              <span role="text">
                                {{ if $row.link }}
                                  <a href="{{ $row.link }}">
                                {{ end }}
                                  {{ $text := replace $row.text "\n" "<br />" | safeHTML | markdownify }}
                                  {{ $text }} {{ if .spoken }}*{{ end }}
                                {{ if $row.link }}
                                  </a>
                                {{ end }}
                              </span>
                            </div>
                          </td>
                        {{ end }}
                      </tr>
                    {{ end }}
                  {{ end }}
                </tbody>
              {{ end }}
            </table>
          </div>

          {{ if .extra }}
            {{ replace .extra "\n" "<br />" | safeHTML | markdownify }}
          {{ end }}

  {{ if or (eq $accordionMobile 1) (eq $accordionPersist 1) }}
        </div>
      </div>
    </div>
  {{ end }}

{{ end }}
```

{{< copy-to-clipboard-button >}}

{{< heading level=2 text="Assets used within this shortcode" >}}

{{< heading level=3 text="Styles" >}}

* [accordion.css](https://github.com/seanpotts/hugo/blob/main/assets/styles/accordion.css) - For styling the accordion functionality.
* [tables.css](https://github.com/seanpotts/hugo/blob/main/assets/styles/tables.css) - For styling the tables.

{{< heading level=3 text="Scripts" >}}

* [accordion.js](https://github.com/seanpotts/hugo/blob/main/assets/scripts/accordion.js) - For accordion functionality.
* [app-load.js](https://github.com/seanpotts/hugo/blob/main/assets/scripts/app-load.js) - For determining if there is a hash in the URL based on accordion/title ID and both scrolls the user to the location and opens the accordion.
* [hash-set.js](https://github.com/seanpotts/hugo/blob/main/assets/scripts/hash-set.js) - For setting the accordion/title ID to the URL if accordions are opened.
* [hash-unset.js](https://github.com/seanpotts/hugo/blob/main/assets/scripts/hash-unset.js) - For unsetting the accordion/title ID from the URL if accordions are closed.