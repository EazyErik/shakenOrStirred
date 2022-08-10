import axios, {AxiosError, AxiosResponse} from "axios";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import React from "react";
import CustomDrink from "./CustomDrink";





test("that inputFields are empty after drink was sent ", async () => {
    jest.spyOn(axios, "post").mockImplementation((url: string, data: unknown) => {
        if (url === "https://api.cloudinary.com/v1_1/eazyerik/image/upload") {
            expect((data as FormData).get("upload_preset")).toEqual("customDrink")
            //expect(((data as FormData).get("file") as File).text()).toEqual("{ name: 'image' }")
            return Promise.resolve({
                data: {
                    secure_url: "https://myCustomDrinkPicture"
                }
            })
        } else if (url === "api/customDrink") {
            expect(data).toEqual({
                customDrinkName: "Pornstar Martini",
                customDrinkURL: "https://myCustomDrinkPicture",
                customIngredients: [{
                    customAmount: 4,
                    customUnit: "cl",
                    customIngredientName: "Vodka"
                }],
                customInstruction: "instruction",
                customGlass: "glass",
                customAlcoholic: "Alcoholic"

            })
            return Promise.resolve({} as AxiosResponse)
        }
        throw new Error()

    })
    render(
        <MemoryRouter initialEntries={["/customDrink"]}>
            <Routes>
                <Route path={"/customDrink"} element={<CustomDrink/>}/>
            </Routes>
        </MemoryRouter>
    )

    const nameField = screen.getByTestId("name-field")
    fireEvent.change(nameField,{target: {value: `Pornstar Martini`}})

    const someValues = [{ name: 'image' }];
    const str = JSON.stringify(someValues);
    const blob = new Blob([str]);
    const file = new File([blob], 'values.json', {
        type: 'application/JSON',
    });


    const input = screen.getByTestId('upload-field');
    fireEvent.change(input,{target:{files:[file]}});

    const instructionField = screen.getByTestId("instruction-field")
    fireEvent.change(instructionField, {target: {value: "instruction"}})

    const amountField = screen.getByTestId("amount-field")
    fireEvent.change(amountField, {target: {value: 4}})

    const unitField = screen.getByTestId("unit-field")
    fireEvent.change(unitField, {target: {value: "cl"}})

    const ingredientNameField = screen.getByTestId("ingredientName-field")
    fireEvent.change(ingredientNameField, {target: {value: "Vodka"}})


    screen.getByTestId("add-button").click()

    const glassField = screen.getByTestId("glass-field")
    fireEvent.change(glassField, {target: {value: "glass"}})

    screen.getByTestId("alcoholic-field").click()

    screen.getByTestId("addAll-button").click()

    await waitFor(()=> {
        expect(screen.getByTestId("name-field").getAttribute("value")).toEqual("")
        expect(screen.getByTestId("instruction-field").textContent).toEqual("")
        expect(screen.getByTestId("amount-field").getAttribute("value")).toEqual("0")
        expect(screen.getByTestId("unit-field").getAttribute("value")).toEqual("")
        expect(screen.getByTestId("ingredientName-field").getAttribute("value")).toEqual("")
        expect(screen.getByTestId("glass-field").getAttribute("value")).toEqual("")

    })

})


test("that button is disabled", async () => {
    jest.spyOn(axios, "post").mockImplementation((url: string, data: unknown) => {
            expect(url).toEqual("api/customDrink")
            expect(data).toEqual({
                customDrinkName: "",
                customDrinkURL: "https://myCustomDrinkPicture",
                customIngredients: [{
                    customAmount: 4,
                    customUnit: "cl",
                    customIngredientName: "Vodka"
                }],
                customInstruction: "instruction",
                customGlass: "glass",
                customAlcoholic: "Alcoholic"

            })
            return Promise.reject({} as AxiosError)

    })
    render(
        <MemoryRouter initialEntries={["/customDrink"]}>
            <Routes>
                <Route path={"/customDrink"} element={<CustomDrink/>}/>
            </Routes>
        </MemoryRouter>
    )

    const nameField = screen.getByTestId("name-field")
    fireEvent.change(nameField,{target: {value: ""}})

    const instructionField = screen.getByTestId("instruction-field")
    fireEvent.change(instructionField, {target: {value: "instruction"}})

    const amountField = screen.getByTestId("amount-field")
    fireEvent.change(amountField, {target: {value: 4}})

    const unitField = screen.getByTestId("unit-field")
    fireEvent.change(unitField, {target: {value: "cl"}})

    const ingredientNameField = screen.getByTestId("ingredientName-field")
    fireEvent.change(ingredientNameField, {target: {value: "Vodka"}})


    screen.getByTestId("add-button").click()

    const glassField = screen.getByTestId("glass-field")
    fireEvent.change(glassField, {target: {value: "glass"}})

    screen.getByTestId("alcoholic-field").click()

    screen.getByTestId("addAll-button").click()

    await waitFor(()=> {
       expect(screen.getByTestId("addAll-button")).toBeDisabled()


    })

})
