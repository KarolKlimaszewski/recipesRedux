import React from "react";
import Header from "./header.jsx";
import RecipeForm from "./recipeForm.jsx";
import Recipes from "./recipesList.jsx";
import Filters from "./filters.jsx";

export default class App extends React.Component{
  render () {
  return <div className="container">
    <Header />
      <Filters />
      <h2>Recipes</h2>
      <Recipes />
    <RecipeForm />
  </div>
  }
};