import {SUBMIT_FORM, TOGGLE_FORM, DELETE_RECIPE, TOGGLE_RECIPE, ACTIVE_RECIPE } from "../constants/action-types";
const initialState = {
  articles: [],
  recipes: [{
    title: "test title",
      ingredientsArr: ["składnik", "składnik 2"],
      photo: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      recipeStepsArr: ["step", "step2", "step3", "step4", "step5"],
      category: ["kategoria", "test"],
      id: 1
  },
  // {
  //   title: "test title",
  //   ingredientsArr: ["składnik", "składnik 2"],
  //   photo: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   recipeStepsArr: ["step", "step2", "step3", "step4", "step5"],
  //   category: ["kategoria"],
  //   id: 2
  // },
  // {
  //   title: "test title",
  //   ingredientsArr: ["składnik", "składnik 2"],
  //   photo: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   recipeStepsArr: ["step", "step2", "step3", "step4", "step5"],
  //   category: ["kategoria"],
  //   id: 3
  // },
{
  title: "test title",
  ingredientsArr: ["składnik", "składnik 2"],
  photo: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  recipeStepsArr: ["step", "step2", "step3", "step4", "step5"],
  category: ["kategoria", "snack"],
  id: 4
}],
  displayForm: true,
  displayRecipe: true,
  active: -1
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
        active: action.payload
      });
    default:
      return state;
  }
};
export default rootReducer;