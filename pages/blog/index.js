import { getBlogPosts } from '../../lib/contentful';

export async function getStaticProps() {
  const posts = await getBlogPosts();
  return {
    props: { posts },
  };
}

export default function BlogList({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.fields.slug}>
            <a href={`/${post.fields.slug}`}>{post.fields.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
