import React, { useState } from 'react'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = ({ name }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setLoading] = useState(false);


    const [loginData, setLoginData] = useState({
        emailId: '',
        password: '',
    });
    const [register, setRegisterData] = useState({
        userName: '',
        emailId: '',
        password: '',
    });

    
    const handleUserLogin = async () => {
        try{
            setLoading(true);

            if (!loginData.emailId){
                setError(true);
                setErrorMsg('Email Id required');
                return 
            }
            if (!loginData.password){
                setError(true);
                setErrorMsg('Password is required');
                return 
            }

            const userData = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginData);

            console.log(userData);

            localStorage.setItem('token', userData.data.token)
            localStorage.setItem('userName', userData.data.userName)
            localStorage.setItem('userId', userData.data.userId);

            navigate('/editor');

            setLoginData({
                emailId : "",
                password : '',
            })

        }
        catch(err){
            console.log(err.message);
        }
        finally{
            setLoading(false);
        }
    }

    const handleRegister = async (e) => {
        try{

            setLoading(true);

            e.preventDefault();
        if (!register.userName){
            setError(true);
            setErrorMsg('Username required');
            return 
        }
        if (!register.emailId){
            setError(true);
            setErrorMsg('EmailId required');
            return
        }
        if (!register.password){
            setError(true);
            setErrorMsg('Password required');
            return 
        }
        const userData = await axios.post(`${process.env.REACT_APP_API_URL}/register`, register);

        console.log(userData);

        localStorage.setItem('token', userData.data.token);
        localStorage.setItem('userName', userData.data.userName);
        localStorage.setItem('userId', userData.data.userId);

        navigate('/editor');

        setError(false);
        setErrorMsg('');
        setRegisterData({
            userName: '',
            emailId: '',
            password: '',
        })

        }
        catch(err) {
            if (err.response && err.response.data){
                setError(true);
                setErrorMsg(err.response.data.message);
            }
            else{
                console.log(err)
            }
        }
        finally{
            setLoading(false);
        }
    }

    if (name === 'register') {
        return (
            <div className='Login'>
                <h2>REGISTER</h2>
                <div className='login-inputs'>
                    <input 
                        name="userName" // Added name attribute
                        value={register.userName}
                        onChange={(e) => {
                            setRegisterData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }));
                        }}
                        placeholder='Username' type='text' 
                    />
                    <input 
                        name="emailId" // Added name attribute
                        value={register.emailId}
                        onChange={(e) => {
                            setRegisterData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }));
                        }}
                        placeholder='Your email' type='text' 
                    />
                    <input 
                        name="password" // Added name attribute
                        value={register.password}
                        onChange={(e) => {
                            setRegisterData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }));
                        }}
                        placeholder='Password' type='password' 
                    />
                </div>
                {
                    error && 
                <span className='err-msg'>{errorMsg}</span>

                }
                <button onClick={handleRegister}>{!isLoading ? 'REGISTER' : "LOADING..."}</button>
                
                <span onClick={() => {
                    setError(false)
                    setErrorMsg('')
                    navigate(`/auth?login`);
                }}>Do you have an account?</span>
            </div>
        );
    }

    return (
        <div className='Login'>
            <h2>Login</h2>
            <div className='login-inputs'>
                <input 
                 name="emailId" // Added name attribute
                 value={loginData.emailId}
                 onChange={(e) => {
                     setLoginData((prevData) => ({
                         ...prevData,
                         [e.target.name]: e.target.value
                     }));
                 }}
                    placeholder='Your email' 
                    type='text' 
                />
                <input 
                 name="password" // Added name attribute
                 value={loginData.password}
                 onChange={(e) => {
                     setLoginData((prevData) => ({
                         ...prevData,
                         [e.target.name]: e.target.value
                     }));
                 }}
                    placeholder='Password' 
                    type='password' 
                />
            </div>

            {
                    error && 
                <span className='err-msg'>{errorMsg}</span>

                }
            <button onClick={handleUserLogin}>{!isLoading ?  "LOGIN" : "LOADING.."}</button>
            <span
                onClick={() => {
                    navigate(`/auth?register`);
                }}
            >Don't you have an account?</span>
        </div>
    );
};

export default Login;
