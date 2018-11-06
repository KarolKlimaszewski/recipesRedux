// RECIPES FORM ACTIONS

export const submitRecipe = recipe => ({
    type: "SUBMIT_FORM",
    payload: recipe
});

export const showForm = displayForm => ({
    type: "TOGGLE_FORM",
    payload: displayForm
});

// RECIPES ACTIONS

export const deleteRecipe = recipe => ({
    type: "DELETE_RECIPE",
    payload: recipe
});
export const showRecipe = displayRecipe => ({
    type: "TOGGLE_RECIPE",
    payload: displayRecipe
});
export const activeRecipe = active => ({
    type: "ACTIVE_RECIPE",
    payload: active
})