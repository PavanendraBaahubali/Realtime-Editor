import React from 'react'
import '../styles/TopLeft.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
const TopLeft = () => {
  const userName = localStorage.getItem('userName');

  return (
    <div className='TopLeft'>
        <NotificationsNoneIcon />
        <div className='profile'>
            <h5>{userName}</h5>
            <div className='profile-img'></div>
        </div>
        <div className='notify-cnt'>
            <p>20</p>
        </div>
    </div>
  )
}

export default TopLeft