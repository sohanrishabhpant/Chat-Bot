// import { NextFunction,Request,Response } from "express";
import {Configuration} from "openai";


export const configureOpenAI=()=>{
    const config=new Configuration({
        apiKey:process.env.OPEN_AI_SECRET,
        organization:process.env.OPENAI_ORGANISATION_ID,
})
return config;
}