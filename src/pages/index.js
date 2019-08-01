import React from 'react';

import Layout from '../components/layout';

const IndexPage = ({ data }) => (
  <Layout>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </Layout>
);

export const query = graphql`
  query {
    allAirtableItem {
      edges {
        node {
          id
          Name
          Cost
          Condition
          Notes
          Status
          Quantity
        }
      }
    }
  }
`;

export default IndexPage;
