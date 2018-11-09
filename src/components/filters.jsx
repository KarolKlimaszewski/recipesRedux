import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFilters, launchFilters, clearFilters } from "../js/actions/index";
import { checkboxes } from "../js/checkboxes";
import _ from "underscore";
import Select from "react-select";
import { ingredients_DATABASE_forSelect} from "../js/ingredients";

const mapStateToProps = state => {
    return { displayFilters: state.displayFilters,
             recipes: state.recipes,
        filters: state.filters };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleFilters: displayFilters => dispatch(toggleFilters(displayFilters)),
        launchFilters: filters => dispatch(launchFilters(filters)),
        clearFilters: filters => dispatch(clearFilters(filters))
    };
};

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            title: "",
            ingredients: ""
        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleShowSorting = this.handleShowSorting.bind(this);
        this.handleLaunchFilters = this.handleLaunchFilters.bind(this);
        this.handleClearFilters = this.handleClearFilters.bind(this);
    }

    handleCategoryChange(event) {
        this.setState({
            selectedOption: event.target.value,
            category: event.target.value
        })
    }

    handleTitleChange(event) {
        this.setState({
            title: event
        });
    }

    handleIngredientsChange(event) {
        this.setState({
            ingredients: event
        })
    }

    handleShowSorting() {
        this.props.toggleFilters(!this.props.displayFilters)
    }

    handleLaunchFilters() {
        let recipesFiltered = [];
        _.filter(this.props.recipes, el => {
            if (this.state.category) {
                if (el.category.includes(this.state.category)){
                    recipesFiltered.push(el);
                }
            } else if(this.state.title) {
                if(el.title.includes(this.state.title.value)) {
                    recipesFiltered.push(el);
                }
            } else if (this.state.ingredients) {
                el.ingredientsArr.map(ing => {
                    console.log(ing);
                    if(ing.title.includes(this.state.ingredients.value)){
                        recipesFiltered.push(el);
                    }
                })
            }
             else {
                return el
            }
            this.setState({
                selectedOption: null
            })
        });
        this.props.launchFilters(recipesFiltered);
            this.setState({
                category: [],
                title: "",
                ingredients: "",
            })
        this.props.toggleFilters(false);
    }

    handleClearFilters() {
        this.props.clearFilters([]);
        this.setState({
            category: "",
            selectedOption: ""
        })
        
    }

    render() {
        let checkbox = checkboxes.map((el, i) => {
            return <p key={i}>
                <label>
                    <input type="checkbox" value={el.value} checked={this.state.selectedOption === el.value} className="filled-in" onChange={this.handleCategoryChange} />
                    <span>{el.name}</span>
                </label>
            </p>
        });
        let duplicatesInTitle = _.uniq(this.props.recipes.map(el => el.title));
        let selectTitles = duplicatesInTitle.map(el => {
            return { value: el, label: el }
        });

        if(this.props.displayFilters) {
            return <div className={"filter"}>
                <button className="filter__show btn waves-effect waves-light" onClick={this.handleShowSorting}>Hide filters</button>
                <div className="row">
                    <h5 className="filter__title">
                        Category:
                    </h5>
                    <div className="filter__checkboxes col s12">
                        {checkbox}
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <Select placeholder={"Title..."} options={selectTitles} value={this.state.title} onChange={this.handleTitleChange} />
                    </div>
                    <div className="col s6">
                        <Select placeholder={"Ingredients..."} options={ingredients_DATABASE_forSelect} value={this.state.ingredients} onChange={this.handleIngredientsChange} />
                    </div>
                </div>
                <button className="filter__run btn waves-effect waves-light" onClick={this.handleLaunchFilters}>Launch filters</button>
                <button className="filter__clear btn waves-effect waves-light" onClick={this.handleClearFilters}>Clear filters</button>
            </div>
        } else {
            return <div className={"filter"}>
                <button className="filter__show btn waves-effect waves-light" onClick={this.handleShowSorting}>Show filters</button>
                <button className="filter__clear btn waves-effect waves-light" onClick={this.handleClearFilters}>Clear filters</button>
            </div>
        }
    }
}

const Filters = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default Filters;