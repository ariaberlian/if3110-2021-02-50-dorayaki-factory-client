import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import BahanBaku from "../container/BahanBaku";
import { useNavigate } from "react-router";


const BahanBakuList = () => {
    const [bahanBaku, setBahanBaku] = useState([]);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        getBahanBaku();
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

    const getBahanBaku = async () => {
        const response = await axiosJWT.get('http://localhost:5000/bahan-baku');
        console.log(response.data)
        setBahanBaku(response.data);
    }

    return (
        <div>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" >
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Bahan</th>
                        <th>Stok</th>
                    </tr>
                </thead>
                <tbody>
                    { bahanBaku.map((bahanBaku, index) => (

                    <tr key={bahanBaku.id_resep}>
                        <td>{index+1}</td>
                        <td>{bahanBaku.nama_bahan}</td>
                        <td>{bahanBaku.stok}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BahanBakuList
