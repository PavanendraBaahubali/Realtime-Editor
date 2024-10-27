import '../styles/Sidebar.css'
import CreateRoom from './CreateRoom'
import HomeIcon from '@mui/icons-material/Home';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../ReduxSlices/PopupSlice';



const Sidebar = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

  return (
    <div className='Sidebar'>
        <CreateRoom />
        <div className='side-nav'>
            <li>
                <HomeIcon />
                Home</li>
            <NavLink to= '/editor'>
            <li>
                <BorderColorIcon />
                Editor</li>
            </NavLink>
            <li>
                <MeetingRoomIcon />
                Active Rooms</li>
            <li>
                <NoMeetingRoomIcon />
                Closed Rooms</li>
            <li onClick={() => dispatch(togglePopup('join-room'))}>
                <GroupAddIcon />
                Join Room</li>
            <li>
                <SpaceDashboardIcon />
                Dash Board</li>
        </div>
            <button onClick={() => {
                localStorage.removeItem('token')
                navigate('/auth')
            }} className='log-out'>Log Out</button>
    </div>
  )
}

export default Sidebar