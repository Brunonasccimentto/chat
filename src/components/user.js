import { CustomButton } from "./button"

export function User({setName}){

    function newUser(e){
       e.preventDefault()

       let user = document.forms[0].elements[0]      
       localStorage.setItem("user", user.value)

       if(user.value !== ""){
            document.getElementsByClassName("userForm")[0].classList.add("d-none")
       } else {
            return
       }
       

    }

    return(
        <form className=" userForm justify-content-center d-flex flex-column gap-4 align-items-center">
            <h2>Chat</h2>
            <input id="username" name="username" className=" user " placeholder="Defina seu nome de usuário" required ></input>
            <span onClick={newUser} className="border-0" type={"submit"}> <CustomButton color={"primary"} text={"Definir nome"}/> </span>
        </form>
    )
}