# grunt-frontmatters

> Extract YAML front-matter from files to a single JSON file

The use case of `grunt-frontmatter` task is to strip all YAML front-matter pressent in multiple files (.html, .md, whatsoever) and combine them all in a single JSON file that can be loaded at once as a single file. It also is able to strip few firsts characters from each file to make a preview.

In addition to data already present in the YAML following fields are added:

- `preview` of the actual body content
- `basename` of the filename


## The "frontmatter" task

Pretend you have a folder structure like this:

    .
    ├── Gruntfile.coffee
    ├── component.json
    ├── package.json
    └── source
        ├── articles
        │   ├── bellflower.md    <--
        │   ├── fiddler.html     <--
        │   └── lottery.md       <--
        ├── favicon.ico
        ├── index.jade
        ├── style.styl
        ├── styles
        │   ├── h5bp.css
        │   ├── main.css
        │   └── normalize.css
        └── templates
            └── h5bp.jade

Each file in the articles directory has a bit of YAML front-matter metadata, like the title of the article, author, and tags. We want just the metadata from all three to be combined into a single JSON stringified file, called articles.json.

Now `grunt release` will build a `release` folder that looks like this:

    .
    ├── Gruntfile.coffee
    ├── component.json
    ├── package.json
    ├── release
    │   ├── articles
    │   │   ├── bellflower.html
    │   │   ├── fiddle.html
    │   │   └── lottery.html
    │   ├── articles.json            <---
    │   ├── favicon.ico
    │   ├── index.html
    │   └── style.css
    └── source


### Configuring your "frontmatter" task

In your project's Gruntfile, add a section named `m2j` to
the data object passed into `grunt.initConfig()`.

    frontmatter: {
        release: {
            options: {
                minify: true,
                width: 60
            },
            files: {
                'release/articles.json': ['source/articles/*.md']
            },
        }
    }

### Options

#### options.minify

Type: `Boolean`
Default value: `false`

If true, then the JSON.stringify is instructed to strip unnecessary
linebreaks, making the resulting .json file smaller.

#### options.width

Type: `Int`
Default value: `70`

No more than `width` charactes from the Markdown file's body is saved in
the `preview` element. Trailing ellipses are added.
