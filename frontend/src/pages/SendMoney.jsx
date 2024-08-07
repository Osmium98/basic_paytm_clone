import axios from "axios";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

export function SendMoney() {
    const [amount,setAmount]= useState("");
    const [searchParams] =useSearchParams("");
    const _id = searchParams.get("id");
    const name = searchParams.get("name");
    let inputExist = false;
        return (
        <div className=" flex justify-center h-screen bg-gray-100">
            <div className="h-screen flex flex-col justify-center ">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.6 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0]}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="amount">
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e)=>{
                                    setAmount(e.target.value)
                                }}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                value={amount}
                                placeholder="Enter amount"
                            />
                        </div>
                        <button onClick={async()=>{
                            const token = localStorage.getItem('token');
                            const response = axios.post("http://localhost:3000/api/v1/account/transfer",{
                                amount: amount,
                                to:_id
                            },{
                                headers:{
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                    
                                }
                            })
                            console.log(response);
                            setAmount("")

                        }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate Transfer
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )

}