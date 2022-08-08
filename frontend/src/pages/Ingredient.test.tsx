import axios from "axios";
import {render, waitFor, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Ingredient from "./Ingredient";


test("that ingredients form db and public api are displayed", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string, data: any) => {
        if (url === "https://thecocktaildb.com/api/json/v1/1/list.php?i=list") {
            return Promise.resolve({
                data: {
                    drinks: [{strIngredient1: "Gin"}]

                }
            })
        } else if (url === `/api/customDrink/ingredients`) {
            return Promise.resolve({
                data: ["Vodka"]
            })
        }
        throw new Error()
    })


    render(
        <MemoryRouter initialEntries={["/ingredient"]}>
            <Routes>
                <Route path={"/ingredient"} element={<Ingredient/>}/>
            </Routes>
        </MemoryRouter>
    )
    await waitFor(() => {
        expect(screen.getByTestId("button-field0").textContent).toEqual("Vodka")
        expect(screen.getByTestId("button-field1").textContent).toEqual("Gin")
    })
})






