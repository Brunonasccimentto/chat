import { Chat } from "./chat"
import { User } from "./user"

export function Home(){

    const randColor = () => {
         return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    }

    let hex = randColor()
    let hex2 = randColor()

    return(
        <div className=" home d-flex flex-column flex-lg-row justify-content-around gap-5 align-items-center text-black">
            <User/>
            <Chat hex={hex} hex2={hex2} name={name}/>   
        </div>
    )
}