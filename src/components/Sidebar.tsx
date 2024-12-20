import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}

interface Post {
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

const Sidebar = ({ isOpen, onTagClick }: Props) => {
  const [tags, setTags] = useState<string[]>([]);  // For top 10 most popular tags
  const [likedTags, setLikedTags] = useState<string[]>([]);  // For most liked posts tags

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const res = await fetch('https://dummyjson.com/posts');
        const data = await res.json();

        const tagCounts: { [key: string]: number } = {};

        data.posts.forEach((post: Post) => {
          if (Array.isArray(post.tags)) {
            post.tags.forEach((tag: string) => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        });

        const sortedTags = Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);

        setTags(sortedTags.map(([tag]) => tag));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchLikedTags = async () => {
      try {
        const res = await fetch('https://dummyjson.com/posts');
        const data = await res.json();

        const sortedPosts = data.posts.sort(
          (a: Post, b: Post) => b.reactions.likes - a.reactions.likes
        );

        const topLikedPosts = sortedPosts.slice(0, 10);
        const likedTags: string[] = [];

        topLikedPosts.forEach((post: Post) => {
          if (Array.isArray(post.tags)) {
            post.tags.forEach((tag) => {
              if (!likedTags.includes(tag)) {
                likedTags.push(tag);
              }
            });
          }
        });

        setLikedTags(likedTags);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPopularTags();
    fetchLikedTags();
  }, []);

  return (
    <div
      className={`fixed top-[64px] left-0 bg-base-300 w-[220px] h-full z-50 transition-transform ${
        isOpen ? "transform-none" : "transform -translate-x-full"
      }`}
    >
      <div className="p-4 h-full">
        {/* Close button removed */}

        {/* Accordion for Most Popular */}
        <div className="collapse collapse-plus border border-gray-300 border-opacity-60 rounded-md mb-4">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-sm font-medium px-4 py-1 flex items-center justify-between">
            <span className="flex-1 text-left">Most Popular</span>
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
                  className="text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accordion for Most Liked */}
        <div className="collapse collapse-plus border border-gray-300 border-opacity-60 rounded-md">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-sm font-medium px-4 py-1 flex items-center justify-between">
            <span className="flex-1 text-left">Most Liked</span>
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
              {likedTags.map((tag, index) => (
                <li
                  key={index}
                  className="text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
