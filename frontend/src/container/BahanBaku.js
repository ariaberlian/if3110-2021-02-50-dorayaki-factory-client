import React, { Component, Fragment } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import ResepList from "../components/ResepList";
import AddResep from "../components/AddResep";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import BahanBakuList from "../components/BahanBakuList";

class BahanBaku extends Component {
    render(){
        return(
            <Fragment>
                <Navbar/>
                <Link to="/add-bahan-baku" className="button is-primary mt-2">Tambah Bahan Baku</Link>
                <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <BahanBakuList/>
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

export default BahanBaku