export const ingredients_DATABASE = [
    "milk",
    "egg",
    "water",
    "flour",
    "salt",
    "sugar",
    "rice",
    "tomato",
    "potato",
];
export const units_DATABASE = [
    "tsp",
    "tbsp",
    "cup",
    "pint",
    "ml",
    "g",
    "lb",
    ""
];
export const ingredients_DATABASE_forSelect = ingredients_DATABASE.map(el => {
    return { value: el, label: el }
})
export const units_DATABASE_forSelect = units_DATABASE.map(el => {
    return {value: el, label: el}
})