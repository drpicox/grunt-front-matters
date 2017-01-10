grunt-frontmatter: Example of a plain json generation
-----------------------------------------------------

Setup:

```bash
$ cd examples/plain
$ npm install
```

Run:

```bash
$npm run example
```

It converts from:

    .
    ├── Gruntfile.js
    ├── package.json
    └── posts
        ├── gruntfrontmatter-is-here.md  <-------
        └── use-grunt.md                 <-------

to:

    .
    ├── Gruntfile.js
    ├── package.json
    ├── posts
    │   ├── gruntfrontmatter-is-here.md
    │   └── use-grunt.md
    └── posts.json                      <--------

Generated `posts.json` contents are:

```json
{
  "gruntfronmatter-is-here": {
    "author": "David Rodenas",
    "tags": "grunt, frontmatter",
    "basename": "gruntfronmatter-is-here",
    "preview": "Grunt frontmatter is available to use.",
    "md5": "2c7382e49a0b240810480b99c610b44b"
  },
  "use-grunt": {
    "author": "David Rodenas",
    "tags": "grunt",
    "basename": "use-grunt",
    "preview": "Grunt is a great builder, simple and effective.",
    "md5": "39ff48c235eeb8ea28f675f695827397"
  }
}
```
