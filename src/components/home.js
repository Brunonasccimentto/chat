import { useState } from "react";
import { Chat } from "./chat"
import { User } from "./user"

export function Home(){

    const [name,setName] = useState()

    const randColor = () => {
        return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
   }

    let hex = randColor()
    let hex2 = randColor()

    return(
        <div className=" home d-flex flex-column flex-lg-row justify-content-around gap-5 align-items-center text-black">
            <User setName={setName}/>
            <Chat name={name}/>   
        </div>
    )
}