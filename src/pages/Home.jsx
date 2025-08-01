import { useState, useEffect } from "react";
import Header from "../components/Header";
import FeaturedPost from "../components/FeaturedPost";
import BlogCards from "../components/BlogCards";
import Footer from "../components/Footer";
import PostBlogModal from "../components/PostBlogModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);

  const [visiblePosts, setVisiblePosts] = useState(9);

  
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    setBlogPosts(savedPosts);
  }, []);

  
  const handleNewPost = (newPost) => {
    setBlogPosts((prev) => [...prev, newPost]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onPostClick={() => setShowModal(true)} />
      <FeaturedPost />

      
      <div className="w-[308px] h-[70px] ml-15 not-[]:mb-8 mt-10">
        <h2 className="text-3xl font-bold">Recent Blog Posts</h2>
      </div>

      
      <div className="mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5px] px-[20px]">
        {blogPosts
          .slice()
          .reverse()
          .slice(0, visiblePosts)
          .map((post) => (
            <BlogCards key={post.id} post={post} />
          ))}
      </div>

      {blogPosts.length > visiblePosts && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisiblePosts((prev) => prev + 9)} // Load 9 more posts
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Show More
          </button>
        </div>
      )}

      <Footer />

      {showModal && (
        <PostBlogModal
          onClose={() => setShowModal(false)}
          onSubmit={handleNewPost}
        />
      )}
    </div>
  );
};

export default Home;
