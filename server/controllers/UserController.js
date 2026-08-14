const bcrypt =require("bcryptjs")
const User=require("../models/User")
const jwt=require("jsonwebtoken")
const fs=require("fs")
const { log } = require("console")

class Usercontroller{
    static register=async(req,res)=>{
        try{
            const {name,email,password,phone}=req.body

            if(!name||!email||!password||!phone){
             return res.status(400).json({message:"all fields are required"})
            }

            const user= await User.findOne({email})
            if(user){
                return res.status(400).json({message:"email already exist"})
            }

            const hashPassword= await bcrypt.hash(password, 10)
            const Result=await User.create({
                name,email,password: hashPassword,phone
            })
            await Result.save()

            res.status(201).json({
                success: true,
                message: "register sucessfully"
            })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "internal error occured"
            })
            
        }
    }

    static login=async (req,res)=>{
        try{
            const { email, password } = req.body;
            //console.log(req.body)
            //console.log("1")

            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
            //console.log("2")

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
            //console.log("3")

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(401).json({
                    success: false,
                    message:"password is incorrect"
                })
            }
             //console.log("4")

            const token=jwt.sign({id: user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"})
            res.cookie("token", token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 1000,
            })
             //console.log("5")

            res.status(200).json({
                success: true,
                message:"login successfully",
                id:user._id,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }
            })
        }catch(error){
            console.error(error);
            res.status(500).json({
                success: false,
                message: "internal error occured"
            })
        }
    }

    static getprofile=async(req,res)=>{
        try{
            const user= await User.findById(req.user.id).select("-password")
            res.status(200).json({
                success: true,
                message:"got profile", user
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }

    static logout=async(req,res)=>{
        try{
            res.clearCookie('token')
            res.status(200).json({
                success:true,
                message:"logout succesfully"
            })
        }catch(error){
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Internal server error"
            })
            
        }
    }

    static updateProfile=async(req,res)=>{
        try{
            const {id}=req.params
            const{name,email,phone}=req.body

            const profile=await User.findByIdAndUpdate(id,{name,email,phone},{new: true})
            if(!profile){
                return res.status(404).json({
                    success:false,
                    message:"No user found"
                })
            }

            res.status(200).json({
                success: true,
                message:"profile updated successfully", profile
            })
        }catch(error){
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Internal error occurred"
            })
            
        }
    }

    static changePassword=async(req,res)=>{
        try{
            //console.log("BODY RECIEVE:", req.body)
            const {oldPassword,newPassword}=req.body
            const id=req.user.id

            const user=await User.findById(id)
            if(!user){
                return res.status(404).json({
                    success: false,
                    message:"user not found"
                })
            }

            const isPasswordValid=await bcrypt.compare(oldPassword, user.password)
            if(!isPasswordValid){
                return res.status(400).json({
                    success:false,
                    message:"invalid old password"
                })
            }

            const salt=await bcrypt.genSalt(10)
            const hashedPassword= await bcrypt.hash(newPassword, salt)

            user.password=hashedPassword
            await user.save()
            res.status(200).json({
                success:true,
                message:"password changed"
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                success:false,
                message:"error occurred"
            })
        }
    }

}

module.exports=Usercontroller