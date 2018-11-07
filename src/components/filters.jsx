import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFilters, launchFilters, clearFilters } from "../js/actions/index";
import { checkboxes } from "../js/checkboxes";
import _ from "underscore";
import Select from "react-select";

const mapStateToProps = state => {
    return { displayFilters: state.displayFilters,
             recipes: state.recipes,
             categoryFilter: state.categoryFilter };
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
            category: [],
            title: null
        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleShowSorting = this.handleShowSorting.bind(this);
        this.handleLaunchFilters = this.handleLaunchFilters.bind(this);
        this.handleClearFilters = this.handleClearFilters.bind(this);
    }

    handleCategoryChange(event) {
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

    handleTitleChange(event) {
        this.setState({
            title: event
        });
    }

    handleShowSorting() {
        this.props.toggleFilters(!this.props.displayFilters)
    }

    handleLaunchFilters() {
        let recipes = this.props.recipes;
        let recipesFiltered = [];
        _.filter(recipes, el => {
            if (this.state.category.length > 0) {
                if (el.category.includes(this.state.category.map(cat => cat).toString())){
                    recipesFiltered.push(el);
                }
            }else if(this.state.title.value) {
                if(el.title.includes(this.state.title.value)) {
                    recipesFiltered.push(el);
                }
            }
             else {
                return el
            }
        });
        this.props.launchFilters(recipesFiltered);
            this.setState({
                category: [],
                title: ""
            })
        this.props.toggleFilters(false);
    }

    handleClearFilters() {
        this.props.clearFilters([]);
        this.setState({
            category: []
        })
        this.props.toggleFilters(false)
    }

    render() {
        let checkbox = checkboxes.map((el, i) => {
            return <p key={i}>
                <label>
                    <input type="checkbox" value={el.value} className="filled-in" onChange={this.handleCategoryChange} />
                    <span>{el.name}</span>
                </label>
            </p>
        });
        let duplicates = _.uniq(this.props.recipes.map(el => el.title));
        console.log(duplicates);
        let selectTitles = duplicates.map(el => {
            return ({ value: el, label: el })
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
                    <div className="col s5">
                        <Select placeholder={"Title..."} options={selectTitles} value={this.state.title} onChange={this.handleTitleChange} />
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