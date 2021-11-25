import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    //state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const Register = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/admins', {
                username: username,
                email: email,
                password: pass,
                confPassword: confirmPass,
            });
            navigate("/");
        } catch(error){
            if(error.response){
                setMessage(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
                <div className="columns is-centerd">
                    <div className="column is-4-dekstop">
                        <form onSubmit={Register} className="box">
                            <p className="has-text-centered">{message}</p>
                            <div className="field mt-5">
                                <label className="label">Username</label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Name" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Email</label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="field" mt-5>
                                <label className="label">Password</label>
                                <div className="controls">
                                    <input type="password" className="input" required placeholder="*******" value={pass} onChange={(e) => setPass(e.target.value)} />
                                </div>
                            </div>
                            <div className="field" mt-5>
                                <label className="label">Confirm Password</label>
                                <div className="controls">
                                    <input type="password" className="input" required placeholder="*******" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button className="button is-success is-fullwidth">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        </section>
    )
}

export default Register
