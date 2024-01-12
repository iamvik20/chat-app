import { useState } from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react'
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";


export default function ChatInput({ handleSentMsg }) {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event) => {
        setMsg((prevMsg) => prevMsg + event.emoji)
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSentMsg(msg);
            setMsg("");
        }
    }


    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmile onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} height={350} width={300} />}
                </div>
            </div>
            <form className="input-box" onClick={handleEmojiPickerHideShow} onSubmit={sendChat}>
                <input
                    type="text"
                    placeholder='enter your message here...'
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">
                    <AiOutlineSend size='32px' onClick={handleEmojiPickerHideShow}/>
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    background-color: #3b2946;
    align-items: center;
    border-radius: 0 0 10px 0;
    padding: .22rem 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            top: -5px;
            svg {
                position: absolute;
                padding: 5px;
                top: -28px;
                left: -1rem;
                font-size: 3rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact  {
                position: absolute;
                top: -380px;
                background-color: #080420;
                /* box-shadow: 0 5px 10px #9a86f3; */
                border-color: #9a86f3;
                .epr-body::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    width: 5px;
                    &-thumb {
                        background-color: #9a86f3;
                        border-radius: 15%;
                    }
                }
                .epr-emoji-category-label {
                    display :none;
                    background-color: transparent;
                    font-size: .9rem;
                    button {
                        filter: contrast(0);
                    }
                }
                
                .epr-search {
                    background-color: transparent;
                    border-color: #9a86f3;
                }
                .emoji:before {
                    background-color: #080420;
                }
            }
        }
    }
    .input-box {  
        margin-top: -2px; 
        width: 100%; 
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        background-color: #CBE0E0;
        border-radius: 2rem;
        margin-bottom: 10px;
        input {
            width: 90%;
            padding: 1rem;
            outline: none;
            font-size: 1.2rem;
            background: transparent;
            border: none;
            &::selection {
                background-color: #9a86f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            display: flex;
            align-items: center;
            height: 3.2rem;
            width: 3.3rem;
            padding-left: .6rem;
            border-radius:0 40% 40%  0%;
            cursor: pointer;
            border: none;
            background-color: #C02727;
            color: #fff;
            &:focus {
                outline: none;
            }
        }
    }
`;
