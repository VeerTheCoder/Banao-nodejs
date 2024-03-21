const express = require('express');
const { getAllUsers, registerController, loginController, ForgotPassword, ResetPassword } = require('../controllers/userController');

const router=express.Router();

router.get('/get-users/:token',getAllUsers);

router.post('/register',registerController);

router.post('/login',loginController);

router.post("/forgot-password",ForgotPassword)

router.post('/reset-password/:id/:token',ResetPassword)

module.exports=router;