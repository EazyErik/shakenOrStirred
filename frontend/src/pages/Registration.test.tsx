import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Registration from "./Registration";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import axios, {AxiosError, AxiosResponse} from "axios";
import Login from "./Login";
import React from "react";


test(`that input values are rendered`, async () => {
    jest.spyOn(axios, "post").mockImplementation((url: string, data: unknown) => {
        expect(url).toEqual("/api/user")
        expect(data).toEqual({username: "erik", password: "123", passwordAgain: "123"})
        return Promise.resolve({} as AxiosResponse)
    })

    function DummyLogin() {
        return <div data-testid={"login"}>
            Login
        </div>
    }

    render(
        <MemoryRouter initialEntries={["/register"]}>
            <Routes>
                <Route path={"/"} element={<DummyLogin/>}/>
                <Route path={"/register"} element={<Registration/>}/>
            </Routes>
        </MemoryRouter>)

    const usernameField = screen.getByTestId(`username-field`)
    fireEvent.change(usernameField,{target:{value:`erik`}})

    const passwordField = screen.getByTestId(`password-field`)
    fireEvent.change(passwordField,{target:{value:`123`}})

    const passwordAgainField = screen.getByTestId(`passwordAgain-field`)
    fireEvent.change(passwordAgainField,{target:{value:`123`}})


    expect(screen.getByTestId(`registration-output`).textContent).toEqual(`erik`)

    screen.getByTestId("submit-button").click()


    await waitFor(()=>{
        expect(()=> screen.getByTestId("login")).not.toThrowError()
        expect(screen.getByTestId("login").textContent).toEqual("Login")
    })
})

test("that error is rendered", async () => {
    jest.spyOn(axios, "post").mockImplementation((url: string, data: unknown) => {
        expect(url).toEqual("/api/user")
        expect(data).toEqual({username: "erik", password: "123", passwordAgain: "1234"})
        return Promise.reject({} as AxiosError)
    })


    render(
        <MemoryRouter initialEntries={["/register"]}>
            <Routes>
                <Route path={"/register"} element={<Registration/>}/>
            </Routes>
        </MemoryRouter>)

    const usernameField = screen.getByTestId(`username-field`)
    fireEvent.change(usernameField, {target: {value: `erik`}})

    const passwordField = screen.getByTestId(`password-field`)
    fireEvent.change(passwordField, {target: {value: `123`}})

    const passwordAgainField = screen.getByTestId(`passwordAgain-field`)
    fireEvent.change(passwordAgainField, {target: {value: `1234`}})

    screen.getByTestId("submit-button").click()

    await waitFor(()=>{


        expect(screen.getByTestId("error").textContent).toEqual("Registration failed. Please try again")
    })



})

