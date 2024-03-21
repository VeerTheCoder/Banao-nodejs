import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const PostDetails = () => {
  const [post, setPost] = useState();
  const id = useParams().id;
  const navigate=useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });
  const postdetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/post/get-post/${id}`
      );
      if (data?.success) {
        setPost(data?.post);
        setInput({
            title:data.post.title,
            description:data.post.description,
            image:data.post.image
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postdetail();
  }, [id]);
 

  const handlechange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/post/update-post/${id}`,
        {
          title: input.title,
          description: input.description,
          image: input.image,
          user: id,
        }
      );
      if (data?.success) {
        navigate("/posts");
        toast.success("Post updated");
      }
    } catch (error) {
      console.log(error);
    }
}
  return (
    <>
    <form onSubmit={handlesubmit}>
        <Box
          borderRadius={10}
          padding={3}
          margin={"auto"}
          boxShadow={"10px 10px 20px 10px #ccc"}
          display={"flex"}
          flexDirection={"column"}
          width={"55%"}
          marginTop={"30px"}>
          <Typography
            variant="h5"
            textAlign={"center"}
            fontWeight={"bold"}
            padding={3}
            color={"gray"}
            textTransform={"uppercase"}>
            Update your post
          </Typography>

          <InputLabel
            sx={{ mb: 2, mt: 1, fontSize: "18px", fontWeight: "bold" }}>
            Title
          </InputLabel>
          <TextField
            name="title"
            value={input.title}
            onChange={handlechange}
            variant="outlined"
            placeholder="Enter title of your Post"
            required
          />

          <InputLabel
            sx={{ mb: 2, mt: 1, fontSize: "18px", fontWeight: "bold" }}>
            Description
          </InputLabel>
          <TextField
            name="description"
            value={input.description}
            onChange={handlechange}
            variant="outlined"
            placeholder="Describe your post"
            required
          />

          <InputLabel
            sx={{ mb: 2, mt: 1, fontSize: "18px", fontWeight: "bold" }}>
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={input.image}
            onChange={handlechange}
            variant="outlined"
            placeholder="Enter image URL"
            required
          />

          <Button
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            color="success">
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default PostDetails;
