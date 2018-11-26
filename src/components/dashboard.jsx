import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

class Dash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.auth) {
      return <header className="header">
        Welcome on dashboard!
        <br/>
        There will be a dashboard in the future :)
      </header>
    }
    return <header className="header">
      Welcome on dashboard!
      <br/>
      You need to
      <Link to={"/"}>log in</Link>
      to visit this page.
    </header>
  }
}

const Dashboard = connect(mapStateToProps, null)(Dash);
export default Dashboard;

