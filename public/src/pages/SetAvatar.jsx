/* eslint-disable react/jsx-key */
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import axios from 'axios'
import loader from '../assets/loader.gif';
// import { useEffect, useState } from 'react';
import { setAvatarRoute } from '../utils/apiRoutes';
import { toastOptions } from '../styled-components/ToastOptions';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

function SetAvatar() {

  const api = "https://api.multiavatar.com/";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user"))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an Avatar.", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate('/');
      } else {
        toast.error("Error setting avatar please try again.", toastOptions);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = new Buffer.from(response.data, 'binary').toString('base64');
          data.push(buffer);
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;

  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }

      &:hover {
        transform: scale(1.3)
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
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
`;

export default SetAvatar