import "./CustomDrink.css"
import {FormEvent, useState} from "react";
import {postCustomDrink, sendPicture} from "../apiServices/service";
import {CustomIngredientModel} from "../components/Model";
import {useNavigate} from "react-router-dom";


export default function CustomDrink(){


    const[instruction,setInstruction] = useState("")
    const[ingredients, setIngredients] = useState<CustomIngredientModel[]>([])
    const[ingredientName,setIngredientName] = useState("")
    const[amount,setAmount] = useState(0)
    const[unit, setUnit] = useState("")
    const[glass, setGlass] = useState("")
    const[image,setImage] = useState({} as File)
    const[cocktailName, setCocktailName] = useState("")
    const nav = useNavigate()



    const addCustomDrink = (event:FormEvent) => {
        event.preventDefault()
        handleUpload()



    }

    const handleUpload = () => {
        const formData = new FormData()
        formData.append("file",image)
        formData.append("upload_preset","customDrink")
        sendPicture(formData)
            .then((data) => {
                const currentDrink =  {
                    customDrinkName:cocktailName,
                    customDrinkURL:data.secure_url,
                    customIngredients:ingredients,
                    customInstruction:instruction,
                    customGlass:glass

                }
                postCustomDrink(currentDrink)
                    .then(()=> {
                        setCocktailName("")
                        setImage({} as File)
                        setInstruction("")
                        setAmount(0)
                        setUnit("")
                        setIngredientName("")
                        setGlass("")
                        alert("Your drink has just been added!")
                    })
                    .catch(()=> {localStorage.removeItem("jwt")
                    nav("/")})

          })
    }

    const composeIngredient = () => {
        const newIngredient = {
            customUnit:unit,
            customAmount:amount,
            customIngredientName:ingredientName
        }
        setIngredients((current)=> [...current,newIngredient])
        setAmount(0)
        setUnit("")
        setIngredientName("")

    }
const disabledButton = (cocktailName !== "" && instruction !== ""  && glass !== "")

    return (
        <div className={"customDrink"}>
            <h3>Add your own creations:</h3>

                <div>
                <label>Enter the name of your drink:</label>

                    <input type={"text"} value={cocktailName} onChange={event => setCocktailName(event.target.value)}/>
                </div>

                <div>
                    <label>Upload your picture here:</label>
                    <input type={"file"}  accept={"image/*"} onChange={event => {
                        if (event.target.files !== null) {
                            setImage(event.target.files[0])
                        }
                    }
                    }/>
                </div>
                <div>
                    <label>Enter your instructions:</label>
                    <textarea id={"customDrink"} name={"customDrink"} rows={5} cols={50} value={instruction} onChange={event => setInstruction(event.target.value)}/>
                </div>
                <div className={"ingredient"}>
                <span>
                    <label>Enter the amount of your ingredient:</label>
                    <input type={"number"} pattern={"[0-9]*"} min={0} value={amount}
                           onChange={event => setAmount((value) =>(event.target.validity ? parseInt(event.target.value) : value))}/>
                </span>
                <span>
                    <label>Enter the unit of your ingredient:</label>
                    <input type={"text"} value={unit} onChange={event => setUnit(event.target.value)}/>
                </span>
                <span>
                    <label>Enter the name of your ingredient:</label>

                    <input  value={ingredientName} onChange={event => setIngredientName(event.target.value)}/>

                </span>

                <div>
                    <button onClick={composeIngredient}>add</button>
                </div>
                <div>{ingredients.map(c => <div>{c.customAmount} {c.customUnit} {c.customIngredientName}</div> )}</div>
                </div>
                <div>

                    <label>Enter your glass :</label>
                    <input type={"text"} value={glass} onChange={event => setGlass(event.target.value)}/>
                </div>
                {
                    <button disabled={!disabledButton} onClick={addCustomDrink} type={"button"}>add</button>}
                <div>

                </div>


        </div>
    )
}