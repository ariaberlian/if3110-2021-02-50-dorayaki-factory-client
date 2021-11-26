import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router";

const EditForm = () => {

    const [bahanBaku, setBahanBaku] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    const [namaBahan, setNamabahan] = useState('')
    const [stok, setStok] = useState(0);

    useEffect(() => {
        getBahanBaku();
        refreshToken();
    }, []);

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

    const getBahanBaku = async () => {
        const response = await axiosJWT.get('http://localhost:5000/bahan-baku');
        console.log(response.data)
        setBahanBaku(response.data);
    }

    const editBahan = async (e) => {
        e.preventDefault();
        await axiosJWT.post('http://localhost:5000/update-bahan-baku',{
            nama_bahan: namaBahan,
            stok: stok,
        });
    }

    return(
        <div>
            <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <form onSubmit={editBahan}>
                                <div className="field">
                                    <label className="label">Nama Bahan Baku</label>
                                    <select className="input" type="radio" placeholder="Nama Bahan Baku" required >
                                    { bahanBaku.map((bahanBaku, index) => (
                                          <option value={index}>{bahanBaku.nama_bahan}</option>
                                    ))}
                                    </select>

                                </div> 
                                <div className="field">
                                    <label className="label">Stok</label>
                                    <input className="input" type="number" placeholder="Stok Bahan Baku" required onChange={(e) => setStok(e.target.value)} />
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

export default EditForm;