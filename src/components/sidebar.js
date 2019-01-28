import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

/**
 * Turn the file structure of posts into a nav tree
 *
 * - /
 *   - about
 *   - sub-directory/
 *                  - sub-topic
 *
 * [
 *  {
 *    directory: '/',
 *    links: [
 *      {
 *        path: '/about',
 *        title: 'About'
 *      },
 *      {
 *        directory: 'sub-topic',
 *        links: [
 *          {
 *            path: '/sub-topic/sub-topic',
 *            title: 'Sub Topic Post'
 *          }
 *        ]
 *      }
 *    ]
 *  }
 * ]
 */
const parseLinks = pages => {
  const navTree = pages.reduce(
    (tree, { node: { frontmatter: page } }) => {
      // Split the uri into its directories
      const uri = page.path.split('/');
      const root = tree[0];

      // Keep track of current directory when building the tree
      let pwd = root;

      if (uri.length > 2) {
        // Iterate through each segment of the uri, creating directories and links
        for (let i = 1; i < uri.length; i++) {
          // The final element of uri is a link
          if (i === uri.length - 1) {
            pwd.links = [...pwd.links, page];
          } else {
            // Navigate to the existing directory _or_ create a new directory and navigate to it
            const segment = uri[i];
            const new_dir = pwd.links.find(l => l.directory === segment);

            if (new_dir) {
              pwd = new_dir;
            } else {
              pwd.links = [
                ...pwd.links,
                {
                  directory: segment,
                  links: [],
                },
              ];
              pwd = pwd.links.find(l => l.directory === segment);
            }
          }
        }
      } else {
        // The uri has no subdirectories, add it to the root
        root.links = [...root.links, page];
      }

      return tree;
    },
    [
      {
        directory: '/',
        links: [],
      },
    ]
  );

  return navTree;
};

/**
 * Recursively generate lists and list items from parsed links
 *
 * @param {Object} item
 */
function navStructure(item) {
  if (!item.directory) {
    return (
      <li key={`${item.path}__${item.title}`}>
        <Link to={item.path}>{item.title}</Link>
      </li>
    );
  } else {
    return (
      <React.Fragment key={`${item.directory}__container`}>
        <li key={`${item.directory}__title`}>{item.directory}</li>
        <ul key={`${item.directory}__links`}>{item.links.map(navStructure)}</ul>
      </React.Fragment>
    );
  }
}

/**
 * Generate list structure representing file structure
 */
const NavTree = ({ tree }) => {
  const items = tree.map(navStructure);

  return <ul>{items}</ul>;
};

const Sidebar = () => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                path
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMarkdownRemark: { edges: pages } }) => (
      <NavTree tree={parseLinks(pages)} />
    )}
  />
);

export default Sidebar;
