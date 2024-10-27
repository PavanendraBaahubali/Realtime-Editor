import React from 'react'
import '../styles/CreateRoom.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../ReduxSlices/PopupSlice';

const CreateRoom = () => {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(togglePopup('create-room'))} className='CreateRoom'>
        <AddCircleOutlineIcon/>
        <h2>Create Room</h2>
    </div>
  )
}

export default CreateRoom