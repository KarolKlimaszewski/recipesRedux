import React, { Component } from "react";
import { connect } from "react-redux";
import { showForm } from "../js/actions/index";
import { submitRecipe } from "../js/actions/index";

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
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handlePhotoUrlChange = this.handlePhotoUrlChange.bind(this);
        this.handleRecipeStepsChange = this.handleRecipeStepsChange.bind(this);
        this.handleAddRecipeStep = this.handleAddRecipeStep.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFormDisplay(event) {
        event.preventDefault();
        if(this.props.displayForm) {
        this.props.showForm(false);
        }else{
            this.props.showForm(true);
        }
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
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
        const { title, ingredients, ingredientsArr, photo, recipeSteps, recipeStepsArr, category } = this.state;
        const id = uuidv1();
        if (title === "" || ingredientsArr === [] || photo === "" || recipeStepsArr === []) {
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
        let ingredients = this.state.ingredientsArr.map((el) => {
            return <div className="ingredients-item">{el}</div>
        })
        let recipeSteps = this.state.recipeStepsArr.map((el) => {
            return <div className="ingredients-item">{el}</div>
        })
        if(this.props.displayForm) {
        return <div>
            <button className="recipe__add" onClick={this.handleFormDisplay}>+</button>
            <form className="form" style={{ display: this.props.showForm }}>
                <p className="form__description">
                    Your recipe title:
                </p>
                <input className={"form__input"} type="text" placeholder={"Title..."}
                    value={this.state.title}
                    onChange={this.handleTitleChange} />
                <p className="form__description">
                    Category:
                    </p>
                <p className="form__description">
                    Ingredients:
                </p>


                    <div className="ingredients">{ingredients}</div>
                <input className={"form__input"} type="text" placeholder={"Ingredients..."}
                    value={this.state.ingredients}
                    onChange={this.handleIngredientsChange} />
                    <button className="ingredients__add" onClick={this.handleAddIngredient}>Add ingredient</button>
                <p className="form__description">
                    Photo Url:
                    </p>
                <input className={"form__input"} type="text" placeholder={"Your photo URL..."}
                    value={this.state.photo}
                    onChange={this.handlePhotoUrlChange} />
                <p className="form__description">
                    Recipe steps:
                </p>
                <div className="ingredients">{recipeSteps}</div>
                <input className={"form__input"} type="text" placeholder={"Recipe steps..."}
                    value={this.state.recipeSteps}
                    onChange={this.handleRecipeStepsChange} />
                <button className="ingredients__add" onClick={this.handleAddRecipeStep}>Add another step</button>
                <button type={"submit"} className={"form__submit"} onClick={this.handleSubmit}>
                    Submit
                    </button>
            </form>
        </div>
    }else{
        return <div>
            <button className="recipe__add" onClick={this.handleFormDisplay}>+</button>
        </div>
    }
}
}
const Form = connect(mapStateToProps, mapDispatchToProps)(RecipeForm);
export default Form;