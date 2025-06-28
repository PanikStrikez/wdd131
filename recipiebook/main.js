// Import the recipes data from your recipes module
import recipes from './recipes.mjs';

console.log("main.js loaded");
console.log('Imported recipes:', recipes);

const recipesSection = document.getElementById('recipes-section');
const searchForm = document.getElementById('search-form');

//  random helpers
function random(num) {
  return Math.floor(Math.random() * num);
}
function getRandomListEntry(list) {
  return list[random(list.length)];
}

//  tagsTemplate
function tagsTemplate(tags=[]) {
  const items = tags
    .map(t => `<li>${t}</li>`)
    .join('');
  return `<ul class="recipe__tags">${items}</ul>`;
}

//  ratingTemplate
function ratingTemplate(rating=0) {
  const maxStars   = 5;
  const fullStars  = Math.floor(rating);
  const hasHalf    = rating % 1 >= 0.5;
  let starsHTML    = 
    `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;

  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<span aria-hidden="true" class="icon-star">⭐</span>`;
  }
  if (hasHalf) {
    starsHTML += `<span aria-hidden="true" class="icon-star-half">⭑</span>`;
  }
  for (let i = fullStars + (hasHalf ? 1 : 0); i < maxStars; i++) {
    starsHTML += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  starsHTML += `</span>`;
  return starsHTML;
}

//  recipeTemplate
function recipeTemplate(recipe) {
  return `
    <figure class="recipe">
      <img src="${recipe.image}"
           alt="${recipe.name}"
           loading="lazy" />
      <figcaption>
        ${tagsTemplate(recipe.tags)}
        <h2>
          <a href="${recipe.url || '#'}">${recipe.name}</a>
        </h2>
        ${ratingTemplate(recipe.rating)}
        <p class="recipe__description">
          ${recipe.description}
        </p>
      </figcaption>
    </figure>
  `;
}

//  renderRecipes
function renderRecipes(list = []) {
  recipesSection.innerHTML = '';
  if (list.length === 0) {
    recipesSection.innerHTML = `
      <p class="no-results">
        No recipes match your search. Try another keyword.
      </p>`;
    return;
  }
  // join all recipe HTML 
  recipesSection.innerHTML = list.map(recipeTemplate).join('');
}

//  init: show one random recipe on load
function init() {
  const randomRecipe = getRandomListEntry(recipes);
  renderRecipes([randomRecipe]);
}
init();

//  filtering logic
function filterRecipes(query='') {
  const filtered = recipes.filter(recipe => {
    const q = query.toLowerCase();
    return (
      recipe.name.toLowerCase().includes(q) ||
      recipe.description.toLowerCase().includes(q) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(q)) ||
      recipe.recipeIngredient.some(ing => ing.toLowerCase().includes(q))
    );
  });
  // sort alphabetically by name
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
  e.preventDefault();
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  const results = filterRecipes(q);
  renderRecipes(results);
}

searchForm.addEventListener('submit', searchHandler);