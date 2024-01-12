/* eslint-disable react/prop-types */
// import React from 'react'
import styled from "styled-components"
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

export default function ChatContainer({ selectedUser }) {
    const {avatarImage, username} = selectedUser;

    const handleSentMsg = async (msg) => {
        alert(msg);
    }
  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${avatarImage}`} 
                        alt={username} 
                    />
                </div>
                <div className="username">
                      <h2>{username}</h2> 
                </div>
            </div>
            <Logout />
        </div>
        <Messages />
        <ChatInput handleSentMsg={handleSentMsg} />
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }
    .chat-header {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        padding: 2.1rem 2rem;
        background-color: #4c4561;
        border-radius: 0 10px 0 0;
        color: #fff;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        img {
            height: 3rem;
        }
    }
    
`;

