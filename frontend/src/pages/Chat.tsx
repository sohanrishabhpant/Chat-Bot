import {useEffect, useLayoutEffect, useRef,useState} from "react";
import {Box,Avatar, Typography,Button, IconButton}  from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/Authcontext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../components/Helpers/api-communicator";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

type Message={
    role:"user"|"assistant",
    content:string,
}
const Chat=()=>{ 
    const navigate=useNavigate();
    const inputref=useRef<HTMLTextAreaElement|null>(null);
    const auth=useAuth();
    const [chatMessages,setchatMessage]=useState<Message[]>([]);
    const handleDeleteChats=async()=>{
        try{
            toast.loading("Deleting chats",{id:"delete chats"});
            await deleteUserChats();
            setchatMessage([]);
            toast.success("Deleted chats succesfully",{id:"delete chats"});
        }
        catch(error){
            console.log(error);
            toast.error("Deleting chats failed",{id:"delete chats"});
        }

    } 
    const handleSubmit=async()=>{
        const content=inputref.current?.value as string;
        if (inputref&&inputref.current){
            inputref.current.value="";
        }
        const newMessage:Message={role:"user",content};
        setchatMessage((prev)=>[...prev,newMessage]);
        const chatData= await sendChatRequest(content);
        setchatMessage([...chatData.chats]);
    }
    const handlesubmit=async(e)=>{
        if (e.key=="Enter"){
            console.log("sir");
        if (e.shiftKey){
            console.log("ris");
            if (inputref&&inputref.current){
            inputref.current.value+='\n';
            }
        }
        else{
            e.preventDefault();
            await handleSubmit();
            }
            // }
        }
    }
    useLayoutEffect(()=>{
        if (auth?.isLoggedIn&&auth.user){
            toast.loading("Loading Chats",{id:"load chats"});
            getUserChats().then((data)=>{
                setchatMessage([...data.chats]);
                toast.success("Successfully Loaded Chats",{id:"load chats"})
            }).catch((err)=>{
                console.log(err);
                toast.error("Loading failed",{id:"load chats"});
            })
        }
    },[auth]);
    useEffect(()=>{
        if (!auth?.user){
            return navigate('/login');
        }
    },[auth])
    return <Box sx={{display:"flex",flex:1,width:"100%",height:"100%",mt:3,gap:3}}>
        <Box sx={{display:{md:"flex",xs:"none",sm:"none"},flex:0.2,flexDirection:"column"}}>
        <Box sx={{display:"flex",width:"100%",height:"60vh",bgcolor:"rgb(17,29,39)",borderRadius:5,flexDirection:"column",mx:(3)}}>
            <Avatar sx={{mx:"auto",my:(2),bgcolor:"white",color:"black",fontWeight:700}}>
                {auth?.user?.name[0].toUpperCase()}{auth?.user?.name[1].toUpperCase()}

            </Avatar>
            <Typography sx={{mx:"auto",fontFamily:"work sans"}}>
                You are talking to chatBot
            </Typography>
            <Typography sx={{mx:"auto",fontFamily:"work sans",my:4,p:3}}>
                You can ask some questions related to Knowledge,Business,Advices,Education,etc.But avoid sharing personal information
            </Typography>
            <Button onClick={handleDeleteChats} sx={{width:"200px",my:"auto",color:"white",fontWeight:700,mx:"auto",bgcolor:red[300],":hover":{
                bgcolor:red.A400
            }}}>
                Clear Conversation
            </Button>
        </Box>
        </Box>
        <Box sx={{display:"flex",flex:{md:0.8,xs:1,sm:1},flexDirection:"column",px:3}}>
            <Typography sx={{textAlign:"center",fontSize:"40px",color:"white",mb:2,mx:"auto"}}>
            Model- GEMINI
            </Typography>
            <Box sx={{width:"100%",height:"60vh",borderRadius:3,mx:"auto",display:"flex",flexDirection:"column",overflow:"scroll",overflowX:"hidden",scrollBehavior:"smooth",overflowY:"auto"}}>
            {chatMessages.map((chat,index)=>(<ChatItem content={chat.content} role={chat.role} key={index} />))} 
            </Box>
            <div style={{width:"100%",padding:"20px",borderRadius:8,backgroundColor:"rgb(17,29,39)",display:"flex",margin:"auto"}}>
            <textarea  ref={inputref}  style={{width:"100%",backgroundColor:"transparent",border:"none",outline:"none",color:"white",fontSize:"20px"}} onKeyDown={handlesubmit}/>
            <IconButton sx={{ml:"auto",color:"white"}} onClick={handleSubmit} >
            <IoMdSend />
            </IconButton>
            </div>
        </Box>
    </Box>
}

export default Chat;