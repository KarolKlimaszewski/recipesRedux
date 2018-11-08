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
export const ingredients_DATABASE_forSelect = ingredients_DATABASE.map(el => {
    console.log(el);
    return { value: el, label: el }
})