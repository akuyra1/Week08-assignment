import { useState, useEffect } from 'react';
import { dbConnection } from '@/app/utils/dbConnection';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    async function fetchPosts() {
      const db = dbConnection();
      const sortedPosts = (await db.query(`SELECT * FROM posts ORDER BY created_at ${sortOrder}`)).rows;
      setPosts(sortedPosts);
    }
    fetchPosts();
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <h1>List of posts</h1>
      <button
        onClick={toggleSortOrder}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Sort by {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>
      <div className="grid grid-cols-6 gap-4 mx-6 mt-4">
        {posts.map((post) => (
          <div
            className="bg-yellow-400 text-gray-900 font-bold rounded-lg p-4 cursor-pointer transition-colors hover:opacity-20"
            key={post.id}
          >
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  );
}
