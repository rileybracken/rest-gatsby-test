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

  const processItem = item => {
    const nodeId = createNodeId(`airtable-item-${item.id}`);
    const nodeContent = JSON.stringify(item);
    const nodeData = Object.assign(
      {},
      { id: item.id, createdTime: item.createdTime, ...item.fields },
      {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: `AirtableItem`,
          content: nodeContent,
          contentDigest: createContentDigest(item),
        },
      },
    );
    return nodeData;
  };

  data.records.map(item => {
    const node = processItem(item);
    createNode(node);
  });
};
