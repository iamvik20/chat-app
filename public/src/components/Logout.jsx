// import React from 'react'
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Container onClick={() => handleLogout()}>
            <FaPowerOff />
        </Container>
    )
}

const Container = styled.div`
    cursor: pointer;
    background-color: #CC3636;
    padding: 7px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: all .3s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`;