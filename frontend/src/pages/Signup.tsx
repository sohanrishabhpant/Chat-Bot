import { Box,Typography,Button } from "@mui/material";
import CustomisedInput from "../components/shared/CustomisedInput";
import { IoIosLogIn } from "react-icons/io";
import React from "react"
import { useAuth } from "../context/Authcontext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Signup=()=>{
    const auth=useAuth();
    const navigate=useNavigate();
    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData=new FormData(e.currentTarget);
        const name=formData.get("name") as string;
        const email=formData.get("email") as string;
        const password=formData.get("password") as string;
        try{
            toast.loading("Signing Up",{id:"Signup"});
            await auth?.signup(name,email,password);
            toast.success("Signed Up successfully",{id:"Signup"});
        }
        catch(error){
            console.log(error);
           toast.error("Signing Up Failed",{id:"Signup"});
        }
    }
   useEffect(()=>{
    if (auth?.user){
        return navigate("/chat");
    }
   },[auth]);
    return <Box width={'100%'} height={'100%'} display="flex" flex={1}>
        <Box padding={8} mt={8} display={{md:"flex",xs:"none",sm:"none"}}>
            <img src="airobot.png" alt="Robot" style={{width:"400px"}}></img>
        </Box>
        <Box display={"flex"} flex={{xs:1,sm:0.5}} justifyContent={'center'} alignItems={'center'} ml={'auto'}
        mt={16}>
            <form onSubmit={handleSubmit}style={{margin:"auto",padding:"30px",boxShadow:"10px 10px 20px #000",borderRadius:"10px",
                border:"none"
            }}>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>Signup</Typography>
                <CustomisedInput type="name" name="name" label="Name"/>
                <CustomisedInput type="email" name="email" label="Email"/>
                <CustomisedInput type="password" name="password" label="Password" />
            <Button type="Submit" sx={{px:2,py:1,mt:2,width:"400px",borderRadius:2,
            bgcolor:"#00fffc",
                    ":hover":{
                        bgcolor:"white",
                        color:"black"
                    },
            }} endIcon={<IoIosLogIn />}
            >Signup</Button>
             </Box>
            </form>
        </Box>

    </Box>
}
export default Signup;