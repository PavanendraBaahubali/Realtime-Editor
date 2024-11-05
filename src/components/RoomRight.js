import React from 'react'
import '../styles/RoomRight.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Draw from './Draw';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../ReduxSlices/PopupSlice';

const RoomRight = () => {
  const dispatch = useDispatch();
  let isConnected = false;
  const handleOnclick = () => {
    isConnected = dispatch(togglePopup('connectedTop'))
  }
  return (
    <div 
    onBlur={isConnected = !isConnected}
    className={isConnected ? 'RoomRight' : 'room-right-connected-close'}>
        <div
            onClick={handleOnclick}
            className='users-connected'>
                <AccountCircleIcon />
        </div>
        
        <Draw />
    </div>
  )
}

export default RoomRight