import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreatePost = () => {
  const id = localStorage.getItem("userId");
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  const handlechange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/post/create-post",
        {
          title: input.title,
          description: input.description,
          image: input.image,
          user: id,
        }
      );
      console.log(data);
      if (data?.success) {
        navigate("/posts");
        toast.success("Post Created");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            Create a post
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
            color="warning">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreatePost;
