import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Resep from "../container/Resep";
import { useNavigate } from "react-router";


const ResepList = () => {
    const [resep, setResep] = useState([]);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        getResep();
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

    const getResep = async () => {
        const response = await axios.get('http://localhost:5000/resep');
        console.log(response.data)
        setResep(response.data);
    }

    return (
        <div>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" >
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Resep</th>
                    </tr>
                </thead>
                <tbody>
                    { resep.map((resep, index) => (

                    <tr key={resep.id_resep}>
                        <td>{index+1}</td>
                        <td>{resep.nama_resep}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ResepList
