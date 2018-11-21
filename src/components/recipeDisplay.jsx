import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "underscore";
import {deleteRecipe, showRecipe, activeRecipeDisplay} from "../js/actions/index";

import {NavLink} from 'react-router-dom';

const mapStateToProps = state => {
  return {recipes: state.recipes, activeID: state.main.activeID, active: state.main.active};
};

const mapDispatchToProps = dispatch => {
  return {
    // showRecipe: displayRecipe => dispatch(showRecipe(displayRecipe)),
    deleteRecipe: recipe => dispatch(deleteRecipe(recipe)),
    // activeRecipeDisplay: active => dispatch(activeRecipeDisplay(active))
  };
};

class ShowRecipe extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteRecipe = this
      .handleDeleteRecipe
      .bind(this);
  }

  handleDeleteRecipe(event, el) {
    this
      .props
      .deleteRecipe(el);
  }

  render() {
    let step = this
      .props
      .active
      .recipeStepsArr
      .map((step, i) => {
        return <p key={"recipeStep" + i} className="recipe-steps-list__item">{step}</p>
      })
    let ing = this
      .props
      .active
      .ingredientsArr
      .map((ing, i) => {
        return <p key={"ingredient" + i} className={"recipe__ingredients-item"}>{ing.amount}{ing.unit}
          of {ing.title}</p>
      })
    return <div className={"recipe-container"}>
      <NavLink
        to={"/recipes"}
        className={"menu__link"}
        className={"filter-btn waves-effect waves-light btn"}>back</NavLink>
      <h2 className="recipe__title">{this.props.active.title}</h2>
      <div className="recipe__img-container">
        <img
          src={this.props.active.photo}
          alt="See this? Please try to update photo address (url)."
          className="recipe__img"/>
      </div>
      <div className="recipe__text">
        <h3 className={"recipe__ingredients-title"}>Ingredients:</h3>
        <div className="recipe__ingredients">
          {ing}
        </div>
      </div>
      <div className="recipe__row">
        <div className={"recipe-steps-list"}>
          {step}
        </div>
      </div>
      <div className="recipe__row recipe__row-edit">
        <a
          className={"recipe__delete waves-effect waves-light btn"}
          onClick={e => this.handleEditRecipe(e, this.props.active)}>edit</a>
        <NavLink
          to={"/recipes"}
          className={"recipe__delete waves-effect waves-light btn"}
          onClick={e => this.handleDeleteRecipe(e, this.props.active)}>delete</NavLink>
      </div>
    </div>
  }
}

const DisplayRecipe = connect(mapStateToProps, mapDispatchToProps)(ShowRecipe);
export default DisplayRecipe;