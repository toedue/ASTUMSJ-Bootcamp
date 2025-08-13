import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaBookmark, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import EditBlogModal from "../components/EditBlogModal";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); 

  
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const foundPost = posts.find((post) => post.id === parseInt(id));
    if (foundPost) setBlog(foundPost);
  }, [id]);

  const handleDelete = () => {
    
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    
    const updatedPosts = posts.filter((post) => post.id !== parseInt(id));

   
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

    
    navigate("/");
  };

  const handleSave = (updatedData) => {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const updatedPosts = posts.map((post) =>
      post.id === parseInt(id) ? { ...post, ...updatedData } : post
    );
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    setBlog((prev) => ({ ...prev, ...updatedData }));
  };

  
  const handleBookmark = () => {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const updatedPosts = posts.map((post) =>
      post.id === parseInt(id)
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    );
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    setBlog((prev) => ({ ...prev, isBookmarked: !prev.isBookmarked }));
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
    
      <Header showProfile={true} />

      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        <div className="flex items-center gap-4 mb-8">
          <img
            src={`/src/assets/profiles/${blog.author.toLowerCase()}.jpg`}
            className="w-12 h-12 rounded-full object-cover"
            alt={blog.author}
          />
          <div>
            <h3 className="font-bold">{blog.author}</h3>
            <p className="text-gray-500 text-sm">Food Blogger</p>
          </div>
          <span className="ml-auto text-gray-500">{blog.date}</span>
        </div>

        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <div className="flex gap-4">
            
            <button
              onClick={handleBookmark}
              className={`${
                blog.isBookmarked ? "text-yellow-500" : "text-gray-500"
              } hover:text-yellow-500`}
            >
              <FaBookmark size={20} />
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="text-gray-500 hover:text-blue-500"
            >
              <FaEdit size={20} />
            </button>
            
            {showEditModal && (
              <EditBlogModal
                blog={blog}
                onClose={() => setShowEditModal(false)}
                onSave={handleSave}
              />
            )}
            <button
              onClick={handleDelete}
              className="text-gray-500 hover:text-red-500"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>

        
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={`/src/assets/${blog.image}`}
            className="w-full h-auto object-cover"
            alt={blog.title}
          />
        </div>

        
        <div className="prose max-w-none">
          {blog.content.split("\n").map((paragraph, i) => (
            <p key={i} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
