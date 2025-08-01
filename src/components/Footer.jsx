import { FaTelegram, FaFacebook, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full h-[130px]">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <div className="text-2xl font-bold">Blog</div>
        <div className="w-[424px] h-[34px] flex items-center justify-center">
          <p className="text-sm md:text-base">
            © 2025 Blog. All rights reserved.
          </p>
        </div>
        <div className="w-[205px] h-[60px] flex items-center justify-end gap-4">
          <FaTelegram className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          <FaFacebook className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          <FaEnvelope className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
