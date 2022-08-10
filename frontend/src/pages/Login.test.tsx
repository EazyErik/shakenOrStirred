import Login from "./Login";
import axios, {AxiosError, AxiosResponse} from "axios";
import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";

afterEach(() => localStorage.removeItem("jwt"))

test("that values are rendered", async ()=> {
    jest.spyOn(axios, "post").mockImplementation((url: string, data: unknown) => {
        expect(url).toEqual("/api/login")
        expect(data).toEqual({username: "erik", password: "123"})
        return Promise.resolve({
            data:{
                token:"topSecretJWT"
            }
        } as AxiosResponse)
    })

    function DummyHome() {
        return<div data-testid={"home"}>Home</div>
    }

    render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/home"} element={<DummyHome/>}/>
            </Routes>
        </MemoryRouter>)

    const usernameField = screen.getByTestId("username-field")
    fireEvent.change(usernameField,{target:{value:"erik"}})

    const passwordField = screen.getByTestId("password-field")
    fireEvent.change(passwordField,{target:{value:"123"}})

    expect(screen.getByTestId("login-output").textContent).toEqual("erik")
    expect(screen.getByTestId("login-output-password").textContent).toEqual("123")

    screen.getByTestId("submit-button").click()


    await waitFor(() => {
        expect(localStorage.getItem("jwt")).toEqual("topSecretJWT")
        expect(localStorage.getItem("username")).toEqual("erik")
        expect(() => screen.getByTestId("home")).not.toThrowError()
        expect(screen.getByTestId("home").textContent).toEqual("Home")
    })

})

test("that error is rendered",async ()=> {
    jest.spyOn(axios, "post").mockImplementation((url: string, data: unknown) => {
        expect(url).toEqual("/api/login")
        expect(data).toEqual({username: "erik", password: "123"})
        return Promise.reject({} as AxiosError)
    })

    render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
            </Routes>
        </MemoryRouter>
    )

    const usernameField = screen.getByTestId("username-field")
    fireEvent.change(usernameField,{target:{value:"erik"}})

    const passwordField = screen.getByTestId("password-field")
    fireEvent.change(passwordField,{target:{value:"123"}})

    expect(screen.getByTestId("login-output").textContent).toEqual("erik")
    expect(screen.getByTestId("login-output-password").textContent).toEqual("123")

    screen.getByTestId("submit-button").click()

    await waitFor(()=> {

        expect(screen.getByTestId("error").textContent).toEqual("Password is wrong!" )



    })

})