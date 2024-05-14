import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { firestore } from "../firebaseData";
const Favourites = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    firestore()
      .collection("recipes")
      .get()
      .then((snap) => {
        let favRecipe = [];
        let normalRecipes = [];
        snap.docs.forEach((doc) => {
          let data = doc.data();
          if (data.fav === true) {
            console.log(data);
            favRecipe.push(doc.data());
          }
          normalRecipes.push(doc.data());
        });
        setRecipes(normalRecipes);
        setSavedItems(favRecipe);
      });

    console.log(savedItems);
    setFetch(true);
  }, []);

  return (
    <div>
      <h2
        className="logo text-2xl font-bold lowercase italic"
        style={{ marginTop: "30px", marginLeft: "40px" }}
      >
        Digital<span className="text-orange-900">CookBook</span>
      </h2>
      <div className="favoutite-section ">
        <div className="favourite-text text-2xl lg:text-4xl font-semibold  text-center py-8 capitalize leading-normal">
          {!fetch ? (
            <p>Your favourite list is empty!</p>
          ) : (
            <p>Your favourite recipe{savedItems.length !== 1 ? "" : null}</p>
          )}
        </div>

        <div className="favourite-items container mx-auto py-10 flex flex-wrap gap-10 justify-center">
          {fetch
            ? savedItems.map((recipe) => {
                console.log(recipe);
                return <Recipe recipe={recipe} recipes={recipes} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
