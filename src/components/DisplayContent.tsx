import { useEffect, useState } from 'react';

interface Post {
  title: string;
  body: string;
  tags: string[];
}

const DisplayContent = ({ selectedTag }: { selectedTag: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        const data = await response.json();
        setPosts(data.posts); // Assuming 'posts' is the key in the API response
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {/* Render each post dynamically */}
      {posts
        .filter(post => 
          selectedTag ? post.tags.includes(selectedTag) : true  // Filter by selected tag if applicable
        )
        .map((post, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg flex flex-col justify-between h-full"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">{post.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed flex-grow mb-4">{post.body}</p>
            
            {/* Display tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                >
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
