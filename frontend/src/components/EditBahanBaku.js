import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router";
import jwt_decode from 'jwt-decode';


const EditBahanBaku = () => {

    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    const [namaBahan, setNamaBahan] = useState('');
    const [stok, setStok] = useState(0);
    const { id } = useParams();

    
    const navigate = useNavigate();

    // namaResep: namaResep,
    // bahan_baku: bahanBaku,
    // jumlah: jumlahJenisBahan,

    useEffect(() => {
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
    

    const saveBahan = async (e) => {
        e.preventDefault();
        await axiosJWT.post('http://localhost:5000/add-bahan-baku',{
            nama_bahan: namaBahan,
            stok: stok,
        });
        navigate("/bahan-baku")
    }

    useEffect(() => {
        getBahanById();
    }, [])


    const getBahanById = async () => {
        const response = await axiosJWT.get(`http://localhost:5000/update-bahan-baku`);
        console.log(response.data.nama_bahan);
        console.log(response.data.stok);
    }

    return(
        <div>
            <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <form onSubmit={saveBahan}>
                                <div className="field">
                                    <label className="label">Nama Bahan Baku</label>
                                    <input className="input" type="text" placeholder="Nama Bahan Baku" required value={namaBahan} onChange={(e) => setNamaBahan(e.target.value)}/>
                                </div> 
                                <div className="field">
                                    <label className="label">Stok</label>
                                    <input className="input" type="number" placeholder="Stok Bahan Baku" required value={stok} onChange={(e) => setStok(e.target.value)}/>
                                </div>
                                <div className="field">
                                    <button className="button is-primary">Update</button>
                                    <Link to="/bahan-baku" className="button is-danger ml-2">Cancel</Link>
                                </div>
                            </form>
                            {namaBahan} - {stok}
                        </div>
                            
                        </div>
                    </div>
                </div>
    )
}

export default EditBahanBaku;