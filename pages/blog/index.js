import Link from 'next/link';
import { getBlogPosts } from '../../lib/contentful';

export async function getStaticProps() {
  const posts = await getBlogPosts();

  // Debugging log
  if (!posts || posts.length === 0) {
    console.log('No posts were fetched. Please check your Contentful API and content model.');
  } else {
    console.log('Fetched posts:', posts);
  }

  return {
    props: { posts },
    revalidate: 10, // Incremental static regeneration to keep content fresh
  };
}

export default function BlogList({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts && posts.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.fields.slug}
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #ddd',
                paddingBottom: '10px',
              }}
            >
              <Link href={`/blog/${post.fields.slug}`}>
                <h2 style={{ color: '#0070f3', cursor: 'pointer' }}>{post.fields.title}</h2>
              </Link>
              {post.fields.image && post.fields.image.fields.file.url && (
                <img
                  src={post.fields.image.fields.file.url}
                  alt={post.fields.image.fields.title || post.fields.title}
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    marginTop: '10px',
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
}
