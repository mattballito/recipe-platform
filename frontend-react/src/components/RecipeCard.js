import React from "react";

function RecipeCard({ recipe }) {
  if (!recipe) return null;

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 p-6 border rounded-lg shadow-lg bg-white max-w-4xl mx-auto">
      {/* Title at top center */}
      <div className="col-span-2 text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">{recipe.title}</h2>
      </div>

      {/* Ingredients top-left */}
      <div className="border p-4 rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc pl-5 text-sm">
          {recipe.ingredients?.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      {/* Instructions top-right */}
      <div className="border p-4 rounded bg-gray-50 overflow-y-auto">
        <h3 className="font-semibold mb-2">Instructions</h3>
        <p className="text-sm whitespace-pre-line">{recipe.instructions}</p>
      </div>

      {/* Image bottom-left */}
      <div className="border p-4 rounded bg-gray-50 flex items-center justify-center">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="max-h-48 rounded"
          />
        ) : (
          <span className="text-gray-400">No image available</span>
        )}
      </div>

      {/* Bottom-right quadrant: repeat Title for emphasis or add summary */}
      <div className="border p-4 rounded bg-gray-50 flex items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-700">Recipe Overview</h3>
      </div>
    </div>
  );
}

export default RecipeCard;
