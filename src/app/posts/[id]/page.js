"use client";
import '@/app/ComponentStyles/Home.css';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import supabase from '@/app/utils/supabase';
import '@/app/ComponentStyles/CommentsStyles.css'


export default function Post() {
  const pathname = usePathname();
  const postId = pathname.split('/').pop()
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from('posts').select().eq('id', postId).single();

      if (error) {
        setError(error.message);
      } else {
        setPost(data);
      }

      setLoading(false);
    };

    const fetchComments = async () => {
      const { data, error } = await supabase.from('comments').select().eq('post_id', postId);

      if (error) {
        setError(error.message);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, comment: newComment, author: 'Anonymous' }])
      .select();

    if (error) {
      setError(error.message);
    } else {
    
      if (data && data.length > 0) {
        setComments([...comments, data[0]]); 
      } else {
        setError("Failed to add comment. Please try again.");
      }
      setNewComment(''); 
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className='comment-section-container'>
        <h1>{post.title}</h1>
        <p className='post-content'>{post.content}</p>

        <h2 className='comments-header' >Comments</h2>
        <ul className='list-of-comments-container'>
          {comments.map(comment => (
            <li className='list-comments' key={comment.id}>
              <p><small className='user-id'>User ID: {comment.id}</small></p>
              <p>{comment.comment} <small className='author-name'>by {comment.author}</small></p>
            </li>
          ))}
        </ul>

        <form className='add-comment-form' onSubmit={handleCommentSubmit}>
          <textarea 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="Write a comment..."
            required
          />
          <button className='add-comment-btn' type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
}
