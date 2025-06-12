'use client'
import { useEffect, useState } from "react";
const User = () => {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/register");
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);
        }
        fetchData();
    }, []);
    
    if (data.length == 0) return <p> There are no users yet </p>

    return (
        <div>
            {data.map((user: any) => (
                <strong key={user.id}> {user.name} </strong>
            ))}
        </div>
    );
}

export default User;

