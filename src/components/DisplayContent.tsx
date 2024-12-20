import React, { useEffect, useState } from 'react';

interface Post {
  title: string;
  body: string;
  tags: string[]; // Include tags in the Post type
}

const DisplayContent = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        const data = await response.json();
        
        // Log the tags for each post
        data.posts.forEach((post: Post) => {
          console.log("Post Tags:", post.tags);
        });

        setPosts(data.posts); // Assuming 'posts' is the key in the API response
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4">
      {/* Render each post dynamically */}
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg max-w-sm w-full flex flex-col justify-between"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">{post.title}</h3>
          <p className="text-gray-600 text-base leading-relaxed flex-grow">{post.body}</p>
          
          {/* Display tags for each post */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-sm bg-gray-200 text-gray-800 rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayContent;
