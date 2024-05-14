import { NavLink } from "react-router-dom";
import "./fryingPanStyles.css";

import chinese from "../img/chinese.png";
import indian from "../img/indian.png";
import north from "../img/north.png";
import italian from "../img/italian.png";
import { useState } from "react";

const Navbar = ({ inputField, savedItems, role, sendDataToParent }) => {
  // manupulating nav active class
  const [searchQuery, setSearchQuery] = useState("");

  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#f43f5e" : null,
    };
  };
  const getCuisine = (cuisine) => {
    setSearchQuery("");
    sendDataToParent(cuisine);
  };
  const sendSearch = () => {
    sendDataToParent(searchQuery);
  };

  return (
    <>
      <div className="navbar flex justify-between items-center container mx-auto py-8 flex-col lg:flex-row gap-5 lg:gap-0">
        <h2 className="logo text-2xl font-bold lowercase italic">
          Digital<span className="text-orange-900">CookBook</span>
        </h2>

        <div>
          <input
            ref={inputField}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="Search recipe..."
            required
            className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg   duration-300"
          />
          <button
            onClick={sendSearch}
            style={{
              borderRadius: "10px",
              backgroundColor: "#f56042",
              color: "#ffffff",
            }}
            className=""
          >
            Search
          </button>
        </div>

        <ul className="menu flex gap-5">
          <li>
            <NavLink
              style={navActive}
              to="/fav"
              className=" hover:text-orange-900  duration-300 font-bold"
            >
              Favourites
              <span className="favourites-count font-bold text-sky-400"></span>
            </NavLink>
          </li>
          
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  style={navActive}
                  to="/addadmin"
                  className=" hover:text-orange-900  duration-300 font-bold"
                >
                  AddAdmin
                  <span className="favourites-count font-bold text-sky-400"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={navActive}
                  to="/addrecipe"
                  className=" hover:text-orange-900  duration-300 font-bold"
                >
                  AddRecipe
                  <span className="favourites-count font-bold text-sky-400"></span>
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              style={navActive}
              end
              to="/"
              className=" hover:text-orange-900  duration-300 font-bold"
            >
              LogOut
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          overflow: "auto",
        }}
      >
        <div className="cuisineCard" onClick={() => getCuisine("southindian")}>
          <img src={indian} alt="dosa" className="cuisineStyle" />
          <div style={{fontWeight:"bold"}}>South Indian</div>
        </div>
        <div className="cuisineCard" onClick={() => getCuisine("northindian")}>
          <img src={north} alt="dosa" className="cuisineStyle" />
          <div style={{fontWeight:"bold"}}>North Indian</div>
        </div>
        <div className="cuisineCard" onClick={() => getCuisine("italian")}>
          <img src={italian} alt="dosa" className="cuisineStyle" />
          <div style={{fontWeight:"bold"}}>Italian</div>
        </div>
        <div className="cuisineCard" onClick={() => getCuisine("chinese")}>
          <img src={chinese} alt="chinese" className="cuisineStyle" />
          <div style={{fontWeight:"bold"}}>Chinese</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
