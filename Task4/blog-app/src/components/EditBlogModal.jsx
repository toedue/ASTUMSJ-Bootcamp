import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const EditBlogModal = ({ blog, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    author: "",
    date: "",
    profileLink: "",
    title: "",
    description: "",
    content: "",
  });

  
  useEffect(() => {
    if (blog) {
      setFormData({
        author: blog.author || "",
        date: blog.date || "",
        profileLink: blog.profileLink || "",
        title: blog.title || "",
        description: blog.description || "",
        content: blog.content || "",
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[800px] h-[900px] rounded-lg overflow-hidden flex flex-col shadow-xl border border-gray-200">
        
        <div className="bg-gray-100 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Edit Your Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes size={24} />
          </button>
        </div>

        
        <form
          onSubmit={handleSubmit}
          className="w-[635px] h-[666px] mx-auto mt-8 space-y-6"
        >
          
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                name="author"
                placeholder="Author name"
                className="w-full p-3 border rounded-md"
                value={formData.author}
                onChange={handleChange}
                required
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
                required
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
              placeholder="https://example.com"
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
              placeholder="Blog title"
              className="w-full p-3 border rounded-md"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Short description"
              className="w-full p-3 border rounded-md"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              placeholder="Blog content"
              className="w-full h-[200px] p-3 border rounded-md"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between p-6 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
