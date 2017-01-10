grunt-frontmatter: Example of a nested json generation
------------------------------------------------------

Setup:

```bash
$ cd examples/nested
$ npm install
```

Run:

```bash
$npm run example
```

It converts from:

    .
    ├── about
    │   └── index.md  <-------
    ├── home
    │   └── index.md  <-------
    ├── Gruntfile.js
    └── package.json

to:

    .
    ├── about
    │   └── index.md
    ├── data.json     <-------
    ├── home
    │   └── index.md
    ├── Gruntfile.js
    └── package.json

Generated `data.json` contents are:

```json
{
  "about/index": {
    "title": "About",
    "preview": "About this page..",
    "basename": "index",
    "dirname": "about",
    "md5": "2a5f5e1e1f703c2869e0bacb1a8f6b18"
  },
  "home/index": {
    "title": "Home",
    "preview": "You can also check about..",
    "basename": "index",
    "dirname": "home",
    "md5": "9fffc6615b2660f1ff7c77f759e7efd7"
  }
}
```
