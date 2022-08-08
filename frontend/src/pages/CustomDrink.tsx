import "./CustomDrink.css"
import {FormEvent, useEffect, useState} from "react";
import {postCustomDrink, sendPicture} from "../apiServices/service";
import {CustomIngredientModel} from "../components/Model";
import {useNavigate} from "react-router-dom";


export default function CustomDrink() {


    const [instruction, setInstruction] = useState("")
    const [ingredients, setIngredients] = useState<CustomIngredientModel[]>([])
    const [ingredientName, setIngredientName] = useState("")
    const [amount, setAmount] = useState(0)
    const [unit, setUnit] = useState("")
    const [glass, setGlass] = useState("")
    const [image, setImage] = useState({} as File)
    const [cocktailName, setCocktailName] = useState("")
    const [radioButtonValue, setRadioButtonValue] = useState("")
    const[editedIngredientIndex,setEditedIngredientIndex] = useState<number>()
    const nav = useNavigate()


    const addCustomDrink = (event: FormEvent) => {
        event.preventDefault()
        handleUpload()


    }

    const handleUpload = () => {
        console.log("image",image)
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "customDrink")
        console.log("formData",formData)
        sendPicture(formData)
            .then((data) => {
                const currentDrink = {
                    customDrinkName: cocktailName,
                    customDrinkURL: data.secure_url,
                    customIngredients: ingredients,
                    customInstruction: instruction,
                    customGlass: glass,
                    customAlcoholic: radioButtonValue

                }
                postCustomDrink(currentDrink)
                    .then(() => {
                        setCocktailName("")
                        setImage({} as File)
                        setInstruction("")
                        setAmount(0)
                        setUnit("")
                        setIngredientName("")
                        setGlass("")
                        alert("Your drink has just been added!")
                    })
                    .catch(() => {
                        localStorage.removeItem("jwt")
                        nav("/")

                    })

            })
    }

    const composeIngredient = () => {
        const newIngredient = {
            customUnit: unit,
            customAmount: amount,
            customIngredientName: ingredientName
        }
        setIngredients((current) => [...current, newIngredient])
        setAmount(0)
        setUnit("")
        setIngredientName("")

    }
    const disabledButton = (cocktailName !== "" && instruction !== ""
        && glass !== "" && ingredients !== [] && radioButtonValue !== "")

    const editIngredient = (ingredient: CustomIngredientModel,index: number) => {
        setAmount(ingredient.customAmount)
        setUnit(ingredient.customUnit)
        setIngredientName(ingredient.customIngredientName)
        setEditedIngredientIndex(index)
    }


    const saveIngredient = () => {
      let editedIngredient: CustomIngredientModel = {customIngredientName:ingredientName, customUnit:unit, customAmount:amount}
        let editedIngredients:CustomIngredientModel[] = ingredients.map((ingridient, index) => {
            if(index === editedIngredientIndex) {

                return editedIngredient

            }else{

               return ingridient
            }
        })
        setIngredients(editedIngredients)
        setEditedIngredientIndex(undefined)
        setAmount(0)
        setUnit("")
        setIngredientName("")

    }
    return (
        <div className={"customDrink"}>
            <h3>Add your own creations:</h3>

            <div>
                <label>Enter the name of your drink:</label>

                <input data-testid={"name-field"} type={"text"} value={cocktailName} onChange={event => setCocktailName(event.target.value)}/>
            </div>

            <div>
                <label>Upload your picture here:</label>
                <input data-testid={"upload-field"} type={"file"} accept={"image/*"} onChange={event => {
                    if (event.target.files !== null) {
                        setImage(event.target.files[0])
                    }
                }
                }/>
            </div>
            <div>
                <label>Enter your instructions:</label>
                <textarea data-testid={"instruction-field"} id={"customDrink"} name={"customDrink"} rows={5} cols={50} value={instruction}
                          onChange={event => setInstruction(event.target.value)}/>
            </div>
            <div className={"ingredient"}>
                <span>
                    <label>Enter the amount of your ingredient:</label>
                    <input data-testid={"amount-field"} type={"number"} pattern={"[0-9]*"} min={0} value={amount}
                           onChange={event => setAmount((value) => (event.target.validity ? event.target.valueAsNumber : value))}/>
                </span>
                <span>
                    <label>Enter the unit of your ingredient:</label>
                    <input data-testid={"unit-field"} type={"text"} value={unit} onChange={event => setUnit(event.target.value)}/>
                </span>
                <span>
                    <label>Enter the name of your ingredient:</label>

                    <input data-testid={"ingredientName-field"} value={ingredientName} onChange={event => setIngredientName(event.target.value)}/>

                </span>

                <div>
                    {
                        (editedIngredientIndex !== null && editedIngredientIndex !== undefined)  ?
                        <button className={"edit-button"} onClick={saveIngredient}>edit</button>
                        :
                    <button data-testid={"add-button"} onClick={composeIngredient}>add </button>}
                </div>
                <div>{ingredients.map((ingredient,index) =>
                    <div key={index}>
                        {ingredient.customAmount} {ingredient.customUnit} {ingredient.customIngredientName}
                        <button className={"edit-button"} onClick={()=>editIngredient(ingredient,index)}>edit</button>
                    </div>)}
                </div>

            </div>
            <div>

                <label>Enter your glass :</label>
                <input data-testid={"glass-field"} type={"text"} value={glass} onChange={event => setGlass(event.target.value)}/>
            </div>
            <div>

                <label>Alcoholic :</label>
                <input data-testid={"alcoholic-field"}  type={"radio"} checked={radioButtonValue === "Alcoholic"}
                       onChange={() => setRadioButtonValue("Alcoholic")}/>
                <label>Non Alcoholic :</label>
                <input data-testid={"nonAlcoholic-field"} type={"radio"} checked={radioButtonValue === "Non_Alcoholic"}
                       onChange={() => setRadioButtonValue("Non_Alcoholic")}/>

            </div>

                <button  data-testid={"addAll-button"} disabled={!disabledButton} onClick={addCustomDrink} type={"button"}>add</button>
        </div>
    )
}