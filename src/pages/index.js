import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = ({ data }) => (
  <Layout>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </Layout>
);

export const query = graphql`
  query {
    redCameraRentals {
      id
      records {
        fields {
          Cost
          Name
        }
      }
    }
  }
`;

export default IndexPage;
