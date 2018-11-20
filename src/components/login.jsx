import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../js/actions/index";

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
        showRecipe: displayRecipe => dispatch(showRecipe(displayRecipe)),
        deleteRecipe: recipe => dispatch(deleteRecipe(recipe)),
        activeRecipeDisplay: active => dispatch(activeRecipeDisplay(active))
    };
};

export class LoginComponent extends Component {
//   static contextTypes = {
//     router: PropTypes.object
//   };

  componentWillUpdate(nextProps) {
      console.log(nextProps.auth)
    if (nextProps.auth) {

    }
  }

  render() {
    return (
      <div className="row social-signin-container">
        <div className="col s10 offset-s1 center-align">
          <img alt="Sign in" id="sign-in" src="/img/user.png" />
          <h4 id="sign-in-header">Sign In to start</h4>
          <h1>DO NOT USE IT! IT ISN'T DONE YET</h1>
          <a href="#" className="social-signin" onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            Sign In With Google
          </a>
        </div>
      </div>
    );
  }
}

const Login = connect(mapStateToProps, {signIn})(LoginComponent);
export default Login;
