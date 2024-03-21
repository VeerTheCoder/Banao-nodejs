import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

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
        "http://localhost:5000/api/v1/user/register",
        {
          username: input.username,
          email: input.email,
          password: input.password,
        }
      );
      if (data.success) {
        toast.success("Register Successfully")
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handlesubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px 10px #ccc"}
          padding={3}
          borderRadius={5}>
          <Typography
            variant="h4"
            padding={3}
            textAlign={"center"}
            textTransform={"uppercase"}>
            Register
          </Typography>
          <TextField
            placeholder="Enter username"
            name="username"
            type="text"
            value={input.username}
            margin="normal"
            required
            onChange={handlechange}
          />
          <TextField
            placeholder="Enter Email"
            name="email"
            type="email"
            value={input.email}
            margin="normal"
            required
            onChange={handlechange}
          />
          <TextField
            placeholder="Enter Password"
            name="password"
            type="password"
            value={input.password}
            margin="normal"
            required
            onChange={handlechange}
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}>
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            onClick={() => navigate("/login")}>
            Already Registerd ? Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
