import React from 'react'
import '../styles/RoomTopBar.css'
import TopLeft from './TopLeft'
import { useSelector } from 'react-redux'

const RoomTopBar = () => {
  const roomData = useSelector((state) => state.room);

  return (
    <div className='RoomTopBar'>
        <div className='room-info'>
            <h2>{roomData.roomName}</h2>
            <b>{roomData._id}</b>
        </div>

        <TopLeft />
        
    </div>
  )
}

export default RoomTopBar