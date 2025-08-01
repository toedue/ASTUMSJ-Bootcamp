import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const bookmarked = posts.filter((post) => post.isBookmarked);
    setBookmarkedPosts(bookmarked);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showProfile={true} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Saved Posts</h1>

        {bookmarkedPosts.length === 0 ? (
          <p className="text-center text-gray-500">No bookmarked posts yet</p>
        ) : (
          <div className="space-y-8">
            {bookmarkedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                
                <div className="p-6 flex items-center gap-4">
                  <img
                    src={`/src/assets/profiles/${post.author.toLowerCase()}.jpg`}
                    className="w-12 h-12 rounded-full object-cover"
                    alt={post.author}
                  />
                  <div>
                    <h3 className="font-bold">{post.author}</h3>
                    <p className="text-gray-500 text-sm">{post.date}</p>
                  </div>
                </div>

                
                <h2 className="px-6 pb-4 text-2xl font-bold">{post.title}</h2>

                
                <div className="w-full h-[400px] overflow-hidden">
                  <img
                    src={`/src/assets/${post.image}`}
                    className="w-full h-full object-cover"
                    alt={post.title}
                  />
                </div>

                
                <div className="p-6">
                  <div className="prose max-w-none whitespace-pre-line">
                    {post.content.split("\n").slice(0, 4).join("\n")}
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
