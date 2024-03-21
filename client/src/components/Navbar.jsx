import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../redux/Store";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId')
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handlelogout = () => {
    try {
      dispatch(authAction.logout());
      toast.success("Logout successfully");
      navigate("/login");
      localStorage.clear()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky" color="warning">
        <Toolbar>
          <Typography variant="h5">Banao Assignment</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                indicatorColor="warning"
                value={value}
                onChange={(e, val) => setValue(val)}>
                <Tab label="All Posts" LinkComponent={Link} to="/posts" />
                <Tab
                  label="Create Post"
                  LinkComponent={Link}
                  to="/create-post"
                />
              </Tabs>
            </Box>
          )}

          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login">
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register">
                  Register
                </Button>
              </>
            )}

            {isLogin && (
              <Button onClick={handlelogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
