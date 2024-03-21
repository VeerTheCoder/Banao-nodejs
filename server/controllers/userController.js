const userModel=require("../models/userModel");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken")

exports.getAllUsers=async(req,resp)=>{
    try {
        
        const {token} = req.params;
        if (!token) {
            return resp.status(401).send({
                message: "Unauthorized: No token provided",
                success: false
            });
        }

        jwt.verify(token, "veersecretkey", async (err, decoded) => {
            if (err) {
                return resp.status(401).send({
                    message: "Unauthorized: Invalid token",
                    success: false
                });
            } else {
                
                const user = await userModel.find({});
                return resp.status(200).send({
                    userCount: user.length,
                    message: "Users are",
                    success: true,
                    user
                });
            }
        });
    } catch (error) {
        return resp.status(500).send({
            message: "Error in Get All User",
            success: false
        });
    }
};

exports.registerController = async(req,resp) =>{
    try {
        const {username,email,password}= req.body;
        if(!username || !email || !password){
            return resp.status(400).send({
                success:false,
                message:"Every Field is required"
            });
        }
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return resp.status(401).send({
                success:false,
                message:"User already exist",
                error
            })
        }
        else{
            const hashPassword=await bcrypt.hash(password,10);    
            const user=new userModel({username,email,password:hashPassword});
            await user.save();

            const token = jwt.sign({ userId: user._id }, "veersecretkey", { expiresIn: '1h' });
            return resp.status(201).send({
                message:"User Created Successfully",
                success:true,
                user,
                token
            })
        }
        
    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success:false,
            message:"User not Created",
            error
        });
    }
};

exports.loginController =async(req,resp)=>{
    try {
        const {username,password}=req.body;
        if(!username && !password){
            return resp.status(400).send({
                message:"Can't leave any field empty",
                success:false
            });
        }
        const userExist=await userModel.findOne({username});
        if(!userExist){
            return resp.status(200).send({
                message:"User Not exist",
                success:false
            })
        }
        const matchPassword=await bcrypt.compare(password,userExist.password);
        if(!matchPassword){
            return resp.status(401).send({
                message:"Invalid User or Password",
                success:false
            })
        }

        const token = jwt.sign({ userId: userExist._id }, "veersecretkey" , { expiresIn: '1h' });

        return resp.status(200).send({
            message:"Login Successful",
            success:true,
            userExist,
            token
        })

    } catch (error) {
        return resp.status(500).send({
            message:"Error at Login",
            success:false
        })
    }
};



exports.ForgotPassword=async(req,resp)=>{
    const {email}=req.body
    const user=await User.findOne({email:email})
    if(!user){
        return resp.status(400).send({
            message:"User not exist"
        })
    }
    const token=jwt.sign({id:user._id},"veersecretkey",{expiresIn:"1d"})
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'veerbahadur9123@gmail.com',
          pass: 'rcvc ryfl phdv fjhq'
        }
      });
      
      var mailOptions = {
        from: 'veerbahadur9123@gmail.com',
        to: email,
        subject: 'Reset password',
        text: `http://localhost:5173/reset-password/${user._id}/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            return resp.send({Status:"Success"})
        }
      });

    }


exports.ResetPassword=(req,resp)=>{
        const {id,token}=req.params;
        const {password}=req.body;
        jwt.verify(token,"veersecretkey",async(err,decoded)=>{
            if(err){
                return resp.json({Status:"Error with token"})
            }
            else{
               const hash=await bcrypt.hash(password,10);
               const passupdate=await User.findByIdAndUpdate({_id:id},{password:hash})
               resp.send({Status:"Success"})
            }
        })
    }