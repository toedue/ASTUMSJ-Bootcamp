import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import Bookmarks from "./pages/Bookmarks";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
