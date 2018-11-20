import React, { Component } from "react";
import { connect } from "react-redux";

export default function (ComposedComponent) {
    class Authentication extends Component {
        // static contextTypes = {
        //     router: PropTypes.object
        // };

        // componentWillMount() {
        //     if (this.props.authenticated === null) {
        //         this.context.router.history.push("/");
        //     }
        // }

        // componentWillUpdate(nextProps) {
        //     if (!nextProps.authenticated) {
        //         this.context.router.history.push("/");
        //     }
        // }

        render() {
            console.log(this.props)
            if (!this.props.authenticated) {
                return <ComposedComponent/>;
            }
            return null;
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth };
    }

    return connect(mapStateToProps)(Authentication);
}
