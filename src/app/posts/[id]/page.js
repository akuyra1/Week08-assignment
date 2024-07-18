"use client";
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
      .insert([{ post_id: postId, comment: newComment }])
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
        <div className='comment-section-container-2'>
          <h2 className='comments-header' >Comments</h2>
          <div className='comment-area-container'>
            <ul className='list-of-comments-container'>
              {comments.map(comment => (
                <li className='list-comments' key={comment.id}>
                  <p><small className='user-id'><svg width="35" height="35" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 11.0001V4.00006L1 4.00006L1 11.0001H14ZM15 4.00006V11.0001C15 11.5523 14.5523 12.0001 14 12.0001H1C0.447715 12.0001 0 11.5523 0 11.0001V4.00006C0 3.44778 0.447715 3.00006 1 3.00006H14C14.5523 3.00006 15 3.44778 15 4.00006ZM2 5.25C2 5.11193 2.11193 5 2.25 5H5.75C5.88807 5 6 5.11193 6 5.25V9.75C6 9.88807 5.88807 10 5.75 10H2.25C2.11193 10 2 9.88807 2 9.75V5.25ZM7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H7.5ZM7 9.5C7 9.22386 7.22386 9 7.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H7.5C7.22386 10 7 9.77614 7 9.5ZM7.5 5C7.22386 5 7 5.22386 7 5.5C7 5.77614 7.22386 6 7.5 6H11.5C11.7761 6 12 5.77614 12 5.5C12 5.22386 11.7761 5 11.5 5H7.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>User ID: {comment.id}</small></p>
                  <p>{comment.comment}</p>
                </li>
              ))}
            </ul>
          
            <div className='comment-form-container'>
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
        </div>
      </div>
    </div>
  );
}
