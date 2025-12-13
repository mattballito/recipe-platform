import React from "react";

function RecipeCard({ recipe }) {
  if (!recipe) return null;

  return (
    <div className="grid grid-cols-2 gap-6 p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-pink-50 via-white to-purple-50 max-w-5xl mx-auto">
      {/* Title */}
      <div className="col-span-2 text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
          {recipe.title}
        </h2>
        <div className="mx-auto mt-2 h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
      </div>

      {/* Ingredients */}
      <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🛒 Ingredients</h3>
        {recipe.ingredientGroups?.length ? (
          recipe.ingredientGroups.map((group, idx) => (
            <div key={idx} className="mb-4">
              {group.purpose && (
                <h4 className="font-semibold text-pink-600 mb-2">{group.purpose}</h4>
              )}
              <ul className="space-y-2 text-sm text-gray-700">
                {group.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 before:content-['•'] before:text-pink-500 before:font-bold"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul className="space-y-2 text-sm text-gray-700">
            {recipe.ingredients?.map((ing, i) => (
              <li
                key={i}
                className="flex items-center gap-2 before:content-['•'] before:text-pink-500 before:font-bold"
              >
                {ing}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Instructions */}
      <div className="border p-6 rounded-xl bg-white shadow-sm overflow-y-auto max-h-64">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">👩‍🍳 Instructions</h3>
        {recipe.instructionGroups?.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h4 className="font-semibold text-pink-600">{section.title}</h4>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
              {section.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Image */}
      <div className="relative rounded-xl overflow-hidden shadow-lg col-span-1">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No image available
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
