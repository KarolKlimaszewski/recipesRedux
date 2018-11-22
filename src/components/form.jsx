import React, {Component} from "react";
import {connect} from "react-redux";
import {showForm, submitRecipe} from "../js/actions/index";
import {checkboxes} from "../js/checkboxes";
import Select from "react-select";
import {ingredients_DATABASE_forSelect, units_DATABASE_forSelect} from "../js/ingredients";

import uuidv1 from "uuid";

const mapStateToProps = state => {
  return {displayForm: state.main.displayForm};

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
      ingredientsTitle: "",
      ingredientsAmount: "",
      ingredientsUnit: "",
      ingredientsArr: [],
      photo: "",
      recipeSteps: "",
      recipeStepsArr: ["test", "siema"],
      category: [],
      preview: ""
    }
    this.handleFormDisplay = this
      .handleFormDisplay
      .bind(this);
    this.handleTitleChange = this
      .handleTitleChange
      .bind(this);
    this.handleCheckboxChange = this
      .handleCheckboxChange
      .bind(this);
    this.handleIngredientsTitleChange = this
      .handleIngredientsTitleChange
      .bind(this);
    this.handleIngredientsAmountChange = this
      .handleIngredientsAmountChange
      .bind(this);
    this.handleIngredientsUnitChange = this
      .handleIngredientsUnitChange
      .bind(this);
    this.handleAddIngredient = this
      .handleAddIngredient
      .bind(this);
    this.handleDeleteIngredient = this
      .handleDeleteIngredient
      .bind(this);
    this.handlePhotoUrlChange = this
      .handlePhotoUrlChange
      .bind(this);
    this.handleRecipeStepsChange = this
      .handleRecipeStepsChange
      .bind(this);
    this.handleAddRecipeStep = this
      .handleAddRecipeStep
      .bind(this);
    this.handleDeleteRecipeStep = this
      .handleDeleteRecipeStep
      .bind(this);
    this.handleEditRecipeStep = this
      .handleEditRecipeStep
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handlePreviewChange = this
      .handlePreviewChange
      .bind(this);
  }

  handleFormDisplay(event) {
    event.preventDefault();
    this
      .props
      .showForm(!this.props.displayForm)
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleCheckboxChange(event) {
    if (this.state.category.includes(event.target.value)) {
      let categoryArray = [...this.state.category];
      let index = categoryArray.indexOf(event.target.value);
      categoryArray.splice(index, 1);
      this.setState({category: categoryArray})
    } else {
      this.setState({
        category: [
          ...this.state.category,
          event.target.value
        ]
      })
    }
  }

  handleIngredientsTitleChange(event) {
    this.setState({ingredientsTitle: event})
  }

  handleIngredientsAmountChange(event) {
    const reg = /^[0-9]*$/
    if(event.target.value.match(reg)) {
      this.setState({ingredientsAmount: event.target.value})
    }
  }

  handleIngredientsUnitChange(event) {
    this.setState({ingredientsUnit: event})
  }

  handleAddIngredient(event) {
    event.preventDefault();
    if (this.state.ingredientsTitle && this.state.ingredientsAmount) {
      this.setState({
        ingredientsArr: [
          ...this.state.ingredientsArr, {
            title: this.state.ingredientsTitle.value,
            amount: this.state.ingredientsAmount,
            unit: this.state.ingredientsUnit.value
          }
        ],
        ingredientsTitle: "",
        ingredientsAmount: "",
        ingredientsUnit: ""
      })
    } else {
      console.log("fill fields")
    }
  }

  handleDeleteIngredient(event, el) {
    event.preventDefault();
    let ingArr = this.state.ingredientsArr;
    let index = ingArr.indexOf(el);
    if (index > -1) {
      ingArr.splice(index, 1);
    }
    this.setState({ingredientsArr: ingArr})
  }

  handleAddRecipeStep(event) {
    event.preventDefault();
    this
      .state
      .recipeStepsArr
      .push(this.state.recipeSteps);
    this.setState({recipeSteps: ""})
  }

  handleDeleteRecipeStep(event, el) {
    event.preventDefault();
    let recArr = this.state.recipeStepsArr;
    let index = recArr.indexOf(el);
    if (index > -1) {
      recArr.splice(index, 1);
    }
    this.setState({recipeStepsArr: recArr})
  }

  handleEditRecipeStep(event, el) {
      event.preventDefault();
      const recArr = this.state.recipeStepsArr;
      let index = recArr.indexOf(el);
      recArr.splice(index, index + 1);
      this.setState({
        recipeStepsArr: recArr,
        recipeSteps: el
      })
  }

  handlePhotoUrlChange(event) {
    this.setState({photo: event.target.value})
  }

  handleRecipeStepsChange(event) {
    this.setState({recipeSteps: event.target.value})
  }

  handlePreviewChange(event) {
    if(event.target.value.length < 160) {
      this.setState({preview: event.target.value})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {title, ingredientsArr, photo, recipeStepsArr, category, preview} = this.state;
    const id = uuidv1();
    if (title === "" || ingredientsArr === [] || photo === "" || recipeStepsArr === [] || category === []) {
      alert('fill all fields.');
    } else {
      this
        .props
        .submitRecipe({
          title,
          ingredientsArr,
          photo,
          recipeStepsArr,
          category,
          id,
          preview
        });
      this.setState({
        title: "",
        ingredients: "",
        ingredientsArr: [],
        photo: "",
        recipeSteps: "",
        recipeStepsArr: [],
        category: [],
        preview: ""
      })
      this
        .props
        .showForm(false);
    }
  }
  render() {
    let ingredients = this
      .state
      .ingredientsArr
      .map((el, i) => {
        return <div key={i} className="form-ingredients__list-item">
          {el.amount}{el.unit}s of {el.title}
          <button
            className="recipe-btn waves-effect waves-light btn form-ingredients__list-button"
            onClick={e => this.handleDeleteIngredient(e, el)}>X</button>
        </div>
      })
    let recipeSteps = this
      .state
      .recipeStepsArr
      .map((el, i) => {
        return <div key={i} className="ingredients-item">
          {el}
          <button
            className="recipe-btn form-button waves-effect waves-light btn form-ingredients__list-button"
            onClick={e => this.handleDeleteRecipeStep(e, el)}>X</button>
          <button
            className="recipe-btn form-button waves-effect waves-light btn form-ingredients__list-button form-ingredients__list-button--edit"
            onClick={e => this.handleEditRecipeStep(e, el)}>edit</button>
        </div>
      })
    let checkbox = checkboxes.map((el, i) => {
      return <p key={i}>
        <label>
          <input
            type="checkbox"
            className="filled-in"
            onChange={this.handleCheckboxChange}
            value={el.value}/>
          <span className="form-checkbox-label">{el.name}</span>
        </label>
      </p>
    })
    // if(this.props.displayForm) {
    return <div className="recipe-form">
      {/* <a className="recipe__add waves-effect waves-light btn" onClick={this.handleFormDisplay}>+ Add recipe</a> */}
      <form className="form">
        <div className="row">
          <div className="input-field col s12 m12 l6">
            <p className="recipe-form-label">Your recipe title:</p>
            <input value={this.state.title} onChange={this.handleTitleChange}/>
          </div>
          <div className="input-field col s12 m12 l6">
            <p className="recipe-form-label">Photo url:</p>
            <input value={this.state.photo} onChange={this.handlePhotoUrlChange}/>
          </div>
          <div className="input-field col s12">
            <p className="recipe-form-label">Short preview (up to 160 digits):</p>
            <input
              value={this.state.preview}
              onChange={this.handlePreviewChange} />
          </div>
        </div>
        <div className="row">
          <p className="form__description col s12">Ingredients:</p>
          <Select
            className="col s12 m12 l6 xl4"
            placeholder={"Choose ingredient..."}
            options={ingredients_DATABASE_forSelect}
            value={this.state.ingredientsTitle}
            onChange={this.handleIngredientsTitleChange}/>
          <div className="input-field col s12 m12 l6 xl2">
            <p className="recipe-form-label">Amount:</p>
            <input
              value={this.state.ingredientsAmount}
              onChange={this.handleIngredientsAmountChange}/>
          </div>
          <Select
            className="col s12 m12 l6 xl4"
            placeholder={"Choose unit..."}
            options={units_DATABASE_forSelect}
            value={this.state.ingredientsUnit}
            onChange={this.handleIngredientsUnitChange}/>
          <button
            className=" recipe-btn recipe-btn__nomg waves-effect waves-light btn-large col s12 m12 l6 xl2"
            onClick={this.handleAddIngredient}>Add ingredient</button>
          <div className="form-ingredients__list col s12">{ingredients}</div>
        </div>
        <div className="row">
          {/* <p className="form__description col s12">Recipe steps:</p> */}
          <div className="input-field col s12 m12 l6 xl7">
            <p className="recipe-form-label">Recipe steps:</p>
            <input value={this.state.recipeSteps} onChange={this.handleRecipeStepsChange}/>
          </div>
          <button
            className="recipe-btn recipe-btn__nomg waves-effect waves-light btn col s12 m12 l6 xl5"
            onClick={this.handleAddRecipeStep}>Add recipe step</button>
          <div className="ingredients col s12">{recipeSteps}</div>
        </div>
        <div className="row">
          <p className="form__description col s12">
            Category:
          </p>
          <div className="form__checkboxes col s12">{checkbox}</div>
        </div>
        <button
          type={"submit"}
          className={"recipe-btn btn waves-effect waves-light col s12"}
          onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    </div>
    // }else{         return <div className="recipe-form">         <button
    // className="recipe__add waves-effect waves-light btn"
    // onClick={this.handleFormDisplay}>+ Add recipe</button>     </div> }
  }
}
const Form = connect(mapStateToProps, mapDispatchToProps)(RecipeForm);
export default Form;