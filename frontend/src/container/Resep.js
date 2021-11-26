import React, { Component, Fragment } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import ResepList from "../components/ResepList";
import AddResep from "../components/AddResep";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

class Resep extends Component {
    render(){
        return(
            <Fragment>
                <Navbar/>
                <Link to="/add-resep" className="button is-primary mt-2">Tambah Resep</Link>
                <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <ResepList/>
                            {/* <Routes>
                                <Route exact  ="/" element={<ResepList/>} />
                                <Route path ="/add" element={<AddResep/>} />
                            </Routes> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Resep