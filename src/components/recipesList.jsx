import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { deleteRecipe, showRecipe, activeRecipe, activeRecipeDisplay } from "../js/actions/index";
import Filters from "./filters.jsx";

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
        active: state.active,
        filters: state.filters
    };
};

const mapDispatchToProps = dispatch => {
    return {
        activeRecipeDisplay: active => dispatch(activeRecipeDisplay(active))
    };
};

class RecipesList extends Component {
    constructor(props) {
        super(props);

        this.handleShowRecipe = this.handleShowRecipe.bind(this);
    }

    handleShowRecipe(e, el) {
        event.preventDefault();
        this.props.activeRecipeDisplay(el);
    }

    render() {
        let filtered = this.props.recipes;
        if(this.props.filters.length > 0) {
            filtered = this.props.filters
        }
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
                    return <div className={"recipe-mini-container col s3"} key={"recipe" + i}>
                        <div className="recipe__row--main">
                            <NavLink to={"/recipes/:" + el.id} className={"menu__link"}
                                className={"waves-effect waves-light btn"} onClick={e => this.handleShowRecipe(e, el)}>show</NavLink>
                            <div className="recipe__categories">{categories}</div>
                        </div>
                            <h6 className="recipe__title">{el.title}</h6>
                        <img src={el.photo} alt="See this? Please try to update photo address (url)."
                            className="recipe__img" />
                    </div>
        });
        return <div className="row">
        {recipes}
        </div>
    }
}


const Recipes = connect(mapStateToProps, mapDispatchToProps)(RecipesList);
export default Recipes;