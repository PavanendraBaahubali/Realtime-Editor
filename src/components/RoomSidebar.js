import React from 'react'
import '../styles/RoomSidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

const RoomSidebar = () => {
  return (
    <div className='RoomSidebar'>
        <div className='roomside-nav'>
            <li><HomeIcon /></li>
            <li><BorderColorIcon /></li>
            <li><MeetingRoomIcon /></li>
            <li><NoMeetingRoomIcon /></li>
            <li><GroupAddIcon /></li>
            <li><SpaceDashboardIcon /></li>
        </div>
    </div>
  )
}

export default RoomSidebar