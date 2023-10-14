/** @type {import('tailwindcss').Config} */

const typography = require('@tailwindcss/typography');

let fontPrimary = '-apple-system, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif';
let fontCursive = 'Apple Chancery, Lucida Calligraphy, Noteworthy, Segoe Print, Ink Free, cursive';

module.exports = {
  content: [
    './hugo_stats.json',
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': fontPrimary,
        'cursive': fontCursive,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1': {
              fontWeight: 700,
            },
            'h1 a, h2 a, h3 a': {
              fontWeight: 'inherit',
            },
            'ul > li::marker, ol > li::marker': {
              color: 'inherit',
            },
            'ul > li, ol > li': {
              paddingLeft: 0,
              marginTop: 0,
              marginBottom: 0,
            },
            '> ul > li > :first-child, > ol > li > :first-child': {
              marginTop: 0,
            },
            '> ul > li > :last-child, > ol > li > :last-child': {
              marginBottom: 0,
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      margin: ['first'],
      ringWidth: ['group-focus'],
      scale: ['group-hover', 'group-focus'],
      opacity: ['group-focus'],
    },
  },
  plugins: [
    typography,
  ],
  corePlugins: {}
}