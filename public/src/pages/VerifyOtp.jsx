
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import logo from '../assets/logo.svg';
import FormContainer from '../styled-components/FormContainer';
import { registerRoute, verifyOtpRoute } from '../utils/apiRoutes';
import { toastOptions } from '../styled-components/ToastOptions';
import { useEffect } from 'react';

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
            const { username, email, password, OTP} = credentials;

            const otpVerify = await axios.post(verifyOtpRoute, { email, otp: OTP});

            if (otpVerify.data.status === true) {
                toast.success(otpVerify.msg, toastOptions);
                const { data } = await axios.post(registerRoute, {
                    username,
                    email,
                    password,
                });

                if (data.status) {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                    toast.success('User created sucessfully.', toastOptions);
                } else {
                    toast.error(data.msg, toastOptions);
                }
                setCredentials({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    OTP: '',
                });
                navigate('/setAvatar');
            } else {
                toast.error(otpVerify.data.msg, toastOptions);
            }
        }
    }

    //validate the data to send errors to user
    const handleValidation = () => {
        const { OTP } = credentials;
        if (OTP.length === 0) {
            toast.error('OTP is required.',
                toastOptions
            );
            return false;
        } else if(OTP.length < 6) {
            toast.error('OTP should be of 6 numbers.',
                toastOptions
            );
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
                        name="OTP"
                        placeholder='Enter OTP'
                        value={credentials.OTP}
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Submit Otp</button>
                    <span>Already a user? <NavLink to='/login'>Login</NavLink></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}



export default Register