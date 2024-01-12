
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import logo from '../assets/logo.svg';
import { useEffect, useState } from 'react';
import FormContainer from '../styled-components/FormContainer';
import { registerRoute, sendOtpRoute, verifyOtpRoute } from '../utils/apiRoutes';
import { toastOptions } from '../styled-components/ToastOptions';

function Register() {
    const {credentials, setCredentials } = useOutletContext();
    const navigate = useNavigate();
    

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, []);

    //submitting the form
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { email } = credentials;

            const sendOtp= await axios.post(sendOtpRoute, { email });
            if (sendOtp.data.status === true) {
                toast.success(sendOtp.data.msg, toastOptions);
                navigate('/verify-otp');
            }
        }
    }

    //validate the data to send errors to user
    const handleValidation = () => {
        const { username, email, password, confirmPassword } = credentials;
        if (password !== confirmPassword) {
            toast.error('Password and Confirm Password should be same.',
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error('Too short password should be more than 8 characters long.', toastOptions);
            return false;
        } else if (!(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).test(email)) {
            toast.error('Enter valid email.', toastOptions);
            return false;
        } else if (!(/^[A-Za-z]{3,16}$/).test(username)) {
            toast.error('Username shoud be more than 3 to 16 characters long and does contain character and numbers only.', toastOptions);
            return false;
        }
        return true
    }

    //hanndle input field change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }


    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h1>Happy</h1>
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder='username'
                        value={credentials.username}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder='email'
                        value={credentials.email}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder='password'
                        value={credentials.password}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder='confirm password'
                        value={credentials.confirmPassword}
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>Already a user? <NavLink to='/login'>Login</NavLink></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}



export default Register