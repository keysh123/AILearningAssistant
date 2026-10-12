import jwt from 'jsonwebtoken'
import User from '../models/user'
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET , {
        expiresIn : "7d"
    })
}

export const register = async (req,res,next) => {
    try{
        const {username, email,password} = req.body
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({success : false , message : 'User already exists'})
        }
        const user = await User.create({
            username,
            email,
            password
        })
        const token = generateToken(user._id)
        res.status(201).json({user , message : 'user created successfully',token})
    }
    catch(e){
        next(e)
    }
}
export const login = async(req,res,next) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({success : false , message : 'Please provide email and password'})
        }
        const user = await User.findOne({email}).select('+password')
        if(!user){
            return res.status(401).json({success : false , message : 'Invalid email or password'})
        }
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            return res.status(401).json({success : false , message : 'Invalid email or password'})
        }
        const token = generateToken(user._id)
        res.status(200).json({success : true,user , message : 'Login successful',token})

    }
    catch(e){
        next(e)
    }
}
export const getProfile = async(req,res,next) => {
    try{
        const user = await User.findById(req.user._id);
        res.status(200).json({success : true , user})

    }
    catch(e){
        next(e)
    }
}
export const updateProfile = async(req,res,next) => {
    try{
        const {username,email,profileImage} = req.body;
        const user = await User.findById(req.user._id);

        if(user.username){user.username = username}
        if(user.email){user.email = email}
        if(user.profileImage){user.profileImage = profileImage}
        await user.save();
        res.status(200).json({success : true,user ,message : "User updated successfully"})

    }
    catch(e){
        next(e)
    }
}
export const changePassword = async(req,res,next) => {
    try{
        const {currrentPassword,newPassword} = req.body;
        if(!currrentPassword || !newPassword){
          return res.status(400).json({success : false , message : "Please provide Current and new password"})
        }
        const user = await User.findById(req.user._id).select("+password");
        const isMatch = await user.matchPassword(currrentPassword);
        if(!isMatch){
           return res.status(401).json({success: false , message : "Current password is incorrect"})
        }
        user.password=newPassword;
        await user.save();
        res.status(200).json({success : true,message:"Password updated successfully"})

    }
    catch(e){
        next(e)
    }
}