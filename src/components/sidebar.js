import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { TreeView } from '@progress/kendo-react-treeview';

import './sidebar.css';

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
 * Start converting tree structure to a kendo-parseable structure
 *
 * @param {array} tree structure generated from markdown frontmatter
 * e.g.
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
const kendoConvert = tree =>
  tree[0] ? tree[0].links.map(convertTreeToKendoTree) : [];

/**
 * Recursively converts tree of page link data (markdown frontmatter) into structure that kendo can parse
 * https://www.telerik.com/kendo-react-ui/components/treeview/data-binding/
 *
 * @param {object} item tree item to be converted into kendo-parseable structure
 */
function convertTreeToKendoTree(item) {
  return {
    text: item.directory ? item.directory : item.title,
    opened: false,
    items: Array.isArray(item.links)
      ? item.links.map(convertTreeToKendoTree)
      : null,
    ...item,
  };
}

/**
 * Generate page link or directory title based on tree item
 *
 * @param {object} props
 */
const NavItem = ({ item }) => {
  if (!item.directory) {
    return (
      <Link className="nav nav-link" to={item.path}>
        {item.title}
      </Link>
    );
  }

  return <p className="nav nav-directory">{item.directory}</p>;
};

/**
 * Generate list structure representing file structure
 *
 * @param {array} tree structure generated from markdown frontmatter
 * e.g.
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
const NavTree = ({ tree, className }) => {
  const data = kendoConvert(tree);

  return (
    <div className={className}>
      <h4 style={{ marginLeft: '1.45rem' }}>Articles</h4>
      <TreeView
        data={data}
        textField={data.text}
        expandField="opened"
        itemRender={NavItem}
        onExpandChange={e => {
          e.item.opened = !e.item.opened;
        }}
        onItemClick={e => {
          e.item.opened = !e.item.opened;
        }}
      />
    </div>
  );
};

const Sidebar = ({ className }) => (
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
      <NavTree tree={parseLinks(pages)} className={className} />
    )}
  />
);

export default Sidebar;
