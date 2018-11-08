// RECIPES FORM ACTIONS
export const submitRecipe = recipe => ({
    type: "SUBMIT_FORM",
    payload: recipe
});

export const showForm = displayForm => ({
    type: "TOGGLE_FORM",
    payload: displayForm
});

// RECIPES ITEMS ACTIONS

export const deleteRecipe = recipe => ({
    type: "DELETE_RECIPE",
    payload: recipe
});
export const showRecipe = displayRecipe => ({
    type: "TOGGLE_RECIPE",
    payload: displayRecipe
});
export const activeRecipeDisplay = active => ({
    type: "ACTIVE_RECIPE_DISPLAY",
    payload: active
})

// RECIPES FILTERS ACTIONS

export const toggleFilters = displayFilters => ({
    type: "TOGGLE_FILTERS",
    payload: displayFilters
});
export const launchFilters = filters => ({
    type: "LAUNCH_FILTERS",
    payload: filters
});
export const clearFilters = filters => ({
    type: "CLEAR_FILTERS",
    payload: filters
})