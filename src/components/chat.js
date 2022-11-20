import { useEffect, useState } from "react"
import { FiSend} from "react-icons/fi"
import io from "socket.io-client"
import Emoji from "emoji-picker-react"
import {BsEmojiSmile} from "react-icons/bs"

const socket = io.connect("http://localhost:3001")

export function Chat({hex, name, hex2}){

    const [message, setMessage] = useState()
    const [chat, setChat] = useState()
    const [emoji, setEmoji] = useState("")
    const [lenght, setLenght] = useState()

    const USER = localStorage.getItem("user")
    const date = new Date().toLocaleTimeString().slice(0,5)

    function sendMessage(e){
        e.preventDefault()
        if(!USER){
          return alert("defina um nome de usuário")
        }    

        if(document.getElementsByClassName("messages")[0].value = ""){
            
        } 
        socket.emit("new_message", { msg: message, name: USER, time: date})
        document.getElementsByClassName("messages")[0].value = ""
    }

    useEffect(()=>{

        socket.on("update_messages", (messages)=>{

            localStorage.setItem("chat", JSON.stringify(messages))

            const chat = (JSON.parse(localStorage.getItem("chat")))

            console.log(chat)

            const list = chat.map((d, index) => {
                
                           return( <>
                            <h5 key={d.name}> {d.name} </h5>
                            <div className=" d-flex justify-content-end"> 
                            <li key={index}>
                               <span> {d.msg} </span>  
                               <span className=" time"> {d.time} </span>
                            </li>   
                            </div>
                            
                             </>)
                                 
            })  
            setChat(list)
            setLenght(chat.length)

            let username = document.querySelectorAll("h5")

            username.forEach(element =>{
            if(USER !== element.innerText){

                element.style.color = hex
                element.style.justifyContent = "start" 
                element.nextSibling.classList.remove("justify-content-end") 
                element.nextSibling.children[0].style.marginLeft = "25px" 
                element.nextSibling.children[0].style.borderTopRightRadius = "20px" 
                element.nextSibling.children[0].style.borderTopLeftRadius = "0px"
  
            } else {
                element.style.color = hex2
                element.style.justifyContent = "end"
                element.nextSibling.style.justifyContent = "end"
            }    
        }) 

        })       
    }, [socket])

    useEffect(()=>{

        let username = document.querySelectorAll("h5")

        username.forEach(element =>{
        if(USER !== element.innerText){
    
            element.style.color = hex
            element.style.justifyContent = "start" 
            element.nextSibling.classList.remove("justify-content-end") 
            element.nextSibling.children[0].style.marginLeft = "25px" 
            element.nextSibling.children[0].style.borderTopRightRadius = "20px" 
            element.nextSibling.children[0].style.borderTopLeftRadius = "0px"
    
        } else {
            element.style.color = hex2
            element.style.justifyContent = "end"
            element.nextSibling.style.justifyContent = "end"
            element.nextSibling.children[0].style.borderTopRightRadius = "0"
            element.nextSibling.children[0].style.borderTopLeftRadius = "20px"
        }    
    })    

    }, [lenght])

    // setTimeout(()=>{
       
    // }, [0.5])

   
    function pickemoji(){
        let emoji = document.getElementsByClassName("setEmoji")[0]
        emoji.classList.toggle("d-none")
    }

    useEffect(()=>{

        if(emoji != ""){
            document.getElementsByClassName("messages")[0].value += emoji
        }

    },[emoji])

    return(
        <div className=" userChat d-flex p-1 border border-3 border-dark rounded-4 gap-4 flex-column justify-content-between" >
            <div className="contentMessage p-1 gap-3 d-flex flex-column h-100 list-unstyled bg-white overflow-auto"> 
                {chat}
            </div>

            <form className=" d-flex  flex-column justify-content-center align-items-center">
                
                <div className="d-flex w-100 justify-content-center justify-content-lg-between align-items-center">
                <span onClick={pickemoji} className=" emoji h4 d-none d-lg-block "> <BsEmojiSmile /> </span>
                <input className=" messages rounded-pill border-3 border" placeholder="escreva uma mensagem..." onChange={(e)=> {setMessage(e.target.value)}}></input>
                <button className=" d-none d-lg-block rounded-3 border border-1 border-light p-2 border-0 bg-success" onClick={sendMessage}><FiSend style={{color: "white"}}/></button>
                </div>
                
                <span className="setEmoji d-none w-100"> <Emoji width="100%" height="300px" emojiStyle="google" searchDisabled={true} onEmojiClick={(e)=>{ setEmoji(e.emoji)}}/> </span>
            </form>
        
        </div>
    )
}