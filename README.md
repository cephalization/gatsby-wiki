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

This project has not yet been optimized to be used as a [Gatsby Starter](https://www.gatsbyjs.org/starters/?v=2) so I recommend forking/cloning this repo and setting it up as your very own.

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
