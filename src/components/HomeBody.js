import React from 'react'
import '../styles/HomeBody.css'
import Sidebar from './Sidebar'
import Editor from './Editor'

const HomeBody = () => {
  return (
    <div className='HomeBody'>
        <Sidebar />
        <Editor styleName='Editor' />
    </div>
  )
}

export default HomeBody