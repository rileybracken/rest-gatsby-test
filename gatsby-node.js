const axios = require('axios');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { AIRTABLE_API_KEY, AIRTABLE_SPACE } = process.env;
  const { createNode } = actions;
  const { data } = await axios.get(
    `https://api.airtable.com/v0/${AIRTABLE_SPACE}/RED`,
    { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } },
  );

  const nodeContent = JSON.stringify(data);

  const nodeMeta = {
    id: createNodeId(`my-data-airtable`),
    parent: null,
    children: [],
    internal: {
      type: `redCameraRentals`,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(data),
    },
  };

  const node = Object.assign({}, data, nodeMeta);
  createNode(node);
};
