import React from 'react'
import '../styles/ConnectedUses.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
const ConnectedUses = () => {
    const roomData = useSelector((state) => state.room);
    const connectedUsers = roomData.connectedUsers;

  return (
    <div className='ConnectedUses'>
        <div className='connectedUsers-head'>
            <h3>{'Connected Users (0)'}</h3>
            

        </div>
        <div className='connectedUsers-body'>
            <div className='connectedUsers-body-wrapper'>

                {
                    connectedUsers && connectedUsers.length > 0 ?
                    connectedUsers.map((user) => (

                        <div className='user-info'>
                        <div className='connected-user'>
                                <div className='connected-user-profile'></div>
                                <h4>{user.userName}</h4>
                        </div>
                            <MoreHorizIcon />
                        </div>
                    ))

                    :
                    <p>No Users in the room right now.</p>
                }

            </div>
        </div>
    </div>
  )
}

export default ConnectedUses