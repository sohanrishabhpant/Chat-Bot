import { createContext, useEffect, useState,ReactNode,useContext } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../components/Helpers/api-communicator";


type User={
    name:string,
    email:string,
}
type UserAuth={
    isLoggedIn:boolean,
    user:User |null,
    login:(email:string,password:string)=>Promise<void>;
    signup:(name:string,email:string,password:string)=>Promise<void>;
    logout:(name:string,email:string,password:string)=>Promise<void>;
}
const Authcontext=createContext<UserAuth|null>(null);
export const AuthProvider=({ children }:{children:ReactNode})=>{
const [user,setUser]=useState<User|null>(null);
const [isLoggedIn,setisLoggedIn]=useState(false);
useEffect(()=>{
    // fetch if users cookies are valid then skip login
    async function checkstatus() {
    const data=await checkAuthStatus();
    if (data){
        setUser({email:data.email,name:data.name});
        setisLoggedIn(true);
    }
}
    checkstatus();
},[]);
const login=async(email:string,password:string)=>{
    const data=await loginUser(email,password);
    if (data){
        setUser({email:data.email,name:data.name});
        setisLoggedIn(true);
    }
};
const signup=async(name:string,email:string,password:string)=>{
    const data=await signupUser(name,email,password);
    if (data){
        setUser({email:data.email,name:data.name});
        setisLoggedIn(true);
    }
}
const logout=async()=>{
    await logoutUser();
    setisLoggedIn(false);
    setUser(null);
    window.location.reload();
};
const value={
    user,
    isLoggedIn,
    login,
    logout,
    signup
}
return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>
};
export const useAuth=()=>{
    return useContext(Authcontext)
}
