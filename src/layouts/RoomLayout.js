import React from 'react'
import '../styles/RoomLayout.css'
import RoomTopBar from '../components/RoomTopBar';
import RoomMain from '../components/RoomMain';
import DrawCanvas from '../components/DrawCanvas';
import { useSelector } from 'react-redux';

const RoomLayout = () => {
    const isShowDraw = useSelector((state) => state.draw)
    return (
        <div className='RoomLayout'>
            {
                isShowDraw && 
            <DrawCanvas />
            }

            <RoomTopBar />
            <RoomMain />
        </div>
    )
}

export default RoomLayout;