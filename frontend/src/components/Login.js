import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';

const Login = () => {
    //state
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const Auth = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/login', {
                username: username,
                password: pass,
            });
            navigate("/home");
        } catch(error){
            if(error.response){
                setMessage(error.response.data.msg);
            }
        }
    }

    const toRegisterPage = () => {
        navigate("/register")
    }
    
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
                <div className="columns is-centerd">
                    <div className="column is-4-dekstop">
                        <form className="box" >
                            <p className="has-text-centered">{message}</p>
                            <div className="field mt-5">
                                <label className="label">Username</label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="field" mt-5>
                                <label className="label">Password</label>
                                <div className="controls">
                                    <input type="password" className="input" placeholder="*******" value={pass} onChange={(e) => setPass(e.target.value)} />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="field mt-5 column is-half">
                                    <button onClick={Auth} className="button is-success is-fullwidth">Login</button>
                                </div>
                                <div className="field mt-5 column is-half">
                                    <button onClick={toRegisterPage} className="button is-danger is-fullwidth">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        </section>
    )
}

export default Login
