import React from "react";
import Header from "./header.jsx";
import RecipeForm from "./form.jsx";
import Recipes from "./recipesList.jsx";
import DisplayRecipe from "./recipeDisplay.jsx";
import Dashboard from "./dashboard.jsx";
import Login from "./login.jsx";
import Menu from "./menu.jsx";
import {HashRouter, Route, Switch, NavLink} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return <HashRouter>
      <div>
        <Header/>
        <Menu/>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/recipes' component={Recipes}/>
          <Route path='/recipes/:id' component={DisplayRecipe}/>
          <Route path='/recipe-form' component={RecipeForm}/>
        </Switch>
      </div>
    </HashRouter>
  }
};