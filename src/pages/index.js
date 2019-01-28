import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`, 'wiki']} />
    <h1>
      Welcome{' '}
      <span role="img" aria-label="wave hello">
        👋
      </span>
    </h1>
    <p>This is your new gatsby-driven wiki.</p>
    <p>
      Add some new pages by following the instructions at the{' '}
      <Link to="/about">About</Link> page!
    </p>
  </Layout>
);

export default IndexPage;
