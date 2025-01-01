require('dotenv').config(); // Load .env.local

const { createClient } = require('contentful');

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function fetchPosts() {
  try {
    const response = await client.getEntries({
      content_type: 'blog', // Replace 'blog' with your Content Type ID
    });

    console.log('Fetched Posts:', JSON.stringify(response.items, null, 2)); // Pretty-print JSON
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}

fetchPosts();
