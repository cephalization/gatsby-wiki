import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { parseLinksToTree } from '../utils/parse-links-to-tree';

import { NavTree } from './navtree';
import './sidebar.css';

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
      <NavTree tree={parseLinksToTree(pages)} className={className} />
    )}
  />
);

export default Sidebar;
