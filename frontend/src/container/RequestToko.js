import React, { Component, Fragment } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import ResepList from "../components/ResepList";
import AddResep from "../components/AddResep";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import RequestTokoList from "../components/RequestTokoList";
import EditFormRequestToko from "../components/EditFormRequestToko";

class RequestToko extends Component {
   

    render(){
        return(
            <Fragment>
                <Navbar/>
                <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <RequestTokoList/>
                            {/* <Routes>
                                <Route exact  ="/" element={<ResepList/>} />
                                <Route path ="/add" element={<AddResep/>} />
                            </Routes> */}
                        </div>
                        <div className="column">
                            <EditFormRequestToko/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default RequestToko