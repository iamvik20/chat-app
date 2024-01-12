/* eslint-disable react/prop-types */
// import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';


export default function Welcome({ currentUser }) {
    return (
        <Container>
            <img src={Robot} alt="gif" />
            <h1>
                Welcome, {currentUser && ( <span>{currentUser.username}!</span>)}
            </h1>
            <h3>Please select a chat to start messaging.</h3>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
`;
