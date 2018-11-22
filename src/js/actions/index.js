import {
    recipesRef,
    authRef,
    provider
} from "../config/firebase";
import {
    FETCH_USER,
    SUBMIT_FORM,
    TOGGLE_FORM,
    FETCH_RECIPES,
    DELETE_RECIPE,
    ACTIVE_RECIPE_DISPLAY,
    TOGGLE_FILTERS,
    LAUNCH_FILTERS,
    CLEAR_FILTERS,
    SIGN_IN,
    LOAD_RECIPE
} from "../constants/action-types";

// LOGIN

export const signIn = () => dispatch => {
    console.log(provider)
    authRef
        .signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: SIGN_IN,
                payload: true
            })
        })
        .catch(error => {
            console.log(error);
        });
};

export const signOut = () => dispatch => {
    authRef
        .signOut()
        .then(() => {
            // Sign-out successful.
        })
        .catch(error => {
            console.log(error);
        });
};

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user
            });
        } else {
            dispatch({
                type: FETCH_USER,
                payload: null
            });
        }
    });
};

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

export const loadRecipe = id => async dispatch => {
    recipesRef.child(id).on("value", snapshot => {
        dispatch({
            type: LOAD_RECIPE,
            payload: snapshot.val()
        });
    });
};

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