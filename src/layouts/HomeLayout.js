import React from 'react'
import '../styles/HomeLayout.css'
import TopBar from '../components/TopBar'
import HomeBody from '../components/HomeBody'
import Popup from '../popups/Popup'
import Blur from '../components/Blur'
import { useSelector } from 'react-redux'

const HomeLayout = () => {
  const isShowPopup = useSelector((state) => state.popup.isVisible);

  return (
    <div className = 'HomeLayout'>
        <TopBar />
        <HomeBody  />


        {/* Popups */}
        <Popup />
        {/* blue */}
        {isShowPopup &&
        
        <Blur />
        }
    </div>
  )
}

export default HomeLayout