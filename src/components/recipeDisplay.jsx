import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { deleteRecipe, showRecipe, activeRecipeDisplay } from "../js/actions/index";

import {NavLink} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        displayRecipe: state.displayRecipe,
        activeID: state.activeID,
        active: state.active,
        filters: state.filters
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showRecipe: displayRecipe => dispatch(showRecipe(displayRecipe)),
        deleteRecipe: recipe => dispatch(deleteRecipe(recipe)),
        activeRecipeDisplay: active => dispatch(activeRecipeDisplay(active))
    };
};

class ShowRecipe extends Component {
    constructor(props) {
        super(props);

        this.handleShowRecipe = this.handleShowRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }

    handleShowRecipe(e, el) {
        event.preventDefault();
        if (this.props.activeID === el.id) {
            this.props.showRecipe(false)
            this.props.activeRecipe(-1)
        } else {
            this.props.activeRecipe(el.id);
            this.props.showRecipe(true)
        }
    }

    handleDeleteRecipe(event, el) {
        this.props.deleteRecipe(this.props.recipes.indexOf(el));
    }

    render() {
            let step = this.props.active.recipeStepsArr.map((step, i) => {
                return <li key={"recipeStep" + i} className="recipe__steps-list-item">{step}</li>
            })
            let ing = this.props.active.ingredientsArr.map((ing, i) => {
                return <p key={"ingredient" + i} className={"recipe__ingredients-item"}>{ing}</p>
            })
        return <div className={"recipe col s12"} key={this.props.active.id}>
            <div className="recipe__row--main">
                <NavLink to={"/recipes"} className={"menu__link"}
                    className={"waves-effect waves-light btn"}>back</NavLink>
                <h2 className="recipe__title">{this.props.active.title}</h2>
            </div>
            <div className="recipe__row">
                <div className="recipe__photo">
                    <img src={this.props.active.photo} alt="See this? Please try to update photo address (url)."
                        className="recipe__img" />
                </div>
                <div className="recipe__text">
                    <h3 className={"recipe__ingredients-title"}>Ingredients:</h3>
                    <div className="recipe__ingredients">
                        {ing}
                    </div>
                </div>
            </div>
            <div className="recipe__row">
                <ul className={"recipe__steps-list"}>
                    {step}
                </ul>
            </div>
            <div className="recipe__row recipe__row-edit">
                <a className={"recipe__delete waves-effect waves-light btn"}
                    onClick={e => this.handleEditRecipe(e, this.props.active)}>edit</a>
                <NavLink to={"/recipes"} className={"recipe__delete waves-effect waves-light btn"} 
                    onClick={e => this.handleDeleteRecipe(e, this.props.active)}>delete</NavLink>
            </div>
        </div>
    }
}


const DisplayRecipe = connect(mapStateToProps, mapDispatchToProps)(ShowRecipe);
export default DisplayRecipe;