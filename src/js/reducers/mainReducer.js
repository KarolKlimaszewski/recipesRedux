import {SUBMIT_FORM, TOGGLE_FORM, DELETE_RECIPE, TOGGLE_FILTERS, LAUNCH_FILTERS, CLEAR_FILTERS, LOAD_RECIPE } from "../constants/action-types";
const initialState = {
  articles: [],
  displayForm: true,
  displayRecipe: false,
  displayFilters: false,
  filters: [],
  activeRecipe: null
};
export default (state = initialState, action) => {
  switch (action.type) {
      // Recipes form
    case SUBMIT_FORM:
      return Object.assign({}, state);
    case TOGGLE_FORM:
      return Object.assign({}, state, {
        displayForm: action.payload
      });
      // Recipes
    case DELETE_RECIPE:
      return Object.assign({}, state);
    case LOAD_RECIPE:
      return Object.assign({}, state, {
        activeRecipe: action.payload
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