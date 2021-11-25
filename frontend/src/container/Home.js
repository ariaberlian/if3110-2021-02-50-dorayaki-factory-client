import React, { Component, Fragment } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";

class Home extends Component {
    render(){
        return(
            <Fragment>
                <Navbar/>
                <Dashboard/>
            </Fragment>
        )
    }
}

export default Home