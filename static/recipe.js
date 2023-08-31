document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#recipe-form");
    const recipesContainer = document.querySelector(".recipe-page-recipe");

    // Replace this with your actual JSON data
    const recipeData = [
        {
          "name": "Tomato Egg",
          "ingredients": ["tomato", "egg"],
          "allergies": ["egg"],
          "health_issue": ["hypercholesterolemia"],
          "calories": "238",
          "ingredients_needed": "Tomato, Egg",
          "steps": "First crack an egg and scramlbe it. After that, fry it in a frying pan. After it is cooked, place it on a plate. Cut a tomato into pieces and place it inside a frying pan. After the tomato is cooked place the cooked egg inside.",
          "photo": "/static/images/tomatoFryEgg.JPG",
          "link": "https://thewoksoflife.com/stir-fried-tomato-and-egg/"
        },
        {
          "name": "Tomato Soup",
          "ingredients": ["tomato", "onion", "carrot"],
          "allergies": [],
          "health_issue": [],
          "calories": "90",
          "ingredients_needed": "Tomato, onion, carrot",
          "steps": "First cut a tomato into pieces. Place it inside a frying pan and cook until all tomato become sauce. Then cut onion into smaller pieces and place it insde the tomato sauce.",
          "photo": "/static/images/tomatoSoup.jpg",
          "link": "https://thewoksoflife.com/stir-fried-tomato-and-egg/"
        },
        {
          "name": "Tomato Salad",
          "ingredients": ["tomato", "egg"],
          "allergies": ["egg"],
          "health_issue": ["hypercholesterolemia"],
          "calories": "306",
          "ingredients_needed": "Tomato, Egg",
          "steps": "First, boil an egg in a pot with boiling water for 10 minutes. After that peel the shell when it has cooled down. Cut it into smaller pieces. Then place it on a plate with sliced tomato.",
          "photo": "/static/images/tomatoSalad.jpg",
          "link": "https://thewoksoflife.com/stir-fried-tomato-and-egg/"
        },
        {
          "name": "Butandon",
          "ingredients": ["pork", "onion"],
          "allergies": [],
          "health_issue": [""],
          "calories": "848",
          "ingredients_needed": "Pork, onion, soy sauce",
          "steps": "Cut the pork into small and thin pieces. Then cut an onion into small pieces. Pour soy sauce, sake, mirin and all ingredients inside a frying pan and cook for 10 minutes.",
          "photo": "/static/images/butandon.jpg",
          "link": "https://thewoksoflife.com/stir-fried-tomato-and-egg/"
        },
        {
          "name": "Bake salmon",
          "ingredients": ["salmon"],
          "allergies": ["seafood"],
          "health_issue": [""],
          "calories": "848",
          "ingredients_needed": "Salmon, lemon(optional)",
          "steps": "First unskin the salmon. After that place it inside a baking tray and bake it for 30 mins in the oven of 200°C. After that squeeze some lemon on top.",
          "photo": "/static/images/bakeSalmon.jpg",
          "link": "https://thewoksoflife.com/stir-fried-tomato-and-egg/"
        },
        {
          "name": "Oyakodon",
          "ingredients": ["chicken", "egg", "onion"],
          "allergies": ["egg"],
          "health_issue": [""],
          "calories": "546",
          "ingredients_needed": "Chicken, egg, onion",
          "steps": "First cut the chicken into smaller pieces. Pour soy sauce, mirin, sake and sugar into a pot and place onion and chicken inside. Once cooked place scrambled egg on top and serve.",
          "photo": "/static/images/oyakodon.jpg",
          "link": "https://thewoksoflife.com/stir-fried-tomato-and-egg/"
        }
      ];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedIngredients = Array.from(
            form.querySelectorAll("#ingredients option:checked")
        ).map((option) => option.value);

        const selectedAllergies = Array.from(
            form.querySelectorAll("#allergies option:checked")
        ).map((option) => option.value);

        const selectedHealthIssues = Array.from(
            form.querySelectorAll("#health_issue option:checked")
        ).map((option) => option.value);

        const matchingRecipes = recipeData.filter((recipe) => {
            return (
                selectedIngredients.every((ingredient) =>
                    recipe.ingredients.includes(ingredient)
                ) &&
                !selectedAllergies.some((allergy) =>
                    recipe.allergies.includes(allergy)
                ) &&
                selectedHealthIssues.every((healthIssue) =>
                    recipe.health_issue.includes(healthIssue)
                )
            );
        });

        renderRecipes(matchingRecipes);
    });

    function renderRecipes(recipes) {
        recipesContainer.innerHTML = "";

        if (recipes.length > 0) {
            recipes.forEach((recipe) => {
                const recipeCard = document.createElement("div");
                recipeCard.className = "recipe-card";

                const recipeContent = `
                <div class="recipe-content">
                    <div class="recipe-left">
                        <h2 class="recipe-name">${recipe.name}</h2>
                        <img src="${recipe.photo}" alt="${recipe.name}">
                    </div>
                    <div class="recipe-right">
                        <p>Calories: ${recipe.calories} kcal</p>
                        <p>Ingredients needed: ${recipe.ingredients_needed}</p>
                        <p>Steps: ${recipe.steps}</p>
                        <!-- <p><a href="${recipe.link}">Link to Recipe</a></p> -->
                    </div>
                </div>
            `;

                recipeCard.innerHTML = recipeContent;
                recipesContainer.appendChild(recipeCard);
            });
        } else {
            recipesContainer.innerHTML = "<p>No matching recipes found.</p>";
        }
    }

    // Initialize MultiSelectTag instances here
    new MultiSelectTag('ingredients', {
        rounded: true,    // default true
            shadow: true,      // default false
            placeholder: 'Search',  // default Search...
            onChange: function(values) {
                console.log(values)
            }
    });

    new MultiSelectTag('allergies', {
        rounded: true,    // default true
            shadow: true,      // default false
            placeholder: 'Search',  // default Search...
            onChange: function(values) {
                console.log(values)
            }
    });

    new MultiSelectTag('health_issue', {
        rounded: true,    // default true
            shadow: true,      // default false
            placeholder: 'Search',  // default Search...
            onChange: function(values) {
                console.log(values)
            }
    });
});
