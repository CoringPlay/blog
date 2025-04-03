import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div className="container">
      <div className="hero">
        <h2>Добро пожаловать в мой блог!</h2>
        <p>Здесь я буду делиться своими мыслями, идеями и проектами.</p>
      </div>

      <h1>Последние посты</h1>
      <ul>
        {posts.map(({ slug, title, date }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
                <h3>{title}</h3>
            </Link>
            <div className="post-meta">{date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      ...data,
    };
  });

  return {
    props: { posts },
  };
}
