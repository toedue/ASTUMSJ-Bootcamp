import { Link } from "react-router-dom";

const Header = ({ onPostClick, showProfile = false }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Blog</div>

        <ul className="flex gap-20 list-none p-0 m-0">
          <li className="cursor-pointer hover:text-gray-900">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-900">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-900">
            <Link to="/bookmarks">Saved</Link>
          </li>
        </ul>

        {showProfile ? (
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/profiles/default.jpg"
              className="w-8 h-8 rounded-full"
              alt="Profile"
            />
            <span className="font-medium">Username</span>
          </div>
        ) : (
          <button
            onClick={onPostClick}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Post a Blog
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
