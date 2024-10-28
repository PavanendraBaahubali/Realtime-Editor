import React, { useEffect, useState } from 'react'
import '../styles/RoomMain.css'
import RoomSidebar from './RoomSidebar'
import RoomEditor from './RoomEditor'
import RoomRight from './RoomRight'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { roomData } from '../ReduxSlices/RoomSlice'
import socket from '../socket'

const RoomMain = () => {
  
  const {roomId} = useParams();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const[connecting, setConnecting] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/room/${roomId}`)
      .then((res) => {
        dispatch(roomData(res.data.roomData))
      })
      .catch((err) => console.log(err.message));

      socket.on('connect', () => {
        console.log('re - connected')
        setConnecting(true);
        socket.emit('join-room', { userId, roomId, userName });
    });
    
    socket.on('room-created', () => console.log('room created'));

    socket.on('user-joined', (roomInfo) => {
      console.log(roomInfo);
      setConnecting(false);
      dispatch(roomData(roomInfo));
    });


    return () => {
      socket.off('room-created');
      socket.off('user-joined');
  };
  }, [roomId, dispatch, userId, userName]);



  return (
    <div className='RoomMain'>
        <RoomSidebar />
        {
          connecting ? <p>Connecting....</p> :
          <RoomEditor />
        }
        <RoomRight />
    </div>
  )
}

export default RoomMain