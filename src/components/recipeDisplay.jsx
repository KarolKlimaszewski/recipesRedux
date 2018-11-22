import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "underscore";
import {deleteRecipe, showRecipe, activeRecipeDisplay, loadRecipe} from "../js/actions/index";
import Loader from "./loader.jsx";

import {NavLink} from 'react-router-dom';

const mapStateToProps = state => {
  return { recipes: state.recipes, activeID: state.main.activeID, activeRecipe: state.main.activeRecipe};
};

const mapDispatchToProps = dispatch => {
  return {
    // showRecipe: displayRecipe => dispatch(showRecipe(displayRecipe)),
    deleteRecipe: recipe => dispatch(deleteRecipe(recipe)),
    loadRecipe: id => dispatch(loadRecipe(id)),
  };
};

class ShowRecipe extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteRecipe = this
      .handleDeleteRecipe
      .bind(this);
  }

  componentWillMount() {
    this
      .props
      .loadRecipe(this.props.match.params.id.substr(1));
  }

  handleDeleteRecipe(event, el) {
    this
      .props
      .deleteRecipe(el);
  }

  render() {
      if(this.props.activeRecipe) {
        console.log(this.props.activeRecipe)
        let step = this
          .props
          .activeRecipe
          .recipeStepsArr
          .map((step, i) => {
            return <p key={"recipeStep" + i} className="recipe-steps-list__item">{step}</p>
          })
        let ing = this
          .props
          .activeRecipe
          .ingredientsArr
          .map((ing, i) => {
            return <p key={"ingredient" + i} className={"recipe__ingredients-item"}>{ing.amount}{ing.unit}
              of {ing.title}</p>
          })
    return <div className={"recipe-container"}>
      <NavLink
        to={"/recipes"}
        className={"filter-btn waves-effect waves-light btn"}>back</NavLink>
      <h2 className="recipe__title">{this.props.activeRecipe.title}</h2>
      <div className="recipe__img-container">
        <img
          src={this.props.activeRecipe.photo}
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
      return <Loader />
  }
}

const DisplayRecipe = connect(mapStateToProps, mapDispatchToProps)(ShowRecipe);
export default DisplayRecipe;