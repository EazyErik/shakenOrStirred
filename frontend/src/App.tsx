import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Ingredient from "./pages/Ingredient";
import Favourite from "./pages/Favourite";
import Category from "./pages/Category";
import Details from "./pages/Details";
import Registration from "./pages/Registration";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import CustomDrink from "./pages/CustomDrink";
import Search from "./pages/Search";



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
            <Route path={"/customDrink"} element={<CustomDrink />} />
            <Route path={"/ingredient=:drinkCategory"} element={<Category />} />
            <Route path={"/details=:details&source=:source"} element={<Details />} />
            <Route path={"/search"} element={<Search/>} />

        </Routes>
        </div>

    </div>
        <Footer />
    </>
    )
}


