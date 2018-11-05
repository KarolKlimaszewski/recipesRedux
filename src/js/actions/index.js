export const addArticle = article => ({
    type: "ADD_ARTICLE",
    payload: article
});

export const deleteArticle = article => ({
    type: "DELETE_ARTICLE",
    payload: article
});

// RECIPES FORM ACTIONS

export const submitRecipe = recipe => ({
    type: "SUBMIT_RECIPE",
    payload: recipe
});

export const showForm = displayForm => ({
    type: "TOGGLE_FORM",
    payload: displayForm
});