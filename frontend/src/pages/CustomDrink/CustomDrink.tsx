import "./CustomDrink.css"
import {FormEvent, useState} from "react";
import {postCustomDrink, sendPicture} from "../../apiServices/service";
import {CustomIngredientModel} from "../../components/Model";
import {findAllByDisplayValue} from "@testing-library/react";


export default function CustomDrink(){


    const[instruction,setInstruction] = useState("")
    const[ingredients, setIngredients] = useState<CustomIngredientModel[]>([])
    const[ingredientName,setIngredientName] = useState("")
    const[amount,setAmount] = useState(0)
    const[unit, setUnit] = useState("")
    const[glass, setGlass] = useState("")
    const[image,setImage] = useState({} as File)
    const[cocktailName, setCocktailName] = useState("")
    const[info, setInfo] = useState("")



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
            console.log(data.secure_url)})


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
        setInstruction("")
        setCocktailName("")
        setGlass("")

    }





    return (
        <div className={"customDrink"}>
            <h3>Add your own creations:</h3>
            <form onSubmit={addCustomDrink}>
                <div>
                <label>Enter the name of your drink:</label>

                    <input type={"text"} onChange={event => setCocktailName(event.target.value)}/>
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
                    <input type={"number"} pattern={"[0-9]*"} value={amount}
                           onChange={event => setAmount((value) =>(event.target.validity ? parseInt(event.target.value) : value))}/>
                </div>
                <div>
                    <label>Enter the unit of your ingredient:</label>
                    <input type={"text"} value={unit} onChange={event => setUnit(event.target.value)}/>
                </div>
                <div>
                    <label>Enter the name of your ingredient:</label>
                    <input type={"text"} value={ingredientName} onChange={event => setIngredientName(event.target.value)}/>
                </div>
                <div>
                    <button onClick={composeIngredient}>add</button>
                </div>
                <div>{ingredients.map(c => <div>{c.customAmount} {c.customUnit} {c.customIngredientName}</div> )}</div>
                <div>
                    <label>Enter your glass :</label>
                    <input type={"text"} onChange={event => setGlass(event.target.value)}/>
                </div>
                {cocktailName && instruction && ingredients && image && glass && cocktailName &&
                    <button type={"submit"}>add</button>}
                <div>
                    {info}
                </div>

            </form>
        </div>
    )
}