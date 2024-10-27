import React from 'react'
import '../styles/RoomLayout.css'
import RoomTopBar from '../components/RoomTopBar';
import RoomMain from '../components/RoomMain';

const RoomLayout = () => {
    return (
        <div className='RoomLayout'>
            <RoomTopBar />
            <RoomMain />
        </div>
    )
}

export default RoomLayout;