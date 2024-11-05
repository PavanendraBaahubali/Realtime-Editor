import React from 'react'
import '../styles/DrawIcon.css'
import DrawIcon from '@mui/icons-material/Draw';
import { useDispatch } from 'react-redux';
import { toggleExpand } from '../ReduxSlices/DrawShowSlice';

const Draw = () => {
  const dispatch = useDispatch();
  return (
    <div
    onClick={() => dispatch(toggleExpand())}
     className='DrawIcon'>
        <DrawIcon />
    </div>

  )
}

export default Draw