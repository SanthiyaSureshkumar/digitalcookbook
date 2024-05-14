import { useNavigate } from "react-router-dom";

const Recipe = ({ recipe, recipes }) => {
  const navigate = useNavigate();

  const nextPage = (title) => {
    let filteredRecipe = recipes.filter((val) => {
      return val.title && title === val.title;
    });
    console.log(filteredRecipe);
    navigate("/RecipeItem", { state: { recipes: filteredRecipe } });
  };

  return (
    <div
      className="recipe w-80 overflow-hidden rounded-2xl shadow-xl p-5 shadow-green-100 border-2 border-white flex flex-col gap-5"
      style={{ backgroundColor: "rgb(249, 177, 177)" }}
    >
      <div className="img h-40 overflow-hidden rounded-lg flex justify-center items-center">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="block w-full rounded-lg"
        />
      </div>
      <div className="texts">
        <h2 className="title text-2xl font-semibold truncate">
          {recipe.title}
        </h2>
        <button
          onClick={() => {
            console.log(recipe.title);
            nextPage(recipe.title);
          }}
          style={{
            width: "200px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "10px",
          }}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default Recipe;
