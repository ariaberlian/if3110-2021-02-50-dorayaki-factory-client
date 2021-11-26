import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import jwt_decode from 'jwt-decode';


const AddResep = () => {

    const [namaResep, setNamaResep] = useState('');
    const [jumlahJenisBahan, setJumlahJenisBahan] = useState(0);
    const [bahanBaku, setBahanBaku] = useState([]);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    
    const [form, setForm] = useState([]);

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
    
    const handleAddBahan = (e) => {
        e.preventDefault();
        const bahan = {
            namaBahan: "",
            jumlahBahan: 1,
        }

        setForm((prev) => [...prev, bahan]);
    };

    const saveResep = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/tambah-resep',{
            headers:{
                Authorization: `Baearer ${token}`
            },
            nama_resep: namaResep,
            bahan_baku: [],
            jumlah: []
        });
        navigate("/resep")
    }



    const onChange = (index, event) => {
        event.preventDefault();
        event.persist();

        setForm(prev => {
            return prev.map((item, i) => {
                if(i !== index){
                    return item;
                }
                return{
                    ...item,
                    [event.target.name]: event.target.value,
                }
            })
        })
        
    }

    const handleRemoveField = (e, index) => {
        e.preventDefault();

        setForm((prev) => prev.filter((item) => item !==prev[index]));
    }


    return(
        <div>
            <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                        {JSON.stringify(form)}
                            <form onSubmit={saveResep}>
                                <div className="field">
                                    <label className="label">Nama Resep</label>
                                    <input className="input" type="text" placeholder="Nama Resep" required value={namaResep} onChange={(e) => setNamaResep(e.target.value)}/>
                                </div>
                                <div className="field container">
                                    {
                                        form.map((item, index) => (
                                    <div className="columns" key={index}>
                                        <div className="column is-half ">
                                            <label className="label">Nama Bahan Baku</label>
                                            <input className="input" type="text" placeholder="Nama Bahan Baku" name='namaBahan' required value={item.namaBahan} onChange={(e) => onChange(index, e)}/>
                                        </div>
                                        <div className="column is-half ">
                                            <label className="label">Jumlah Bahan Baku</label>
                                            <input className="input" type="number" placeholder="3" required name='jumlahBahan' value={item.jumlahBahan} onChange={(e) => onChange(index, e)}/>
                                        </div>
                                        <div className="column">
                                            <button class="button is-danger" style={{marginTop: "32px"}} onClick={(e) => handleRemoveField(e, index)}>X</button>
                                        </div>

                                    </div>

                                        ))
                                    }
                                </div>
                                
                                
                                

                                <div className="field">
                                    <button className="button is-primary">Save</button>
                                    <Link to="/resep" className="button is-danger ml-2">Cancel</Link>
                                    <button class="button ml-2" onClick={handleAddBahan}>Tambah Bahan</button>
                                </div>
                            </form>
                            {namaResep} - {bahanBaku}
                        </div>
                            
                        </div>
                    </div>
                </div>
    )
}

export default AddResep;