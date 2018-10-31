import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteArticle } from "../js/actions/index";

const mapStateToProps = state => {
  return {articles: state.articles};
};

const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: article => dispatch(deleteArticle(article)),
  };
};

class ConnectedList extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event, el) {
    // const id = uuidv1();
    console.log(el);
    console.log(this.props.articles.indexOf(el))
      this.props.deleteArticle(this.props.articles.indexOf(el));
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.props.articles.map((el, i) => (
          <li className="list-group-item" data-key={el.id} key={i}>
            {el.title}
            <div onClick={e => this.handleDelete(e, el)} className="list-group-item__delete">X</div>
          </li>
        ))}
      </ul>
    );
  }
}
const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;