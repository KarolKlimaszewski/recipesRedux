import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1 className={"header__title"}>
          Recipes App
        </h1>
        <img
          className={"header__logo"}
          src={require("../../images/chefhat.png")}
          alt="Recipes logo"/>
      </header>
    );
  }
}
