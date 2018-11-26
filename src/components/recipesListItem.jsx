import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { deleteRecipe, showRecipe, activeRecipe, activeRecipeDisplay, fetchRecipes } from "../js/actions/index";
import Filters from "./filters.jsx";
import Footer from "./footer.jsx";
import Loader from "./loader.jsx";

import { HashRouter, Route, Link, Switch, NavLink } from 'react-router-dom';

const mapStateToProps = state => {
    return { recipes: state.main.recipes, filters: state.main.filters, data: state.data };
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
        const data = this.props.data;
        let filtered = _.values(data, el => el);
        if (this.props.filters.length > 0) {
            filtered = this.props.filters
        }
        let recipes = filtered.map((el, i) => {
            let categories = el
                .category
                .map(cat => {
                    if (cat === "snack") {
                        return <div
                            key={'snack_' + i}
                            className="recipe-mini__category recipe-mini__category--snack"></div>
                    } else if (cat === "breakfast") {
                        return <div
                            key={'breakfast_' + i}
                            className="recipe-mini__category recipe-mini__category--breakfast"></div>
                    } else if (cat === "dinner") {
                        return <div
                            key={'dinner_' + i}
                            className="recipe-mini__category recipe-mini__category--dinner"></div>
                    } else if (cat === "dessert") {
                        return <div
                            key={'dessert_' + i}
                            className="recipe-mini__category recipe-mini__category--dessert"></div>
                    } else if (cat === "drink") {
                        return <div
                            key={'drink_' + i}
                            className="recipe-mini__category recipe-mini__category--drink"></div>
                    }
                })
            return <div className={"recipe-mini-container"} key={"recipe_" + i}>
                    <NavLink
                        to={"/recipes/:" + el.id}
                        className="recipe-mini__link"
                        onClick={e => this.handleShowRecipe(e, el)}>
                        <div className="recipe-mini__img-container">
                            <img
                                src={el.photo}
                                alt={el.title}
                                className="recipe-mini__img"
                                onError={this.onImgError} />
                        </div>
                        <div className="recipe-mini-header">
                            <h6 className="recipe-mini__title">{el.title}</h6>
                            <div className="recipe-mini__category-container">{categories}</div>
                        </div>
                    </NavLink>
                    <p className="recipe-mini__description">
                        {el.preview}
                    </p>
                </div>
        });
        if (this.props.data !== 'loading') {
            return <div>
                <div className="row recipe-list-container">
                    {recipes}
                </div>
                <Footer />
            </div>
        }
        return <Loader />
    }
}

const RecipesListItem = connect(mapStateToProps, mapDispatchToProps)(RecipesList);
export default RecipesListItem;