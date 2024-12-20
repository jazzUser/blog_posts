import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen }: Props) => {
  const [tags, setTags] = useState<string[]>([]);  // State to store top 10 tags

  // Fetch the top 10 tags from the API
  useEffect(() => {
    const fetchTopTags = async () => {
      try {
        const res = await fetch('https://dummyjson.com/posts');
        const data = await res.json();

        const tagCounts: { [key: string]: number } = {};

        // Count the frequency of each tag
        data.posts.forEach((post: { tags: string[] }) => {
          if (Array.isArray(post.tags)) {
            post.tags.forEach((tag: string) => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        });

        // Sort tags by frequency and get the top 10
        const sortedTags = Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])  // Sort by count in descending order
          .slice(0, 10)  // Get the top 10 most frequent tags

        // Set the top tags into state
        setTags(sortedTags.map(([tag]) => tag));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchTopTags();
  }, []);

  return (
    <div
      className={`fixed top-[64px] left-0 bg-base-300 w-[220px] h-full z-50 transition-transform ${
        isOpen ? "transform-none" : "transform -translate-x-full"
      }`}
    >
      <div className="p-4 h-full">
        {/* Accordion for Most Popular */}
        <div className="collapse collapse-plus border border-gray-300 border-opacity-60 rounded-md mb-4">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-sm font-medium px-4 py-1 flex items-center justify-between">
            <span className="flex-1 text-left">Most Popular</span>
            {/* Only show the minus icon when the accordion is open */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-5 w-5 stroke-current peer-checked:block hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="collapse-content">
            <ul className="space-y-2 text-center">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accordion for Most Commented */}
        <div className="collapse collapse-plus border border-gray-300 border-opacity-60 rounded-md">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-sm font-medium px-4 py-1 flex items-center justify-between">
            <span className="flex-1 text-left">Most Commented</span>
            {/* Only show the minus icon when the accordion is open */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-5 w-5 stroke-current peer-checked:block hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="collapse-content">
            <ul className="space-y-2 text-center">
              <li className="text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">Crime</li>
              <li className="text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">Lifestyle</li>
              <li className="text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">Philosophy</li>
              <li className="text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">Movie</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
