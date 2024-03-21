const { default: mongoose } = require("mongoose");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const jwt=require("jsonwebtoken")

exports.getAllPostController = async (req, resp) => {
  try {
    const post = await postModel.find({}).populate("user");
    if (!post) {
      return resp.status(200).send({
        message: "No post Exists",
        success: false,
      });
    }
    return resp.status(200).send({
      message: "The posts list are",
      success: true,
      postCount: post.length,
      post,
    });
  } catch (error) {
    return resp.status(500).send({
      message: "Error while get all post",
      success: false,
      error,
    });
  }
};

exports.createPostController = async (req, resp) => {
  try {
    const { title, description, image, user } = req.body;
    const {token} = req.params;

    
    if (!token) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
    jwt.verify(token, "veersecretkey", async (err, decoded) => {
      if (err) {
        return resp.status(401).send({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      } else {
        const userId = decoded.userId;

       
        if (!title || !description || !image) {
          return resp.status(400).send({
            success: false,
            message: "Please provide all fields",
          });
        }

       
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
          return resp.status(400).send({
            success: false,
            message: "Unable to find user",
          });
        }

        
        const postData = new postModel({ title, description, image, user: userId });
        await postData.save();

        return resp.status(200).send({
          message: "Post Created Successfully",
          success: true,
          postData,
        });
      }
    });
  } catch (error) {
    return resp.status(400).send({
      success: false,
      message: "Error while creating post",
      error,
    });
  }
};

exports.updatePostController = async (req, resp) => {
  try {
    const { id,token } = req.params;
    
    
    if (!token) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

 
    jwt.verify(token, "veersecretkey", async (err, decoded) => {
      if (err) {
        return resp.status(401).send({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      } else {
        
        const post = await postModel.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );

        if (!post) {
          return resp.status(404).send({
            message: "Post not found",
            success: false,
          });
        }

        return resp.status(200).send({
          message: "Post Updated",
          success: true,
          post,
        });
      }
    });
  } catch (error) {
    return resp.status(500).send({
      message: "Error while updating post",
      success: false,
      error,
    });
  }
};

exports.getPostByIdController = async (req, resp) => {
  try {
    const { id,token } = req.params;
    
    
    if (!token) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    
    jwt.verify(token, "veersecretkey", async (err, decoded) => {
      if (err) {
        return resp.status(401).send({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      } else {
        
        const post = await postModel.findById(id);
        if (!post) {
          return resp.status(404).send({
            message: "Post not found",
            success: false,
          });
        }

        return resp.status(200).send({
          message: "Post found",
          success: true,
          post,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      message: "Error while getting post",
      success: false,
      error,
    });
  }
};

exports.deletePostController = async (req, resp) => {
  try {
    const { id,token } = req.params;

    
    if (!token) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    
    jwt.verify(token, "veersecretkey", async (err, decoded) => {
      if (err) {
        return resp.status(401).send({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      } else {
        
        const post = await postModel.findByIdAndDelete(id).populate("user");
        if (!post) {
          return resp.status(404).send({
            message: "Post does not exist",
            success: false,
          });
        }

        
        await post.user.posts.pull(post);
        await post.user.save();

        return resp.status(200).send({
          message: "Deleted Successfully",
          success: true,
          post,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      message: "Error while deleting post",
      success: false,
      error,
    });
  }
};
