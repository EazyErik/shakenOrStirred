import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Ingredient from "./pages/Ingredient/Ingredient";
import Favourite from "./pages/Favourite/Favourite";
import DrinkDay from "./pages/DrinkDay/DrinkDay";
import Category from "./pages/Ingredient/Category";
import Details from "./pages/Ingredient/Details";
import Login from "./pages/Registration/Login";
import Registration from "./pages/Registration/Registration";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";



export default function App() {


    return (

    <>            <div className={"App"}>
        <Header />
        <div className={"main-part"}>
        <Routes>

            <Route path={"/"} element={<Login />}/>
            <Route path={"/register"} element={<Registration />}/>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/ingredient"} element={<Ingredient />} />
            <Route path={"/favourites"} element={<Favourite />}/>
            <Route path={"/drinkDay"} element={<DrinkDay />} />
            <Route path={"/ingredient=:drinkCategory"} element={<Category />} />
            <Route path={"/details=:details"} element={<Details />} />


        </Routes>
        </div>

    </div>
        <Footer />
    </>
    )
}


