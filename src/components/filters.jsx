import React, {Component} from "react";
import {connect} from "react-redux";
import {toggleFilters, launchFilters, clearFilters, fetchRecipes} from "../js/actions/index";
import {checkboxes} from "../js/checkboxes";
import _ from "underscore";
import Select from "react-select";
import {ingredients_DATABASE_forSelect} from "../js/ingredients";
import Loader from "./loader.jsx";

const mapStateToProps = state => {
  return {displayFilters: state.main.displayFilters, data: state.data, filters: state.main.filters};
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFilters: displayFilters => dispatch(toggleFilters(displayFilters)),
    launchFilters: filters => dispatch(launchFilters(filters)),
    clearFilters: filters => dispatch(clearFilters(filters)),
    fetchRecipes: recipes => dispatch(fetchRecipes(recipes))
  };
};

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      title: "",
      ingredients: ""
    }
    this.handleCategoryChange = this
      .handleCategoryChange
      .bind(this);
    this.handleTitleChange = this
      .handleTitleChange
      .bind(this);
    this.handleIngredientsChange = this
      .handleIngredientsChange
      .bind(this);
    this.handleShowSorting = this
      .handleShowSorting
      .bind(this);
    this.handleLaunchFilters = this
      .handleLaunchFilters
      .bind(this);
    this.handleClearFilters = this
      .handleClearFilters
      .bind(this);
  }
  componentWillMount() {
    this
      .props
      .fetchRecipes(this.props.data)
  }

  handleCategoryChange(event) {
    this.setState({selectedOption: event.target.value, category: event.target.value})
  }

  handleTitleChange(event) {
    this.setState({title: event});
  }

  handleIngredientsChange(event) {
    this.setState({ingredients: event})
  }

  handleShowSorting() {
    this
      .props
      .toggleFilters(!this.props.displayFilters)
  }

  handleLaunchFilters() {
    let recipesFiltered = [];
    _.filter(this.props.data, el => {
      if (this.state.category.length > 0) {
        if (el.category.includes(this.state.category)) {
          recipesFiltered.push(el);
        }
      } else if (this.state.title) {
        if (el.title.includes(this.state.title.value)) {
          recipesFiltered.push(el);
        }
      } else if (this.state.ingredients) {
        el.ingredientsArr.map(ing => {
          console.log(ing)
            if (ing.title.includes(this.state.ingredients.value)) {
              recipesFiltered.push(el);
            }
          })
      } else {
        return el
      }
      this.setState({selectedOption: null})
    });
    this
      .props
      .launchFilters(recipesFiltered);
    this.setState({category: [], title: "", ingredients: ""})
    this
      .props
      .toggleFilters(false);
  }

  handleClearFilters() {
    this
      .props
      .clearFilters([]);
    this.setState({category: [], title: "", ingredients: ""})

  }

  render() {
    let checkbox = checkboxes.map((el, i) => {
      return <p key={i}>
        <label>
          <input
            type="checkbox"
            value={el.value}
            checked={this.state.selectedOption === el.value}
            className="filled-in"
            onChange={this.handleCategoryChange}/>
          <span>{el.name}</span>
        </label>
      </p>
    });

    if (this.props.data !== "loading") {
      const data = this.props.data;
      let titles = _.values(data, el => el);
      const duplicatesInTitle = _.uniq(titles, el => el.title);
      let selectTitles = duplicatesInTitle.map(el => {
        return {value: el.title, label: el.title}
      });

      if (this.props.displayFilters) {
        return <div className={"filter"}>
          <button
            className="filter-btn btn waves-effect waves-light"
            onClick={this.handleShowSorting}>Hide filters</button>
          <div className="row">
            <p className="filter__title">
              Category:
            </p>
            <div className="filter__checkboxes col s12">
              {checkbox}
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <Select
                placeholder={"Title..."}
                options={selectTitles}
                value={this.state.title}
                onChange={this.handleTitleChange}/>
            </div>
            <div className="col s6">
              <Select
                placeholder={"Ingredients..."}
                options={ingredients_DATABASE_forSelect}
                value={this.state.ingredients}
                onChange={this.handleIngredientsChange}/>
            </div>
          </div>
          <button
            className="filter-btn btn waves-effect waves-light"
            onClick={this.handleLaunchFilters}>Launch filters</button>
          <button
            className="filter-btn btn waves-effect waves-light"
            onClick={this.handleClearFilters}>Clear filters</button>
        </div>
      } else {
        return <div className={"filter"}>
          <button
            className="filter-btn btn waves-effect waves-light"
            onClick={this.handleShowSorting}>Show filters</button>
          <button
            className="filter-btn btn waves-effect waves-light"
            onClick={this.handleClearFilters}>Clear filters</button>
        </div>
      }
    }

    return <Loader/>
  }
}

const Filters = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default Filters;