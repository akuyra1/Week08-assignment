"use client";

import React, { useState, useEffect } from 'react';
import supabase from '@/app/utils/supabase';
import Link from 'next/link';
import '@/app/ComponentStyles/IndividualPostContainer.css';
 

export default function PostPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select();

      if (error) {
        setError(error.message);
      } else {
        setData(data);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className='post-page-container'>
        <h1 className='post-page-h1'>List Of Posts</h1>
        <div className='each-post-container'>
          {data.map((post) => (
            <div className='each-post' key={post.id}>
              <ul className='list-container'>
                <li className='post-title-date-container'><span className='title-span'>Post title</span><p className='post-date'>{new Date(post.created_at).toLocaleDateString()}</p></li>
                <li><Link href={`/posts/${post.id}`}><h2>{post.title}</h2></Link></li>
              </ul>
            </div>
          ))}
        </div>
    </div>
  );
}


