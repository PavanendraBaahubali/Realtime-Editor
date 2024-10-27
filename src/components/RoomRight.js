import React from 'react'
// import ChatMsg from './ChatMsg'
// import Chat from './Chat'
import '../styles/RoomRight.css'
import ConnectedUses from './ConnectedUses'

const RoomRight = () => {
  return (
    <div className='RoomRight'>
        {/* <ChatMsg /> */}
        {/* <Chat /> */}
        <div className='users-connected'>
            <h5>Users connected</h5>
        </div>
        <ConnectedUses />
    </div>
  )
}

export default RoomRight