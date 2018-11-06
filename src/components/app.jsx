import React from "react";
import Header from "./header.jsx";
import RecipeForm from "./recipeForm.jsx";
import Recipes from "./recipesList.jsx";

export default class App extends React.Component{
  render () {
  return <div className="container">
    <Header />
    <div className="">
      <h2>Recipes</h2>
      <Recipes />
    </div>
    <RecipeForm />
  </div>
  }
};