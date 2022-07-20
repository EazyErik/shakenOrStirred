import "./CustomDrink.css"
import {FormEvent, useState} from "react";
import {postCustomDrink, sendPicture} from "../../apiServices/service";


export default function CustomDrink(){

    //todo upload picture
    const[instruction,setInstruction] = useState("")
    const[ingredient, setIngredient] = useState("")
    const[glass, setGlass] = useState("")
    const[image,setImage] = useState({} as File)
    const[url,setUrl] = useState("")



    //info to user, that drink is added
    const[userInfo, setUserInfo] = useState("")


    const addCustomDrink = (event:FormEvent) => {
        event.preventDefault()
        handleUpload()
        postCustomDrink(instruction,ingredient,glass,url)



    }



    const handleUpload = () => {
        const formData = new FormData()
        formData.append("file",image)
        formData.append("upload_preset","customDrink")
        sendPicture(formData)
            .then((data) => {setUrl(data.secure_url)
            console.log(data.secure_url)})




    }


    return(
        <div className={"customDrink"}>
            <h3>Add your own creations:</h3>
            <form onSubmit={addCustomDrink} >
                <div>
                <label>Upload your picture here:</label>
                    <input type={"file"} accept={"image/*"} onChange={event => {
                        if(event.target.files !== null){
                            setImage(event.target.files[0])}}
                        }/>
                </div>
                <div>
                <label>Enter your instructions:</label>
                <input type={"text"} onChange={event => setInstruction(event.target.value)} />
                </div>
                <div>
                <label>Enter your ingredients:</label>
                <input type={"text"} onChange={event => setIngredient(event.target.value)} />
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