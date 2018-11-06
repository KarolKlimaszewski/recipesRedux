import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { deleteRecipe, showRecipe, activeRecipe } from "../js/actions/index";

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        displayRecipe: state.displayRecipe,
        activeID: state.activeID,
        categoryFilter: state.categoryFilter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showRecipe: displayRecipe => dispatch(showRecipe(displayRecipe)),
        deleteRecipe: recipe => dispatch(deleteRecipe(recipe)),
        activeRecipe: activeID => dispatch(activeRecipe(activeID))
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
        let catFilter = this.props.categoryFilter.map(cat => cat);
        let filtred = _.filter(this.props.recipes, (el) => {
            if (this.props.categoryFilter.length >= 1) {
                return el.category.includes(catFilter.toString())
            }else{
                return el
            }
        });
        let recipes = filtred.map((el, i) => {
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
                    return <div className="recipe__category" style={{ backgroundColor: "brown" }}>{cat}</div>
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
                            <a className=" waves-effect waves-light btn-large" onClick={e => this.handleShowRecipe(e, el)}>hide</a>
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
                            <a className="recipe__delete waves-effect waves-light btn-large" onClick={e => this.handleDeleteRecipe(e, el)}>Delete
                        </a>
                        </div>
                    </div>
                } else {
                    return <div className={"recipe col s3"} key={"recipe" + i}>
                        <div className="recipe__row--main">
                            <a className=" waves-effect waves-light btn-large" onClick={e => this.handleShowRecipe(e, el)}>show</a>
                            <div className="recipe__categories">{categories}</div>
                        </div>
                            <h2 className="recipe__title">{el.title}</h2>
                    </div>
                }
        });
        return <div className="row">{recipes}</div>
    }
}


const Recipes = connect(mapStateToProps, mapDispatchToProps)(RecipesList);
export default Recipes;