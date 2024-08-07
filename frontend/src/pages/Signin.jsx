import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtomWarning } from "../components/ButtomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

 export function Signin(){
    const [username,setUsername] = useState("");
    const [password,setPassword] =useState("");
    const navigate = useNavigate();
    return (
         <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <Subheading label={"Enter your credentials to access your account"} />
                    <Inputbox onChange={(e)=>{
                        setUsername(e.target.value)
                    }} label={"Email"} placeholder={"subham123@gmail.com"} />
                    <Inputbox onChange={(e)=>{
                        setPassword(e.target.value)
                    }} label={"Password"} placeholder={"123456"} />
                    <div className="pt-4">
                        <Button onClick={async()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                                username,
                                password
                            });
                            localStorage.setItem("token",response.data.token);
                            navigate("/dashboard")
                        }} label={"Sign in"} />

                    </div>
                    <ButtomWarning label={"Doesn't have an account?"} to={"/signup"} buttonText={"Sign up"} />
                </div>
            </div>
         </div>
    )
    
 }