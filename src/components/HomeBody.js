import React, { useEffect, useState } from 'react'
import '../styles/HomeBody.css'
import Sidebar from './Sidebar'
import RoomSidebar from './RoomSidebar'

const HomeBody = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900){
        setShow(true);
      }
      else{
        setShow(false);
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.addEventListener('resize', handleResize);
  }, [show])
  return (
    <div className='HomeBody'>
      {
        show ?
        <RoomSidebar /> 
        :
        <Sidebar />
      }
    </div>
  )
}

export default HomeBody