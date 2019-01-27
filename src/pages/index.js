import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`, 'wiki']} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby wiki.</p>
    <p>Add some new pages!</p>
  </Layout>
);

export default IndexPage;
