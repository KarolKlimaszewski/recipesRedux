import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "underscore";
import {deleteRecipe, showRecipe, activeRecipe, activeRecipeDisplay, fetchRecipes} from "../js/actions/index";
import Filters from "./filters.jsx";
import Footer from "./footer.jsx";
import Loader from "./loader.jsx";
import RecipesListItem from "./recipesListItem.jsx";

import {HashRouter, Route, Link, Switch, NavLink} from 'react-router-dom';

const mapStateToProps = state => {
  return {recipes: state.main.recipes, filters: state.main.filters, data: state.data};
};

const mapDispatchToProps = dispatch => {
  return {
    activeRecipeDisplay: active => dispatch(activeRecipeDisplay(active)),
    fetchRecipes: recipes => dispatch(fetchRecipes(recipes))
  };
};

class RecipesList extends Component {
  constructor(props) {
    super(props);

    this.handleShowRecipe = this
      .handleShowRecipe
      .bind(this);
    this.onImgError = this
      .onImgError
      .bind(this);
  }

  componentWillMount() {
    this
      .props
      .fetchRecipes(this.props.data)
  }

  handleShowRecipe(e, el) {
    event.preventDefault();
    this
      .props
      .activeRecipeDisplay(el);
  }
  onImgError(event) {
    event
      .target
      .setAttribute('src', require("../../images/noimage.png"))
  }

  render() {
    if (this.props.data !== 'loading') {
      return <div>
        <div className="row">
          <Filters />
          <div className="recipe-list-container">
          <RecipesListItem />
          </div>
        </div>
        <Footer/>
      </div>
    }
    return <Loader/>
  }
}

const Recipes = connect(mapStateToProps, mapDispatchToProps)(RecipesList);
export default Recipes;