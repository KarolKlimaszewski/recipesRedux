import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFilters, launchCategoryFilter, clearFilters } from "../js/actions/index";
import { checkboxes } from "../js/checkboxes";

import uuidv1 from "uuid";

const mapStateToProps = state => {
    return { displayFilters: state.displayFilters,
             recipes: state.recipes,
             categoryFilter: state.categoryFilter };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleFilters: displayFilters => dispatch(toggleFilters(displayFilters)),
        launchCategoryFilter: recipe => dispatch(launchCategoryFilter(recipe)),
        clearFilters: filters => dispatch(clearFilters(filters))
    };
};

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],

        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
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

    handleShowSorting() {
        event.preventDefault();
        if (this.props.displayFilters) {
            this.props.toggleFilters(false);
        } else {
            this.props.toggleFilters(true);
        }
    }

    handleLaunchFilters() {
        this.props.launchCategoryFilter(this.state.category);

            this.setState({
                category: ""
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
            return <div key={"filterCheckbox" + i} className={"filter__checkbox-container"}>
                <input className="filter__checkbox" id={el.sortValue} type="checkbox" value={el.value}
                    onChange={this.handleCategoryChange} />
                <label className={"filter__label"} htmlFor={el.sortValue}>{el.name}</label>
            </div>
        });
        if(this.props.displayFilters) {
            return <div className={"filter"}>
                <button className="filter__show" onClick={this.handleShowSorting}>Hide filters</button>
                <h2 className="filter__title">
                    Category:
                    </h2>
                <div className="filter__checkboxes">
                    {checkbox}
                </div>
                <button className="filter__run" onClick={this.handleLaunchFilters}>Launch filters</button>
                <button className="filter__clear" onClick={this.handleClearFilters}>Clear filters</button>
            </div>
        } else {
            return <div className={"filter"}>
                <button className="filter__show" onClick={this.handleShowSorting}>Show filters</button>
            </div>
        }
    }
}

const Filters = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default Filters;