import {SUBMIT_FORM, TOGGLE_FORM, DELETE_RECIPE, TOGGLE_RECIPE, ACTIVE_RECIPE, TOGGLE_FILTERS, LAUNCH_FILTERS, CLEAR_FILTERS } from "../constants/action-types";
// import RECIPES_DATABASE from "../recipes";
const initialState = {
  articles: [],
  recipes: [{
        id: "2",
        title: "Baked Shrimp Scampi",
        recipeStepsArr: ["Preheat the oven to 425 degrees F.\n\nDefrost shrimp by putting in cold water, drain. Place the shrimp in serving dish (9x13 or 2 quart casserole) and toss gently with the olive oil, wine, 1 teaspoons salt, and 1 teaspoon pepper. Allow to sit at room temperature while you make the butter and garlic mixture.\n\nIn a small bowl, mash the softened butter with the garlic, shallots, parsley, rosemary, red pepper flakes, lemon zest, lemon juice, egg yolk, panko, 1/2 teaspoon salt, and 1/4 teaspoon of pepper until combined.\n\nSpread the butter mixture evenly over the shrimp. Bake for 10 to 12 minutes until hot and bubbly. If you like the top browned, place under a broiler for 1-3 minutes (keep an eye on it). Serve with lemon wedges and French bread.\n\nNote: if using fresh shrimp, arrange for presentation. Starting from the outer edge of a 14-inch oval gratin dish, arrange the shrimp in a single layer cut side down with the tails curling up and towards the center of the dish. Pour the remaining marinade over the shrimp. "],
        ingredientsArr: [
            "2/3 cup panko",
            "1/4 teaspoon red pepper flakes",
            "1/2 lemon, zested and juiced",
            "1 extra-large egg yolk",
            "1 teaspoon rosemary, minced",
            "3 tablespoon parsley, minced",
            "4 clove garlic, minced",
            "1/4 cup shallots, minced",
            "8 tablespoon unsalted butter, at room temperature",
            "2 tablespoon dry white wine",
            "Freshly ground black pepper",
            "Kosher salt",
            "3 tablespoon olive oil",
            "2 pound frozen shrimp"
        ],
        photo: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        category: [
            "seafood",
            "shrimp",
            "dinner"
        ]
    },
    {
        id: "4",
        title: "Strawberries Romanov (La Madeleine copycat)",
        recipeStepsArr: ["Wash strawberries and cut the tops off. Let strawberries drain.  Mix together heavy whipping cream, powdered sugar, and the brandy. Beat with a mixer till this becomes thick.  Place strawberries into glasses and spoon over the sauce.\n"],
        ingredientsArr: [
            "2 tbsp powdered sugar",
            "1/2 pt heavy whipping cream",
            "1 lb strawberries, (2 pints)",
            "4 tbsp brandy"
        ],
        photo: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        category: [
            "fruit",
            "dessert",
            "strawberries",
            "copycat",
            "untried"
        ]
    }],
  displayForm: true,
  displayRecipe: true,
  activeID: -1,
  displayFilters: true,
  filters: []
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      // Recipes form
    case SUBMIT_FORM:
      return Object.assign({}, state, {
        recipes: [...state.recipes, action.payload]
      });
    case TOGGLE_FORM:
      return Object.assign({}, state, {
        displayForm: action.payload
      });
      // Recipes
    case DELETE_RECIPE:
      return Object.assign({}, state, {
        recipes: [...state.recipes.slice(0, action.payload), ...state.recipes.slice(action.payload + 1)]
      });
    case TOGGLE_RECIPE:
      return Object.assign({}, state, {
        displayRecipe: action.payload
      });
    case ACTIVE_RECIPE:
      return Object.assign({}, state, {
        activeID: action.payload
      });
      // Filters
    case TOGGLE_FILTERS:
      return Object.assign({}, state, {
        displayFilters: action.payload
      });
    case LAUNCH_FILTERS:
      return Object.assign({}, state, {
        filters: action.payload
      });
    case CLEAR_FILTERS:
      return Object.assign({}, state, {
        filters: action.payload
      })
    default:
      return state;
  }
};
export default rootReducer;