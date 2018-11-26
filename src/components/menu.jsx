import React from "react";
import Header from "./header.jsx";
import RecipeForm from "./form.jsx";
import Recipes from "./recipesList.jsx";
import Filters from "./filters.jsx";
import DisplayRecipe from "./recipeDisplay.jsx";
import WelcomeComponent from "./dashboard.jsx";
import Login from "./login.jsx";
import {HashRouter, Route, Switch, NavLink} from 'react-router-dom';

export default class Menu extends React.Component {
  render() {
    return <ul className={"menu"}>
      <li className={"menu__item"}>
        <NavLink
          to={"/"}
          className={"menu__link"}
          activeClassName={"menu__link menu__link--active"}>Dashboard</NavLink>
      </li>
      <li className={"menu__item"}>
        <NavLink
          to={"/recipes"}
          className={"menu__link"}
          activeClassName={"menu__link menu__link--active"}>Recipes</NavLink>
      </li>
      <li className={"menu__item"}>
        <NavLink
          to={"/recipe-form"}
          className={"menu__link"}
          activeClassName={"menu__link menu__link--active"}>Add new recipe</NavLink>
      </li>
    </ul>
  }
};