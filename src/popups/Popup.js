import React, { useEffect, useState } from 'react'
import '../styles/Popup.css'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopup } from '../ReduxSlices/PopupSlice';
import socket from '../socket'
import { useNavigate } from 'react-router-dom';

const Popup = () => {
    const dispatch = useDispatch();
    const isShowPopup = useSelector((state) => state.popup.isVisible);
    const popupType = useSelector((state) => state.popup.popupType);

    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState('')

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    const [roomName, setRoomName] = useState('')
    const [roomId, setRoomId] = useState('');

    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();


  

  useEffect(() => {
    socket.on('error', (msg) => {
      setError(true);
      setErrMsg(msg);
    });
  }, [])

    const handleCreateRoom = () => {
      try{
        setLoading(true);
        socket.emit('create-room', ({userId, roomName, userName}));
        
        socket.on('room-created', (newRoomId) => {
          setLoading(false);
          dispatch(togglePopup())
          navigate(`/room/${newRoomId}`)
          
        })
      }
      catch(err){
        console.log(err.message);
      }
    }

    const handleJoinRoom = () => {
      try{
        setLoading(true);
        socket.emit('join-room', ({userId, userName, roomId}));

          socket.on('user-joined', () => {
          dispatch(togglePopup())
          setLoading(false);
          navigate(`/room/${roomId}`);
      });
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }

    if(popupType === 'join-room'){
      return (
        <div className={isShowPopup ? 'Popup' : 'popup-close'}>
            <h3>Join Room</h3>
            <input
            value = {roomId}
            onChange={(e) => setRoomId(e.target.value)}
             type='text' placeholder='Room Id'></input>

          {error && <p>{errMsg}</p>}

            <button onClick={() => handleJoinRoom()}>{!isLoading ? 'Join' : 'Joining...'}</button>
    
            <span onClick={() => dispatch(togglePopup())}><CloseIcon className='close-btn' /></span>
    
        </div>
      )
    }


  return (
    <div className={isShowPopup ? 'Popup' : 'popup-close'}>
        <h3>Create Room</h3>
        <input 
        value = {roomName}
        onChange={(e) => setRoomName(e.target.value)}
        type='text' placeholder='Room Name'></input>
        <button onClick={handleCreateRoom}>{!isLoading ? 'Create' : 'Creating...'}</button>

        <span onClick={() => dispatch(togglePopup())}><CloseIcon className='close-btn' /></span>

    </div>
  )
}

export default Popup