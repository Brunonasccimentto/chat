import { useEffect, useState } from "react"
import { FiSend} from "react-icons/fi"
import io from "socket.io-client"
import Emoji from "emoji-picker-react"
import {BsEmojiSmile} from "react-icons/bs"

const socket = io.connect("https://chat-server-back.herokuapp.com/") //https://chat-server-back.herokuapp.com/

export function Chat({name}){

    const [message, setMessage] = useState()
    const [chat, setChat] = useState()
    const [emoji, setEmoji] = useState("")
    const [lenght, setLenght] = useState()

    const date = new Date().toLocaleTimeString().slice(0,5)

    function sendMessage(e){
        e.preventDefault()
        if(!name){
          return alert("defina um nome de usuário")
        }    

        if(document.getElementsByClassName("messages")[0].value = ""){
            
        } 
        socket.emit("new_message", { msg: message, name: name, time: date})
        document.getElementsByClassName("messages")[0].value = ""
    }

    function compareNames(){
        let username = document.querySelectorAll("h5")

        username.forEach(element => {
            if (name !== element.innerText) {

                element.classList.add("justify-content-start")
                element.classList.remove("justify-content-start")
                element.nextSibling.classList.remove("justify-content-end")
                element.nextSibling.children[0].style.marginLeft = "25px"
                element.nextSibling.children[0].style.borderTopRightRadius = "20px"
                element.nextSibling.children[0].style.borderTopLeftRadius = "0px"
                element.nextSibling.children[0].classList.add("bg-primary")
                element.nextSibling.children[0].classList.add("text-light")

            } else {

                element.classList.add("justify-content-end")
                element.nextSibling.classList.add("justify-content-end")
                element.nextSibling.children[0].style.marginLeft = "25px"
                element.nextSibling.children[0].style.borderTopRightRadius = "0"
                element.nextSibling.children[0].style.borderTopLeftRadius = "20px"
                element.nextSibling.children[0].classList.remove("bg-primary")
                element.nextSibling.children[0].classList.remove("text-light")
            }
        })
    }

    async function attChat(){
        
      await socket.on("update_messages", (messages)=>{

            localStorage.setItem("chat", JSON.stringify(messages))

            const chat = (JSON.parse(localStorage.getItem("chat")))

            const list = chat.map((d, index) => {
                
                           return( <>
                            <h5 key={d.name}> {d.name} </h5>
                            <div className=" d-flex"> 
                            <li key={index} className="">
                               <span> {d.msg} </span>  
                               <span className=" time"> {d.time} </span>
                            </li>   
                            </div>
                            
                             </>)
                                 
            })  
            setChat(list)
            setLenght(chat.length)

        })       
    }

    useEffect(()=>{
        //update every message
       attChat()
       compareNames()
    }, [lenght])

    useEffect(() => {
        //first render chat
        let chat = JSON.parse(localStorage.getItem("chat"))

        let list = chat.map((d, index) => {
            return (<>
                <h5 key={d.name}> {d.name} </h5>
                <div className=" d-flex">
                    <li key={index} className="">
                        <span> {d.msg} </span>
                        <span className=" time"> {d.time} </span>
                    </li>
                </div>

            </>)

        })
        setChat(list)

        compareNames()
    }, [localStorage.getItem("user")])
   
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
                <span onClick={pickemoji} className=" text  emoji h4 d-none d-lg-block "> <BsEmojiSmile /> </span>
                <input className=" messages rounded-pill border-3 border" placeholder="escreva uma mensagem..." onChange={(e)=> {setMessage(e.target.value)}}></input>
                <button className=" d-none d-lg-block rounded-circle border border-light p-2 bg-primary" onClick={sendMessage}><FiSend style={{color: "white"}}/></button>
                </div>
                
                <span className="setEmoji d-none w-100"> <Emoji width="100%" height="300px" emojiStyle="google" searchDisabled={true} onEmojiClick={(e)=>{ setEmoji(e.emoji)}}/> </span>
            </form>
        
        </div>
    )
}