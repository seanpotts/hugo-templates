# Hugo templates

A small repository of hugo templates, including layouts and shortcodes.

## Installation

* `git clone https://github.com/seanpotts/hugo-templates.git`
* `npm install`
* `hugo server --disableFastRender --logLevel info`

## Notes

### Prevent Hugo from rendering shortcodes

Shortcodes in examples are wrapped with `{{</* shortcode */>}}` instead of `{{< shortcode >}}`.

More information: https://liatas.com/posts/escaping-hugo-shortcodes/