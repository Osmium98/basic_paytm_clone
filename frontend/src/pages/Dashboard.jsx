import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard(){
    const [balance,setBalance] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                // Retrieve the token from local storage
                const token = localStorage.getItem('token');

                // Ensure the token exists
                if (!token) {
                    throw new Error("No token found");
                }

                // Make an API request with the token in the Authorization header
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log("Response:", response);
                setBalance(response.data.balance);
            } catch (error) {
                console.error("There was an error fetching the balance!", error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    )
    
}