/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

exports.onPreBootstrap = ({ store }) => {
  const { program } = store.getState();
  const dir = `${program.directory}/wiki`;

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const wikiPostTemplate = require.resolve(`./src/templates/wiki-post.js`);

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: wikiPostTemplate,
        context: {}, // additional data can be passed via context
      });
    });
  });
};

// Process this site as a theme when installed as a package from npm
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(require.resolve('gatsby-wiki-theme')),
          use: [loaders.js()],
        },
      ],
    },
  });
};
