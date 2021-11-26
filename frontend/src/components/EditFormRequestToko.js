import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router";

const EditFormRequestToko = () => {

    const [requestToko, setRequestToko] = useState([]);

    const [idRequest, setIdRequest] = useState(0);
    const [status, setStatus] = useState(0);

    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        getRequestToko();
        refreshToken();
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp)
        }catch(error){
            if(error.response){
                navigate('/')
            }
        }
    }

    const axiosJWT = axios.create();
    
    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp)
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getRequestToko = async () => {
        const response = await axiosJWT.get('http://localhost:5000/request-toko?ip=::1');
        console.log(response.data)
        setRequestToko(response.data);
    }

    const editRequestToko = async (e) => {
        e.preventDefault();
        await axiosJWT.post('http://localhost:5000/update-request-status',{
            id_request: idRequest,
            status: status,
        });
    }
    

    return(
        <div>
            <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <form onSubmit={editRequestToko}>
                                <div className="field">
                                    <label className="label">ID Request</label>
                                    <select className="input" type="radio" placeholder="ID Request" required onChange={(e) => setIdRequest(e.target.value)} >
                                    { requestToko.map((requestToko, index) => (
                                          <option value={index}>{requestToko.id_request}</option>
                                    ))}
                                    </select>

                                </div> 
                                <div className="field">
                                    <label className="label">Status</label>
                                    <select className="input" type="radio" placeholder="status" required onChange={(e) => setStatus(e.target.value)}>
                                        <option value="1">Accept</option>
                                        <option value="0">Reject</option>
                                    </select>
                                    {/* <input className="input" type="number" placeholder="Stok Bahan Baku" required onChange={(e) => setStok(e.target.value)} /> */}
                                </div>
                                <div className="field">
                                    <button className="button is-primary" >Update</button>
                                </div>
                            </form>
                        </div>
                            
                        </div>
                    </div>
        </div>
    )
}

export default EditFormRequestToko;