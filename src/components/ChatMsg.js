import React from 'react'
import '../styles/ChatMsg.css'
import SendIcon from '@mui/icons-material/Send';
const ChatMsg = () => {
  return (
    <div className='ChatMsg'>
        <div className = 'chat-msg-wrapper'>
            <div className='chat-profile-wrapper'>
                <p>Walter White</p>
                <div className='chat-profile-img'></div>
            </div>
            <div className='chat-msg-info'>
                <p>Hi, Jesse!</p>
            </div>
        </div>

        {/*  */}

        <div className='msg-type'>
            <input 
            placeholder='type something..'
            type  = 'text'
            />

           <span> <SendIcon /></span>

        </div>

    </div>
  )
}

export default ChatMsg