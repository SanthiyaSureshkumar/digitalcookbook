import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { GiAbstract086, GiKnifeFork } from "react-icons/gi";
import { BsClock, BsPerson } from "react-icons/bs";
import { firestore } from "../firebaseData";

const RecipeItem = ({ favouriteHandler }) => {
  let location = useLocation();
  let recipe = location.state.recipes;
  const [itemsSavedStatus, setItemsSavedStatus] = useState(recipe[0].fav);

  const durationCalc = (duration) => {
    if (!duration) return;

    if (!String(duration).includes(".")) {
      return duration + "h";
    }

    if (String(duration).includes(".")) {
      const splittedDuration = String(duration).split(".");
      const hour = splittedDuration[0] + "h";
      const splittedMinutes = "." + splittedDuration[1];
      const minutes = String(+splittedMinutes * 60) + "min";

      return hour + minutes;
    }
  };

  const saveFavourites = () => {
    if (recipe[0].fav === false) {
      firestore()
        .collection("recipes")
        .doc(recipe[0].uid)
        .update({ fav: true })
        .then(() => {
          console.log("up");
          recipe[0].fav = true;
          setItemsSavedStatus(true);
        });
    } else {
      firestore()
        .collection("recipes")
        .doc(recipe[0].uid)
        .update({ fav: false })
        .then(() => {
          console.log("dw");
          recipe[0].fav = false;
          setItemsSavedStatus(false);
        });
    }
  };

  return (
    <div className="recipe-item-wrapper">
      <div className="recipe-item container mx-auto py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="left row-start-2 lg:row-start-auto">
          <div className="img overflow-hidden flex justify-center items-center h-96 rounded-xl border shadow-md group">
            <img
              className="w-full block rounded-xl group-hover:scale-105 duration-300"
              src={recipe[0].image_url}
              alt={recipe[0].title}
            />
          </div>
          <div className="ingredients mt-10">
            <h2 className="ing-title text-2xl lg:text-4xl font-medium mb-5 flex gap-3 items-center">
              <span className="text-green-500">
                <GiKnifeFork />
              </span>{" "}
              Ingredients:
            </h2>
            <hr className="border-green-100" />
            <ul
              className="flex flex-col gap-2 mt-5"
              style={{
                height: "300px",
                width: "500px",
                backgroundColor: "#ffffff",
                overflowY: "scroll",
                borderRadius: "20px",
                padding: "15px",
              }}
            >
              {recipe[0].ing?.map((ing, i) => (
                <li key={i}>
                  ✔ {ing.quantity} {ing.unit} {ing.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right flex flex-col gap-5">
          <span className="publisher uppercase tracking-widest font-semibold text-sky-400 ">
            {recipe[0].publisher}
          </span>
          <h2 className="title text-5xl capitalize">{recipe[0].title}</h2>
          <div className="servings-cooking-time flex gap-5 uppercase tracking-widest font-semibold">
            <div className="servings flex gap-2 items-center">
              <BsPerson />
              Served for : {recipe[0].servings} people
            </div>
            <div className="cooking-time flex gap-2 items-center">
              <BsClock />
              Cooking time :{" "}
              {recipe[0].cooking_time < 60
                ? String(recipe[0].cooking_time) + "min"
                : durationCalc(recipe[0].cooking_time / 60)}
            </div>
          </div>
          <div className="instructions">
            <h2 className="inst-title text-2xl lg:text-4xl font-medium mb-5 flex gap-3 items-center">
              <span className="text-green-500">
                <GiAbstract086 />
              </span>{" "}
              Instructions:
            </h2>
            <hr className="border-green-100" />
            <p className="text-lg">{recipe[0].instructions}</p>
          </div>
          <div className="btns flex gap-5">
            <button
              onClick={() => saveFavourites()}
              className={`bg-gradient-to-br p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md hover:shadow-lg duration-300 ${
                itemsSavedStatus
                  ? " from-orange-400 to-orange-600 text-orange-50  shadow-orange-200  hover:shadow-orange-300"
                  : " from-sky-400 to-sky-600 text-sky-50  shadow-sky-200  hover:shadow-sky-300"
              }`}
              style={{ width: "400px" }}
            >
              {itemsSavedStatus
                ? "- Remove From Favourites"
                : "+ Save As Favourites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
