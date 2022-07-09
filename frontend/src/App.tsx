import React from 'react';

import {NavLink, Link, Route, Routes} from "react-router-dom";

import Home from "./components/Home";

import Ingredient from "./pages/Ingredient/Ingredient";
import Favourite from "./pages/Favourite/Favourite";
import DrinkDay from "./pages/DrinkDay/DrinkDay";
import Category from "./pages/Ingredient/Category";
import Details from "./pages/Ingredient/Details";



export default function App() {


    return (

    <>            <div className={"App"}>
        <h1>shaken or stirred</h1>
        <Routes>

            <Route path={"/home"} element={<Home />} />
            <Route path={"/ingredient"} element={<Ingredient />} />
            <Route path={"/favourites"} element={<Favourite />}/>
            <Route path={"/drinkDay"} element={<DrinkDay />} />
            <Route path={"/ingredient=:drinkCategory"} element={<Category />} />
            <Route path={"/details=:details"} element={<Details />} />


        </Routes>
    </div>
        <div className={"Menu"}>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"} to={"/main"} >Main</NavLink>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"}  to={"/ingredient"} >Ingredient</NavLink>
            <NavLink className={({isActive}) => isActive ? "active" : "not-active"} to={"/category"} >Category</NavLink>

        </div>
    </>
    )
}


