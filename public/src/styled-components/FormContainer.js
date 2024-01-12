import styled from 'styled-components';

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        ${'' /* justify-content: space-evenly; */}
        height: 80%;
        padding: 20px 50px;
        border-radius: 1rem;
        background-color: #00000076;

        input {
            padding: 10px;
            width: 20rem;
            border-radius: 0.4rem;
            border: none;
            outline: none;
            font-size: 1rem;
            background-color: #CCC8AA;
            color: #45474B;

            &:focus {
                border: .14rem solid #F4CE14;
            }
        }


        button {
            padding: 10px 15px;
            font-size: 1.1rem;
            font-weight: 600;
            background-color: #C70039;
            color: white;
            border-radius: .5rem;
            outline: none;
            border: none;
            transition: all .2s ease-in-out;
            cursor: pointer; 
            
            &:hover {
                transform: scale(1.05);
                background-color:  #D83F31;   
            }
        }

        span {
            color: white;
            font-size: 1.3rem;
            a {
                text-decoration: none;
                color: #3085C3;
            }
            
        }

        .login {
            margin-top: 3rem;
        }

        .toast-container {
            color: black;
        }

    }
`;

export default FormContainer