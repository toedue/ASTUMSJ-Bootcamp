import { Link } from "react-router-dom";

const BlogCards = ({ post }) => {
  const threeLineContent = post.content.split("\n").slice(0, 3).join("\n");
  return (
    <Link
      to={`/blog/${post.id}`}
      className="block h-[501px] bg-white rounded-lg overflow-hidden m-[10px] hover:shadow-lg transition-shadow"
    >
      <div className="h-full flex flex-col">
        <div className="w-full h-[300px] overflow-hidden">
          <img
            src={`/src/assets/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col p-4">
          <h3 className="text-xl font-bold truncate mb-2">{post.title}</h3>

          <div className="flex-1 overflow-hidden mb-4">
            <p className="text-gray-600 whitespace-pre-line line-clamp-3">
              {threeLineContent}
            </p>
          </div>

          <div className="flex items-center mt-auto">
            <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden mr-3">
              <img
                src={`/src/assets/profiles/${post.author.toLowerCase()}.jpg`}
                alt={post.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium truncate">{post.author}</p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCards;
