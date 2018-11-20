import React from "react";
import {Link} from 'react-router-dom';

export default class Dashboard extends React.Component {
    render() {
        if(this.props.auth) {
        return <header className="header">
                Welcome on dashboard! <br />
                There will be a dashboard in the future :)
            </header>
        }
        return <header className="header">
            Welcome on dashboard! <br />
            You need to <Link to={"/"}>log in</Link> 
            to visit this page.
            </header>
    }
}

