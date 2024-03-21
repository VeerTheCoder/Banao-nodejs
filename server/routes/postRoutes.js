const express=require('express');
const { getAllPostController, createPostController, updatePostController, getPostByIdController, deletePostController } = require('../controllers/postController');

const router=express.Router();

router.get('/all-post',getAllPostController);

router.post('/create-post/:token',createPostController);

router.put('/update-post/:id/:token',updatePostController);

router.get('/get-post/:id/:token',getPostByIdController);

router.delete('/delete-post/:id/:token',deletePostController);

module.exports =router;