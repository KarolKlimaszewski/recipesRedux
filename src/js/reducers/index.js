import {SUBMIT_FORM, TOGGLE_FORM, DELETE_RECIPE, TOGGLE_RECIPE, ACTIVE_RECIPE_DISPLAY, TOGGLE_FILTERS, LAUNCH_FILTERS, CLEAR_FILTERS } from "../constants/action-types";
import {RECIPES} from "../../js/RECIPES";
console.log(RECIPES);
const initialState = {
  articles: [],
  recipes: RECIPES,
  displayForm: true,
  displayRecipe: true,
  activeID: -1,
  active: {},
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
    case ACTIVE_RECIPE_DISPLAY:
      return Object.assign({}, state, {
        active: action.payload
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