import "./CustomDrink.css"
import {FormEvent, useState} from "react";
import {postCustomDrink, sendPicture} from "../../apiServices/service";
import {CustomIngredientModel} from "../../components/Model";


export default function CustomDrink(){


    const[instruction,setInstruction] = useState("")
    const[ingredient, setIngredient] = useState("")
    const[amount,setAmount] = useState("")
    const[unit, setUnit] = useState("")
    const[glass, setGlass] = useState("")
    const[image,setImage] = useState({} as File)
    const[url,setUrl] = useState("")
    const[name, setName] = useState("")



    //todo info to user, that drink is added
    const[userInfo, setUserInfo] = useState("")


    const addCustomDrink = (event:FormEvent) => {
        event.preventDefault()
        handleUpload()
        postCustomDrink(instruction,unit,amount,ingredient,glass,url,name)



    }

    const handleUpload = () => {
        const formData = new FormData()
        formData.append("file",image)
        formData.append("upload_preset","customDrink")
        sendPicture(formData)
            .then((data) => {setUrl(data.secure_url)
            console.log(data.secure_url)})

    }


    return (
        <div className={"customDrink"}>
            <h3>Add your own creations:</h3>
            <form onSubmit={addCustomDrink}>
                <div>
                <label>Enter the name of your drink:</label>

                    <input type={"text"} onChange={event => setName(event.target.value)}/>
                </div>

                <div>
                    <label>Upload your picture here:</label>
                    <input type={"file"} accept={"image/*"} onChange={event => {
                        if (event.target.files !== null) {
                            setImage(event.target.files[0])
                        }
                    }
                    }/>
                </div>
                <div>
                    <label>Enter your instructions:</label>
                    <input type={"text"} onChange={event => setInstruction(event.target.value)}/>
                </div>
                <div>
                    <label>Enter the amount of your ingredient:</label>
                    <input type={"number"} onChange={event => setAmount(event.target.value)}/>
                </div>
                <div>
                    <label>Enter the unit of your ingredient:</label>
                    <input type={"text"} onChange={event => setUnit(event.target.value)}/>
                </div>
                <div>
                    <label>Enter the name of your ingredient:</label>
                    <input type={"text"} onChange={event => setIngredient(event.target.value)}/>
                </div>
                <div>
                    <label>Enter your glass :</label>
                    <input type={"text"} onChange={event => setGlass(event.target.value)}/>
                </div>
                {image && instruction && ingredient && glass &&
                    <button type={"submit"}>add</button>}

            </form>
        </div>
    )
}