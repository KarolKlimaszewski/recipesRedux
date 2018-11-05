import { ADD_ARTICLE, DELETE_ARTICLE, SUBMIT_RECIPE, TOGGLE_FORM } from "../constants/action-types";
const initialState = {
  articles: [],
  recipes: [{
    title: "test",
      ingredientsArr: ["składnik", "składnik 2"],
      photo: "url",
      recipeStepsArr: ["step"],
      category: ["kategoria"],
  }],
  displayForm: true
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Articles
    case ADD_ARTICLE:
      return Object.assign({}, state, 
        {articles: [...state.articles, action.payload] 
      });
    case DELETE_ARTICLE:
      return Object.assign({}, state, {
        articles: [...state.articles.slice(0, action.payload), ...state.articles.slice(action.payload + 1)]
      });
      // Recipes
    case SUBMIT_RECIPE:
      return Object.assign({}, state, 
        {recipes: [...state.recipes, action.payload]
      });
      // Recipes form
    case TOGGLE_FORM:
      return Object.assign({}, state, 
        {displayForm: action.payload
      });
    default:
      return state;
  }
};
export default rootReducer;