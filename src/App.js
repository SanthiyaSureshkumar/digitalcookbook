import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Favourites from "./components/Favourites";
import AddAdmin from "./components/AddAdmin";
import AddRecipe from "./components/AddRecipe";
import RecipeItem from "./components/RecipeItem";
import "./App.css";
import bg from "./vegan.jpg";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div className="app min-h-screen  text-lg relative">
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/fav/*" element={<Favourites />} />
          <Route path="/addadmin/*" element={<AddAdmin />} />
          <Route path="/addrecipe/*" element={<AddRecipe />} />
          <Route path="/Dashboard/*" element={<Dashboard />} />
          <Route path="/RecipeItem/*" element={<RecipeItem />} />
          <Route path="/Contact/*" element={<Contact />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;
