import User from '../models/user.js';
import {Response,Request,NextFunction} from 'express';
import {hash,compare} from 'bcrypt';
import {createToken} from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';
export const getAllusers=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const users=await User.find();
        return res.status(200).json({message:"Ok",users})
    }
    catch(error){
        return res.status(200).json({message:"ERROR",cause:error.message})
    }
}
export const userSignup=async(
    req:Request,
    res:Response,
    next : NextFunction
)=>{
    try{
        const {name,email,password}=req.body;
        const existing_user=await User.findOne({email:email});
        if (existing_user) return  res.status(401).send('User already exists')
        const hashed_password=await hash(password,10);
        const user=new User({name,email,password:hashed_password});
        const token=createToken(user._id.toString(),user.email,'7d');
        const expires=new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});
        console.log(user);  
        await user.save()
        return res.status(200).json({message:"OK",name:user.name,email:user.email});
    }
    catch(error){
        console.log(error);
        throw new Error("Some error");
    }
}
export const userLogin=async(
    req:Request,
    res:Response,
    next : NextFunction
)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if (!user){
            return res.status(401).send('User not registered');
        }
        const isPasswordCorrect=await compare(password,user.password);
        if (!isPasswordCorrect){
            res.status(403).send('Incorrect Password');
        }
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"
        });
        console.log("saohn");
        const token=createToken(user._id.toString(),user.email,'7d');
        const expires=new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});

        return res.status(200).json({message:"OK",name:user.name,email:user.email});
    }
    catch(error){
        console.log(error);
        throw new Error("Some error");
    }
}
export const verifyUser=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user=await User.findById(res.locals.jwtData.id);
        console.log("ris");
        console.log(user)
        if (!user){
            return res.status(401).send("User not register or Token malfunctioned");
        }
        if(user._id.toString()!==res.locals.jwtData.id){
            return res.status(403).send("Permission didnt match");
        }
        return res.status(200).json({message:"OK",name:user.name,email:user.email});
    }
    catch(error){
        console.log(error);
        return res.status(200).json({message:"Error",cause:error.message});
    }   
}
export const userLogout=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user=await User.findById(res.locals.jwtData.id);
        console.log("ris");
        console.log(user)
        if (!user){
            return res.status(401).send("User not register or Token malfunctioned");
        }
        if(user._id.toString()!==res.locals.jwtData.id){
            return res.status(403).send("Permission didnt match");
        }
        console.log("neee abba");
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"
        });
        return res.status(200).json({message:"OK",name:user.name,email:user.email});
    }
    catch(error){
        console.log(error);
        return res.status(200).json({message:"Error",cause:error.message});
    }   
}