import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { deleteRecipe, showRecipe, activeRecipe, activeRecipeDisplay } from "../js/actions/index";

import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

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
        activeRecipe: activeID => dispatch(activeRecipe(activeID)),
        activeRecipeDisplay: active => dispatch(activeRecipeDisplay(active))
    };
};

class RecipesList extends Component {
    constructor(props) {
        super(props);

        this.handleShowRecipe = this.handleShowRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }

    handleShowRecipe(e, el) {
        event.preventDefault();
        this.props.activeRecipeDisplay(el);
        // if (this.props.activeID === el.id) {
        //     this.props.showRecipe(false)
        //     this.props.activeRecipe(-1)
        // } else {
        //     this.props.activeRecipe(el.id);
        //     this.props.activeRecipeDisplay(el);
        //     this.props.showRecipe(true);
        // }
    }

    handleDeleteRecipe(event, el) {
        this.props.deleteRecipe(this.props.recipes.indexOf(el));
    }

    render() {
        // let catFilter = this.props.filters.category.map(cat => cat);
        // let filtered = _.filter(this.props.recipes, (el) => {
        //     if (!_.isEmpty(this.props.filters)) {
        //         if(this.props.filters.category.length > 0) {
        //         return el.category.includes(catFilter.toString())
        //         }else{
        //             return el
        //         }
        //     }else{
        //         return el
        //     }
        // });
        let filtered = this.props.recipes;
        if(this.props.filters.length > 0) {
            filtered = this.props.filters
        }
            // if (!_.isEmpty(that.props.filtered)) {
            //     console.log('isnt empty')
            //     return that.props.filtered
            // }else{
            //     console.log('is empty')
            //     return that.props.recipes
            // }
        let recipes = filtered.map((el, i) => {
            let categories = el.category.map(cat => {
                if (cat === "snack") {
                    return <div className="recipe__category" style={{ backgroundColor: "red" }}>{cat}</div>
                } else if (cat === "breakfast") {
                    return <div className="recipe__category" style={{ backgroundColor: "green" }}>{cat}</div>
                } else if (cat === "dinner") {
                    return <div className="recipe__category" style={{ backgroundColor: "blue" }}>{cat}</div>
                } else if (cat === "dessert") {
                    return <div className="recipe__category" style={{ backgroundColor: "yellow" }}>{cat}</div>
                } else {
                    return <div className="recipe__category" style={{ backgroundColor: "tomato" }}>{cat}</div>
                }
            })
            let step = el.recipeStepsArr.map((step, i) => {
                return <li key={"recipeStep" + i} className="recipe__steps-list-item">{step}</li>
            })
            let ing = el.ingredientsArr.map((ing, i) => {
                return <p key={"ingredient" + i} className={"recipe__ingredients-item"}>{ing}</p>
            })
                if (el.id === this.props.activeID) {
                    return <div className={"recipe col s12"} key={el.id}>
                        <div className="recipe__row--main">
                            <a className=" waves-effect waves-light btn" onClick={e => this.handleShowRecipe(e, el)}>hide</a>
                            {/* <div className="recipe__categories">{categories}</div> */}
                            <h2 className="recipe__title">{el.title}</h2>
                        </div>
                        <div className="recipe__row">
                            <div className="recipe__photo">
                                <img src={el.photo} alt="See this? Please try to update photo address (url)."
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
                            <a className="recipe__delete waves-effect waves-light btn" onClick={e => this.handleDeleteRecipe(e, el)}>Delete
                        </a>
                        </div>
                    </div>
                } else {
                    return <div className={"recipe col s6"} key={"recipe" + i}>
                        <div className="recipe__row--main">
                            <NavLink to={"/recipes/:" + el.id} className={"menu__link"}
                                className={"waves-effect waves-light btn"} onClick={e => this.handleShowRecipe(e, el)}>show</NavLink>
                            {/* <a className=" waves-effect waves-light btn" onClick={e => this.handleShowRecipe(e, el)}>show</a> */}
                            <div className="recipe__categories">{categories}</div>
                        </div>
                            <h6 className="recipe__title">{el.title}</h6>
                    </div>
                }
        });
        return <div className="row">{recipes}</div>
    }
}


const Recipes = connect(mapStateToProps, mapDispatchToProps)(RecipesList);
export default Recipes;