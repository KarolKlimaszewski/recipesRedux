import React, { Component } from "react";
import { connect } from "react-redux";
import { showForm, submitRecipe } from "../js/actions/index";
import {checkboxes} from "../js/checkboxes";

import uuidv1 from "uuid";

const mapStateToProps = state => {
    return {displayForm: state.displayForm};  
};

const mapDispatchToProps = dispatch => {
    return {
        showForm: displayForm => dispatch(showForm(displayForm)),
        submitRecipe: recipe => dispatch(submitRecipe(recipe))
    };
};

class RecipeForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            ingredients: "",
            ingredientsArr: [],
            photo: "",
            recipeSteps: "",
            recipeStepsArr: [],
            category: [],
        }
        this.handleFormDisplay = this.handleFormDisplay.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handlePhotoUrlChange = this.handlePhotoUrlChange.bind(this);
        this.handleRecipeStepsChange = this.handleRecipeStepsChange.bind(this);
        this.handleAddRecipeStep = this.handleAddRecipeStep.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFormDisplay(event) {
        event.preventDefault();
        this.props.showForm(!this.props.displayForm)
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleCheckboxChange(event) {
        if (this.state.category.includes(event.target.value)) {
            let categoryArray = [...this.state.category];
            let index = categoryArray.indexOf(event.target.value);
            categoryArray.splice(index, 1);
            this.setState({
                category: categoryArray
            })
        } else {
            this.setState({
                category: [...this.state.category, event.target.value],
            })
        }
    }

    handleIngredientsChange(event) {
        this.setState({
            ingredients: event.target.value
        })
    }

    handleAddIngredient(event) {
        event.preventDefault();
        this.state.ingredientsArr.push(this.state.ingredients);
        this.setState({
            ingredients: ""
        })
    }

    handleAddRecipeStep(event) {
        event.preventDefault();
        this.state.recipeStepsArr.push(this.state.recipeSteps);
        this.setState({
            recipeSteps: ""
        })
    }

    handlePhotoUrlChange(event) {
        this.setState({
            photo: event.target.value
        })
    }

    handleRecipeStepsChange(event) {
        this.setState({
            recipeSteps: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title, ingredientsArr, photo, recipeStepsArr, category } = this.state;
        const id = uuidv1();
        if (title === "" || ingredientsArr === [] || photo === "" || recipeStepsArr === [] || category === []) {
            alert('fill all fields.');
        }
        else {
            this.props.submitRecipe({ title, ingredientsArr, photo, recipeStepsArr, category, id });
            this.setState({
                title: "",
                ingredients: "",
                ingredientsArr: [],
                photo: "",
                recipeSteps: "",
                recipeStepsArr: [],
                category: [],
            })
            this.props.showForm(false);
        }
    }
    render() {
        let ingredients = this.state.ingredientsArr.map((el, i) => {
            return <div key={i} className="ingredients-item">{el}</div>
        })
        let recipeSteps = this.state.recipeStepsArr.map((el, i) => {
            return <div key={i} className="ingredients-item">{el}</div>
        })
        let checkbox = checkboxes.map((el, i) => {
            return <p key={i}>
                <label>
                    <input type="checkbox" className="filled-in" onChange={this.handleCheckboxChange} value={el.value} />
                    <span>{el.name}</span>
                </label>
            </p>
        })
        if(this.props.displayForm) {
        return <div className="recipe-form">
            <a className="recipe__add waves-effect waves-light btn" onClick={this.handleFormDisplay}>+ Add recipe</a>
            <div className="row">
            <form className="form col s12">
                <div className="input-field col s6">
                    <input id="title" value={this.state.title}
                        onChange={this.handleTitleChange} />
                    <label htmlFor="title" className="active">Your recipe title:</label>
                </div>
                <div className="input-field col s6">
                    <input id="photo" value={this.state.photo}
                        onChange={this.handlePhotoUrlChange} />
                    <label htmlFor="photo" className="active">Photo Url:</label>
                </div>
                <div className="input-field col s6">
                    <input id="ingredients" value={this.state.ingredients}
                        onChange={this.handleIngredientsChange} />
                    <label htmlFor="ingredients" className="active">Ingredients:</label>
                    <div className="ingredients">{ingredients}</div>
                    <button className="ingredients__add waves-effect waves-light btn" onClick={this.handleAddIngredient}>Add ingredient</button>
                </div>
                <div className="input-field col s6">
                    <input id="recipeSteps" value={this.state.recipeSteps}
                        onChange={this.handleRecipeStepsChange} />
                    <label htmlFor="recipeSteps" className="active">Recipe steps:</label>
                    <div className="ingredients">{recipeSteps}</div>
                    <button className="ingredients__add waves-effect waves-light btn" onClick={this.handleAddRecipeStep}>Add recipe step</button>
                </div>
                <p className="form__description col s12">
                    Category:
                    </p>
                <div className="form__checkboxes col s12">
                    {checkbox}
                </div>
                <button type={"submit"} className={"form__submit btn waves-effect waves-light col s12"} onClick={this.handleSubmit}>
                <i className="material-icons">Submit</i>
                    </button>
                </form>
            </div>
        </div>
    }else{
            return <div className="recipe-form">
            <button className="recipe__add waves-effect waves-light btn" onClick={this.handleFormDisplay}>+ Add recipe</button>
        </div>
    }
}
}
const Form = connect(mapStateToProps, mapDispatchToProps)(RecipeForm);
export default Form;