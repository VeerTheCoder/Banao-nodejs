import React, { useState, useEffect } from "react";
import axios from "axios";
import Postcard from "../components/Postcard";

const Posts = () => {
  const [post, setPost] = useState();
  const getAllPost = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/post/all-post"
      );
      if (data && data.success) {
        setPost(data?.post);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      {post &&
        post.map((postdata) => (
          <Postcard
            id={postdata?._id}
            isUser={localStorage.getItem("userId") === postdata?.users?._id}
            title={postdata?.title}
            description={postdata?.description}
            image={postdata?.image}
            username={postdata?.user?.username}
            time={postdata?.createdAt}
          />
        ))}
    </>
  );
};

export default Posts;
