import React from "react";
import Header from "./header.jsx";
import RecipeForm from "./form.jsx";
import Recipes from "./recipesList.jsx";
import Filters from "./filters.jsx";
import DisplayRecipe from "./recipeDisplay.jsx";
import WelcomeComponent from "./welcome.jsx";
import {
    HashRouter,
    Route,
    Switch,
    NavLink,
} from 'react-router-dom';

export default class App extends React.Component{
  render () {
    return <div className="">
      <HashRouter>
        <div>
          <Header />
          <ul className={"menu"}>
            <li className={"menu__item"}><NavLink to={"/"} className={"menu__link"}
              activeClassName={"menu__link menu__link--active-main"}>Main page</NavLink>
            </li>
            <li className={"menu__item"}><NavLink to={"/filters"} className={"menu__link"}
              activeClassName={"menu__link menu__link--active"}>Filters</NavLink>
            </li>
            <li className={"menu__item"}><NavLink to={"/recipes"} className={"menu__link"}
              activeClassName={"menu__link menu__link--active"}>Recipes</NavLink></li>
            <li className={"menu__item"}><NavLink to={"/recipe-form"} className={"menu__link"}
              activeClassName={"menu__link menu__link--active"}>Add new recipe</NavLink></li>
          </ul>
            <Switch>
              <Route exact path='/' component={WelcomeComponent} />
              <Route path='/filters' component={Filters} />
              <Route exact path='/recipes' component={Recipes} />
              <Route path='/recipes/:id' component={DisplayRecipe} />
              <Route path='/recipe-form' component={RecipeForm} />
            </Switch>
        </div>
      </HashRouter>
          </div>
  }
};