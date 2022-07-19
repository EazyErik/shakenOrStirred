import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Ingredient from "./pages/Ingredient/Ingredient";
import Favourite from "./pages/Favourite/Favourite";
import Category from "./pages/Ingredient/Category";
import Details from "./pages/Ingredient/Details";
import Registration from "./pages/Registration/Registration";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import OwnDrink from "./pages/OwnDrink/OwnDrink";


export default function App() {


    return (

    <>            <div className={"App"}>
        <Header />
        <div  className={"main-part"}>
        <Routes>

            <Route path={"/"} element={<Login />}/>
            <Route path={"/register"} element={<Registration />}/>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/ingredient"} element={<Ingredient />} />
            <Route path={"/favourites"} element={<Favourite />}/>
            <Route path={"/ownDrink"} element={<OwnDrink />} />
            <Route path={"/ingredient=:drinkCategory"} element={<Category />} />
            <Route path={"/details=:details"} element={<Details  />} />

        </Routes>
        </div>

    </div>
        <Footer />
    </>
    )
}


