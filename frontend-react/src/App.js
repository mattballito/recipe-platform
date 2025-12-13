import React, { useState } from "react";
import RecipeCard from "./components/RecipeCard";
function App() {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState(null);

  // 👇 This function lives inside App()
  const handleScrape = async () => {
    try {
      const response = await fetch("http://localhost:8080/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      console.log("Scraper Response:",data);
      setRecipe(data);
    } catch (err) {
      console.error("Error scraping recipe:", err);
    }
  };

  // 👇 The JSX returned by App()
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 className="text-4xl font-bold text-blue-600">Recipe Platform</h1>
      <input
        type="text"
        placeholder="Enter recipe URL!!!"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "300px", marginRight: "1rem" }}
      />
      <button onClick={handleScrape}>Scrape Recipe</button>
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  );
}

export default App;

