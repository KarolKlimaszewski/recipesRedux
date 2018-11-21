import React, {Component} from "react";
import {connect} from "react-redux";

import {deleteRecipe, showRecipe} from "../js/actions/index";

const mapStateToProps = state => {
  return {recipes: state.recipes, displayRecipe: state.displayRecipe};
};

const mapDispatchToProps = dispatch => {
  return {
    showRecipe: displayRecipe => dispatch(showRecipe(displayRecipe)),
    deleteRecipe: recipe => dispatch(deleteRecipe(recipe))
  };
};

class RecipeHead extends Component {
  constructor(props) {
    super(props);

    this.handleShowRecipe = this
      .handleShowRecipe
      .bind(this);
    this.handleDeleteRecipe = this
      .handleDeleteRecipe
      .bind(this);
  }

  handleShowRecipe(e, el) {
    event.preventDefault();
    if (this.props.displayRecipe) {
      this
        .props
        .showRecipe(false);
    } else {
      this
        .props
        .showRecipe(true);
    }
  }

  handleDeleteRecipe(event, el) {
    this
      .props
      .deleteRecipe(this.props.recipes.indexOf(el));
  }

  render() {
    let recipesLength = this.props.recipes.length;
    return <div className="recipe__row--main">
      <div className="recipe__show" onClick={e => this.handleShowRecipe(e, el)}>hide</div>
      {/* <div className="recipe__categories">{categories}</div> */}
      <h2 className="recipe__title">title</h2>
    </div>
  }
}

const RecipeHeader = connect(mapStateToProps, mapDispatchToProps)(RecipeHead);
export default RecipeHeader;