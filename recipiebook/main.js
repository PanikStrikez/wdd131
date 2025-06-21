// Import the recipes data from your recipes module
import recipes from './recipes.mjs';

console.log("main.js loaded");


const recipesSection = document.getElementById("recipes-section");

/**

 * @param {Array} recipesArray - Array of recipe objects.
 */
function renderRecipes(recipesArray) {
  recipesSection.innerHTML = ""; 
  recipesArray.forEach((recipe) => {
   
    const article = document.createElement("article");
    article.classList.add("recipe");
    
    // If recipe is Apple Crisp, mark it as featured
    if (recipe.name.toLowerCase().includes("apple crisp")) {
      article.classList.add("featured");
    }

    // Recipe image
    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    article.appendChild(img);

    // Container for recipe text details
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("recipe-details");

    // Recipe name element
    const h2 = document.createElement("h2");
    h2.textContent = recipe.name;
    detailsDiv.appendChild(h2);

    // Recipe description
    const descPara = document.createElement("p");
    descPara.classList.add("description");
    descPara.textContent = recipe.description;
    detailsDiv.appendChild(descPara);

    // the rating element
    const ratingSpan = document.createElement("span");
    ratingSpan.classList.add("rating");
    ratingSpan.setAttribute("role", "img");
    ratingSpan.setAttribute("aria-label", `Rating: ${recipe.rating} out of 5 stars`);
    
    let ratingHTML = "";
    // Generate 5 stars: full star if within rating, otherwise empty star.
    for (let i = 0; i < 5; i++) {
      if (i < recipe.rating) {
        ratingHTML += '<span aria-hidden="true" class="icon-star">⭐</span>';
      } else {
        ratingHTML += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
      }
    }
    ratingSpan.innerHTML = ratingHTML;
    detailsDiv.appendChild(ratingSpan);

    article.appendChild(detailsDiv);
    recipesSection.appendChild(article);
  });
}

// Initially render all recipes
renderRecipes(recipes);

//  search interactivity
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("search-input").value.toLowerCase();
  
  // Filter recipes by matching name, tags, or description
  const filteredRecipes = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(query);
    const tagsMatch = recipe.tags && recipe.tags.some((tag) => tag.toLowerCase().includes(query));
    const descriptionMatch = recipe.description && recipe.description.toLowerCase().includes(query);
    return nameMatch || tagsMatch || descriptionMatch;
  });
  
  renderRecipes(filteredRecipes);
});