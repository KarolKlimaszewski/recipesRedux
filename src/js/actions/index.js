import {recipesRef, authRef, provider} from "../config/firebase";
import {
    SUBMIT_FORM,
    TOGGLE_FORM,
    FETCH_RECIPES,
    DELETE_RECIPE,
    ACTIVE_RECIPE_DISPLAY,
    TOGGLE_FILTERS,
    LAUNCH_FILTERS,
    CLEAR_FILTERS,
} from "../constants/action-types";

// RECIPES FORM ACTIONS

export const submitRecipe = (recipe, rID) => async dispatch => {
    dispatch({
        type: SUBMIT_FORM,
        payload: recipesRef.child(recipe.id).set(recipe)
    })
};

export const fetchRecipes = recipes => async dispatch => {
    recipesRef.on("value", snapshot => {
        dispatch({
            type: FETCH_RECIPES,
            payload: snapshot.val()
        });
    });
};

export const showForm = displayForm => ({
    type: TOGGLE_FORM,
    payload: displayForm
});

// RECIPES ITEMS ACTIONS

export const deleteRecipe = recipe => async dispatch => {
    dispatch({
        type: DELETE_RECIPE,
        payload: recipesRef.child(recipe.id).remove()
    })
};
export const activeRecipeDisplay = active => ({
    type: ACTIVE_RECIPE_DISPLAY,
    payload: active
})

// RECIPES FILTERS ACTIONS

export const toggleFilters = displayFilters => ({
    type: TOGGLE_FILTERS,
    payload: displayFilters
});
export const launchFilters = filters => ({
    type: LAUNCH_FILTERS,
    payload: filters
});
export const clearFilters = filters => ({
    type: CLEAR_FILTERS,
    payload: filters
})