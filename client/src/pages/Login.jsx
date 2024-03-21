import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { authAction } from "../redux/Store";
import toast from "react-hot-toast";

const Login = () => {

  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  
  const handlechange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { username: input.username, password: input.password }
      );
      if (data.success) {
        dispatch(authAction.login())
        toast.success("Login Successfull");
        navigate("/create-post");
        localStorage.setItem('userId', data?.userExist._id);
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
            Login
          </Typography>
          <TextField
            placeholder="Enter username"
            type="text"
            name="username"
            required
            value={input.username}
            margin="normal"
            onChange={handlechange}
          />
          <TextField
            placeholder="Enter Password"
            type="password"
            name="password"
            required
            value={input.password}
            margin="normal"
            onChange={handlechange}
          />
          <Button
            variant="contained"
            type="submit"
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}>
            Login
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            onClick={() => navigate("/register")}>
            Don't have Account ? Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
