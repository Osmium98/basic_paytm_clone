import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtomWarning } from "../components/ButtomWarning";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <Subheading label={"Enter your information to create an account"} />
                    <Inputbox onChange={(e) => {
                        setFirstname(e.target.value)
                    }} label={"First Name"} placeholder="Subham" />
                    <Inputbox onChange={(e) => {
                        setLastname(e.target.value)
                    }} label={"Last Name"} placeholder="Mallik" />
                    <Inputbox onChange={(e) => {
                        setUsername(e.target.value)
                    }} label={"Email"} placeholder="subham123@gmail.com" />
                    <Inputbox onChange={(e) => {
                        setPassword(e.target.value)
                    }} label={"Password"} placeholder="1234" />
                    <div className="pt-4">
                        <Button onClick={async () => {
                           const response= await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username:username,
                                firstname:firstname,
                                lastname:lastname,
                                password:password
                            });
                            localStorage.setItem("token",response.data.token)
                            navigate("/dashboard")
                            
                        }} label={"Sign up"} />
                    </div>
                    <ButtomWarning label={"Already have an account"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>

        </div>

    )

}