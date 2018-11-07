import React from "react";
import Header from "./header.jsx";
import RecipeForm from "./recipeForm.jsx";
import Recipes from "./recipesList.jsx";
import Filters from "./filters.jsx";

import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

export default class App extends React.Component{
  render () {
    return <div className="container">
      <HashRouter>
          <div>
            <Header />
          <ul className={"menu"}>
            <li className={"menu__item"}><NavLink to={"/"} className={"menu__link"}
              activeStyle={{ color: "navy" }}>Main page</NavLink>
            </li>
            <li className={"menu__item"}><NavLink to={"/filters"} className={"menu__link"}
              activeStyle={{ color: "navy" }}>Filters</NavLink>
            </li>
            <li className={"menu__item"}><NavLink to={"/recipes"} className={"menu__link"}
              activeStyle={{ color: "navy" }}>Recipes</NavLink></li>
            <li className={"menu__item"}><NavLink to={"/recipe-form"} className={"menu__link"}
              activeStyle={{ color: "navy" }}>Add new recipe</NavLink></li>
          </ul>
        <Switch>
          {/* <Route exact path='/' component={Header} /> */}
          <Route path='/filters' component={Filters} />
          <Route path='/recipes' component={Recipes} />
          <Route path='/recipe-form' component={RecipeForm} />
        </Switch>
          </div>
      </HashRouter>
            {/* <Header />
            <Filters />
            <h2>Recipes</h2>
            <Recipes />
            <RecipeForm /> */}
          </div>
  }
};