<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://blissful-euler-14b462.netlify.com/">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Wiki Template
</h1>

A wiki starter template for markdown driven documentation sites using [Gatsby](https://github.com/gatsbyjs/gatsby/).

## Motivation

I wanted a gatsby driven documentation platform that is dead-simple to contribute to (provided that you know how to use git and markdown 😬).

This project is primarily developer focused but it is open to contributions and suggestions from anyone who wants to use a gatsby-powered documentation site!

## Demo

[Netlify Hosted Demo](https://blissful-euler-14b462.netlify.com/)

## Features

- Gatsby V2 Support
- Gatsby blog starter structure
  - With modifications, detailed below
- Markdown post support
- Hierarchical post navigation
  - Automatically generated from the filesystem (your posts!)
  - Displayed via [Kendo UI TreeView](https://www.telerik.com/kendo-react-ui/components/treeview/)

## Todo (in no particular order)

- [x] Automatic transformation of posts into wiki pages
- [x] Auto-generated navigation tree
- [ ] Responsive sidebar
- [ ] Responsive post content
- [ ] Friendly customization API (paths/prefixes, file locations, theming, etc)
- [ ] Higher quality src code for friendlier modification
- [ ] Unit testing
- [ ] Builds / Build status / CI / CD
- [ ] Your suggestions ❤️

## Getting Started

~This project has not yet been optimized to be used as a [Gatsby Starter](https://www.gatsbyjs.org/starters/?v=2) so I recommend forking/cloning this repo and setting it up as your very own.~

**Note** This project will soon be setup as a [gatsby theme](https://www.gatsbyjs.org/blog/2018-11-11-introducing-gatsby-themes/). This will allow you to install this repo as a package, and run it as your gatsby site. All of the components in this repo will then be customizable and over-writable and you will be able to update the package to get all of the latest features without disturbing your content / customization.

I recommend holding out from using this repo until this conversion is complete _but_, I encourage you to take a look at the
code and the live version to see if having this project as a base to your own gatsby documentation site is something you are
interested in!

```
# Clone the project as your own repo
git clone https://github.com/cephalization/gatsby-wiki YourProjectName

cd YourProjectname

# Delete the references to this git repo
rm -rf .git

# (optional) Initialize your own repository so you can track your own changes
git init .

# Install dependencies (can also use yarn)
npm install 

# Run the wiki locally, hot-reload when pages are updated but not added (yet?)
npm run develop
```

You can now host this template via your favorite hosting service (or yourself!), push to your own git<hub|lab|etc> repo, and customize to your heart's content!

## Adding new articles

1. Create md file in `wiki/<topic>/<post>.md`
    - Keep in mind, whatever directory structure you make here will be the link of the post!

2. Setup frontmatter (special markdown header) at the top of the file like so:

```
---
title: 'My First Post!'
path: '/<topic>/<post>.md'
---

```

3. Add post content 👌

```
---
title: 'My First Post!'
path: '/<topic>/<post>.md'
---

# How to add posts
First you must read the README...
```

4. Restart your server
