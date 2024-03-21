import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import { Toaster } from "react-hot-toast";
import Forgot from "./Forgot";
import Resetpassword from "./Resetpassword";


function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />}/>
        <Route path="/reset-password/:id/:token" element={<Resetpassword />}/>
      </Routes>
    </>
  );
}

export default App;
