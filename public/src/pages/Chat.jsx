import { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { allUsersRoute } from '../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';



function Chat() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    async function setCurrent() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      }
    }
    setCurrent();
  }, [navigate]);

  useEffect(() => {
    async function getUsers() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const users = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setAllUsers(users.data);
        } else {
          navigate('/setAvatar');
        }
      }
    }
    getUsers();
  }, [currentUser, navigate])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }


  return (
    <Container>
      <div className="container">
        <Contacts contacts={allUsers} currentUser={currentUser}  changeChat={handleChatChange} />
        {
          currentChat === undefined ? (
            <Welcome currentUser={currentUser} /> 
          ) : ( <ChatContainer selectedUser={currentChat}/> )
        }
        
      </div>
      
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    border-radius: 10px;
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat