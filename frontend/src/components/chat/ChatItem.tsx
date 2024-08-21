import { Box,Avatar, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/Authcontext";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {coldarkCold} from "react-syntax-highlighter/dist/esm/styles/prism";
function extractCodeFromString(message:string){
    if(message.includes("```")){
        const blocks=message.split("```");
        return blocks;
    }
    if (message.includes("**")){
        const keyPoints = message.split("**");
        const formattedKeyPoints = keyPoints.filter(part => part.trim().length > 0).map(part => part.trim());
        return formattedKeyPoints;
    
    }
}
function isCodeblock(str:string){
    if (str.includes("=")||str.includes(";")||str.includes("[")||str.includes("]")||str.includes("{")||str.includes("}")||str.includes("//")){
    return true;
    }
    return false;
}
const ChatItem=({content,role}:{content:string,role:"user"|"assistant"})=>{
    const messageBlocks=extractCodeFromString(content);
    const auth=useAuth()
    return role!=="assistant"?(<Box sx={{display:"flex",p:2,bgcolor:"#004d56",
    gap:2,my:2
    }}>
        <Avatar sx={{ml:"0",bgcolor:"black",color:"white"}}>
       {auth?.user?.name[0].toUpperCase()}{auth?.user?.name[1].toUpperCase()}
        </Avatar>
        <Box>
                {!messageBlocks&&(<Typography sx={{fontSize:"20px"}}>{content}</Typography>)}
                {messageBlocks&&messageBlocks.length&&messageBlocks.map((block)=>isCodeblock(block)?(<SyntaxHighlighter style={coldarkCold} language="javascript">{block}</SyntaxHighlighter>):(<Typography sx={{fontSize:"20px"}}>{block}</Typography>))}
        </Box>
    </Box>):(
        <Box sx={{display:"flex",p:2,bgcolor:"#004d5612",my:2,
        gap:2
        }}>
            <Avatar sx={{ml:"0",}}>
            <img src="openai.png" alt="openai" width="30px"></img>
            </Avatar>
            <Box>
                {!messageBlocks&&(<Typography sx={{fontSize:"20px"}}>{content}</Typography>)}
                {messageBlocks&&messageBlocks.length&&messageBlocks.map((block)=>isCodeblock(block)?(<SyntaxHighlighter style={coldarkCold} language="javascript">{block}</SyntaxHighlighter>):(<Typography sx={{fontSize:"20px"}}>{block}</Typography>))}
            </Box>
        </Box>
    )
}
export default ChatItem;