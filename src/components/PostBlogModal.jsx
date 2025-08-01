import { useState } from "react";

const PostBlogModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    author: "",
    date: "",
    profileLink: "",
    title: "",
    description: "",
    content: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      setPreviewImage(URL.createObjectURL(file));
      
      setFormData((prev) => ({ ...prev, image: file.name }));
    }
  };

  const handlePost = () => {
    
    const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    
    const newId =
      existingPosts.length > 0
        ? Math.max(...existingPosts.map((post) => post.id)) + 1
        : 1;

    
    const newPost = {
      id: newId,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    
    localStorage.setItem(
      "blogPosts",
      JSON.stringify([...existingPosts, newPost])
    );

    
    onSubmit(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-[800px] h-[900px] rounded-lg overflow-hidden flex flex-col shadow-xl border border-gray-200">
        <div className="bg-gray-100 p-6">
          <h2 className="text-2xl font-bold">Post a Blog</h2>
        </div>

        
        <div className="w-[635px] h-[666px] mx-auto mt-8 space-y-6">
          
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                name="author"
                placeholder="Full Name"
                className="w-full p-3 border rounded-md"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="text"
                name="date"
                placeholder="MM/DD/YYYY"
                className="w-full p-3 border rounded-md"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Link
            </label>
            <input
              type="url"
              name="profileLink"
              placeholder="https://www.example.com"
              className="w-full p-3 border rounded-md"
              value={formData.profileLink}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              className="w-full p-3 border rounded-md"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter short description"
              className="w-full p-3 border rounded-md"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">Blog Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-md"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              placeholder="Write your blog content here..."
              className="w-full h-[200px] p-3 border rounded-md"
              value={formData.content}
              onChange={handleChange}
            />
          </div>
        </div>

       
        <div className="flex justify-between p-6 mt-10 px-20">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-orange-600 rounded-md hover:bg-orange-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBlogModal;
