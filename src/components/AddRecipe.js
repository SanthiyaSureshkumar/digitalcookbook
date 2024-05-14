import React, { useState } from "react";
import "./AddRecipe.css";
import { firestore } from "../firebaseData";

const AddRecipe = () => {
  const [recipes, setRecipes] = useState([
    {
      title: "",
      cooking_time: "",
      cuisine: "",
      image_url: "",
      recipeKeying: "",
      fav: false,
      servings: "",
      instructions: "", // Changed from "description" to "instructions"
      ing: [{ quantity: "", unit: "", description: "" }],
    },
  ]);

  const addIngredient = (recipeIndex) => {
    const newRecipes = [...recipes];
    newRecipes[recipeIndex].ing.push({
      quantity: "",
      unit: "",
      description: "",
    });
    setRecipes(newRecipes);
  };

  const handleInputChange = (recipeIndex, ingredientIndex, key, value) => {
    setRecipes((prevRecipes) => {
      const newRecipes = [...prevRecipes];
      if (
        key === "title" ||
        key === "cooking_time" ||
        key === "cuisine" ||
        key === "image_url" ||
        key === "servings" ||
        key === "instructions" // Changed from "description" to "instructions"
      ) {
        newRecipes[recipeIndex][key] = value;
      }
      newRecipes[recipeIndex].ing[ingredientIndex][key] = value;
      return newRecipes;
    });
  };

  const submit = async () => {
    const docRef = await firestore().collection("recipes").add(recipes[0]);
    const docId = docRef.id;
    const ref = firestore().collection("recipes").doc(docId);
    console.log(docId);
    ref.update({ uid: docId, ...recipes[0] }).then(() => {
      // updated
      alert("uploaded");
    });
  };

  return (
    <>
      <h2
        className="logo text-2xl font-bold lowercase italic"
        style={{ marginTop: "30px", marginLeft: "40px" }}
      >
        Digital<span className="text-orange-900">CookBook</span>
      </h2>
      <div key={8} className="recipieContainerUpper">
        {recipes.map((recipe, recipeIndex) => (
          <div key={0} className="recipeContainer">
            <p
              key={9}
              style={{ fontSize: "30px", color: "#ff6f00", marginTop: "10px" }}
            >
              Add Recipe
            </p>
            <input
              key={1}
              type="text"
              placeholder="Recipe Title"
              value={recipe.title}
              onChange={(e) => {
                handleInputChange(recipeIndex, 0, "title", e.target.value);
              }}
            />
            <input
              key={1 + 12}
              type="text"
              placeholder="Recipe Image (add url)"
              value={recipe.image_url}
              onChange={(e) => {
                handleInputChange(recipeIndex, 0, "image_url", e.target.value);
              }}
            />
            <input
              key={2}
              type="text"
              placeholder="Cooking Time (Total minutes)"
              value={recipe.cooking_time}
              onChange={(e) =>
                handleInputChange(
                  recipeIndex,
                  0,
                  "cooking_time",
                  e.target.value
                )
              }
            />
            <input
              key={2}
              type="text"
              placeholder="Serving (No. of people)"
              value={recipe.servings}
              onChange={(e) =>
                handleInputChange(recipeIndex, 0, "servings", e.target.value)
              }
            />
            <textarea
              key={3}
              type="text"
              placeholder="Instructions"
              value={recipe.instructions} // Changed from "description" to "instructions"
              onChange={
                (e) =>
                  handleInputChange(
                    recipeIndex,
                    0,
                    "instructions",
                    e.target.value
                  ) // Changed from "description" to "instructions"
              }
              style={{ marginBottom: "10px" }}
            />
            <select
              key={4}
              value={recipe.cuisine}
              onChange={(e) =>
                handleInputChange(recipeIndex, 0, "cuisine", e.target.value)
              }
              style={{ width: "21%", marginBottom: "20px", height: "50px" }}
            >
              <option value="">Select Cuisine</option>
              <option value="southindian">South Indian</option>
              <option value="northindian">North Indian</option>
              <option value="italian">Italian</option>
              <option value="chinese">Chinese</option>
            </select>
            <button
              key={5}
              onClick={() => addIngredient(recipeIndex)}
              style={{
                width: "200px",
                height: "30px",
                borderRadius: "10px",
                backgroundColor: "#f99d34",
              }}
            >
              Add Ingredient
            </button>
            <div
              style={{ overflowY: "scroll", height: "400px", width: "100%" }}
            >
              {recipe.ing.map((ingredient, ingredientIndex) => (
                <>
                  <div key={ingredientIndex}>
                    <input
                      type="text"
                      placeholder="Quantity (number of)"
                      value={ingredient.quantity}
                      onChange={(e) =>
                        handleInputChange(
                          recipeIndex,
                          ingredientIndex,
                          "quantity",
                          e.target.value
                        )
                      }
                      key={ingredientIndex + 2}
                    />
                    <input
                      type="text"
                      placeholder="Unit (kg/spoon/teaspoon)"
                      value={ingredient.unit}
                      onChange={(e) =>
                        handleInputChange(
                          recipeIndex,
                          ingredientIndex,
                          "unit",
                          e.target.value
                        )
                      }
                      key={ingredientIndex + 3}
                    />
                    <input
                      type="text"
                      placeholder="Description (How to add)"
                      value={ingredient.description}
                      onChange={(e) =>
                        handleInputChange(
                          recipeIndex,
                          ingredientIndex,
                          "description",
                          e.target.value
                        )
                      }
                      key={ingredientIndex + 4}
                    />
                  </div>
                </>
              ))}
            </div>
            <button
              onClick={submit}
              key={10 + 4}
              style={{
                width: "200px",
                height: "30px",
                borderRadius: "10px",
                backgroundColor: "#f99d34",
              }}
            >
              submit
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddRecipe;
