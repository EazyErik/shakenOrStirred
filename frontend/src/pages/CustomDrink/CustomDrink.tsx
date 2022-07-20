import "./CustomDrink.css"
import {FormEvent, useState} from "react";
import {postCustomDrink} from "../../apiServices/service";


export default function CustomDrink(){

    //todo upload picture
    const[instruction,setInstruction] = useState("")
    const[ingredient, setIngredient] = useState("")
    const[glass, setGlass] = useState("")
    //info to user, that drink is added
    const[userInfo, setUserInfo] = useState("")


    const addCustomDrink = (event:FormEvent) => {
        event.preventDefault()
        postCustomDrink(instruction,ingredient,glass)


    }


    return(
        <div className={"customDrink"}>
            <h3>Show your creations</h3>
            <form onSubmit={addCustomDrink} >
                <div>
                <label>Upload your picture here:</label>
                <img src={""} alt={"super fancy cocktail"}/>
                </div>
                <div>
                <label>Enter your instructions:</label>
                <input type={"text"} placeholder={"how do you prepare your drink?"} onChange={event => setInstruction(event.target.value)} />
                </div>
                <div>
                <label>Enter your ingredients:</label>
                <input type={"text"} placeholder={"what's in it?"} onChange={event => setIngredient(event.target.value)} />
                </div>
                <div>
                <label>Enter your glass :</label>
                <input type={"text"} placeholder={"which glass did you use?"} onChange={event => setGlass(event.target.value)}/>
                </div>
                <button onClick={addCustomDrink}>add</button>

            </form>
        </div>
    )
}