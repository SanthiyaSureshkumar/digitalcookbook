import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FryingPan from "./FryingPan";
import Recipe from "./Recipe";
import Spinner from "./Spinner";

const Dashboard = ({ loading = false, error = false }) => {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]);

  const handleChildData = (dataFromChild) => {
    if (!dataFromChild.trim()) {
      setRecipes(originalRecipes || []);
      return;
    }

    const lowercaseQuery = dataFromChild.toLowerCase();
    let filteredRecipe = originalRecipes.filter((val) => {
      if (
        val &&
        val.title &&
        val.title.toLowerCase().includes(lowercaseQuery)
      ) {
        return true;
      } else if (
        val &&
        val.cuisine &&
        val.cuisine.toLowerCase().includes(lowercaseQuery)
      ) {
        return true;
      }
      return false;
    });

    if (filteredRecipe.length !== 0) {
      setRecipes(filteredRecipe);
    } else {
      setRecipes([]);
      alert(`No recipes found for cuisine "${dataFromChild}"`);
    }
  };

  useEffect(() => {
    // Load recipes only if data is present
    if (location.state && location.state.recipes) {
      setRecipes(location.state.recipes);
      setOriginalRecipes(location.state.recipes);
    }
  }, [location.state]);

  return (
    <div>
      <Navbar key={77} role={location.state.role} sendDataToParent={handleChildData} />
      <div className="home container mx-auto py-10 flex flex-wrap gap-10 justify-center">
        {/* condition for ideal position */}
        {!loading && !error && recipes.length === 0 ? (
          <div>
            <p className="text-2xl lg:text-4xl font-semibold">
              Nothing to show, Add Recipie!
            </p>
            <FryingPan />
          </div>
        ) : null}

        {/* condition for loading position */}
        {loading && <Spinner />}

        {/* condition after getting the recipes */}
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <Recipe recipe={recipe} recipes={recipes} key={recipe.id} />
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
