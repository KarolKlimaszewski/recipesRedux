import React from "react";
import List from "./list.jsx";
import Header from "./header.jsx";
import Form from "./form.jsx";
import RecipeForm from "./recipeForm.jsx";
import RecipesList from "./recipes.jsx";

export default class App extends React.Component{
  render () {
  return <div className="container">
    <Header />
    <div className="col-md-4 offset-md-1">
      <h2>Recipes</h2>
      <RecipesList />
    </div>
    <RecipeForm />
  </div>
  }
};