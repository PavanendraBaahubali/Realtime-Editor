// import React, {  useCallback, useEffect, useRef, useState } from 'react'
// import '../styles/DrawCanvas.css'
// import { ReactSketchCanvas } from "react-sketch-canvas";
// import OpenInFullIcon from '@mui/icons-material/OpenInFull';
// import AutorenewIcon from '@mui/icons-material/Autorenew';
// import DrawIcon from '@mui/icons-material/Draw';
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
// import NotInterestedIcon from '@mui/icons-material/NotInterested';
// import simplify from 'simplify-js';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const DrawCanvas = () => {
//     const [allowPen, setAllowPen] = useState(false);
//     const canvasRef = useRef(null);
//     const [eraseMode, setEraseMode] = useState(false);

//     const [isExpand, setExpand] = useState(false);
//     const [canvasData, setCanvasData] = useState([]);

//     const [isSaving, setSaving] = useState(false);

//     const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

//     const {roomId} = useParams();

//     // useEffect(() => {
//     //     axios.get(`${process.env.REACT_APP_API_URL}/room/${roomId}`)
//     //     .then((res) => {
//     //         const canvas = res.data.roomData.canvasData;
//     //         console.log(canvas);
//     //         if(canvas && canvasRef && canvasRef.current && canvasRef.current.loadPaths){
//     //             canvasRef.current.loadPaths(canvas);
//     //         }
//     //     })
//     //     .catch(err => console.log(err.message));
//     // }, [roomId]);

//     const handleEraserClick = () => {
//         setEraseMode(true);
//         setAllowPen(false);
//         canvasRef.current?.eraseMode(true);
//     };

//     const handlePenOnClick = () => {
//         setAllowPen(true);
//         setEraseMode(false);
//         canvasRef.current?.eraseMode(false);
//     };

//     const handleClearClick = () => {
//         canvasRef.current?.clearCanvas();
//         setCanvasData([])
//       };

//         useEffect(() => {
//             console.log(canvasData);
//         }, [canvasData]);

//         // const handleOnChange = (e) => {
//         //     try {
//         //       const updatedCanvasData = e; // Assume `e` is your canvas data here
//         //       const lastIndex = updatedCanvasData.length - 1;

//         //       if (lastIndex >= 0) {
//         //         const tolerance = 2; // Increased tolerance for more aggressive simplification
//         //         const lastPath = updatedCanvasData[lastIndex].paths;

//         //         // Simplify the path to reduce the number of points
//         //         updatedCanvasData[lastIndex].paths = simplify(lastPath, tolerance);

//         //         // Only encode if there are enough points left after simplification
//         //         if (updatedCanvasData[lastIndex].paths.length > 5) { // Example threshold
//         //           // Prepare data in Protobuf format
//         //           const DrawingData = protobuf.DrawingData;

//         //           // Encoding the data into a Protobuf binary format
//         //           const encodedData = DrawingData.encode({
//         //             strokeColor: updatedCanvasData[lastIndex].strokeColor,
//         //             strokeWidth: updatedCanvasData[lastIndex].strokeWidth,
//         //             paths: updatedCanvasData[lastIndex].paths
//         //           }).finish();

//         //           // Compress the data using pako
//         //           const compressedData = pako.deflate(encodedData);
//         //           console.log('compressedData', compressedData);

//         //             setCanvasData(compressedData);

//         //         }
//         //       }
//         //     } catch (err) {
//         //       console.error('Error encoding data with Protobuf:', err);
//         //     }
//         //   };

// const handleOnChange = (e) => {

//     const canvas = e
//     const simpleData = {}
//     simpleData['drawMode'] = true;
//     simpleData['strokeColor'] = '#a855f7';
//     simpleData['strokeWidth'] = 10;
//     simpleData['paths'] = e.paths;
//     console.log(e)
//     console.log('simple paths', simpleData);

// };

//       console.log('canvasData', canvasData);

//       const saveCanvasData = useCallback( async () => {
//             try{
//                 setSaving(true);
//                 console.log('roomId', roomId);
//                 console.log('canvasData outside', canvasData);
//                 if (canvasData){

//                     console.log('canvasData inside', canvasData);
//                     await axios.post(`${process.env.REACT_APP_API_URL}/room/${roomId}/canvas/save`,{
//                         canvasData,
//                         roomId
//                     });
//                     console.log('after saved---------------------')
//                     console.log('data saved----------');
//                 }
//             }
//             catch(err){
//                 console.log(err);
//             }
//             finally{
//                 setSaving(false);
//                 setHasUnsavedChanges(false);
//             }
//       }, [canvasData, roomId]);

//     //   useEffect(() => {
//     //     if (hasUnsavedChanges){
//     //         const timeoutId = setTimeout(() => {
//     //             console.log('called auto save');
//     //             saveCanvasData();
//     //         }, 10000)

//     //         return () => clearTimeout(timeoutId);
//     //     }

//     //   }, [hasUnsavedChanges, saveCanvasData])

//       const handleManualSave = async() => {
//         try{
//             setSaving(true);
//             console.log(canvasData)
//             await saveCanvasData();

//         }
//         catch(err){
//             console.log(err.message);
//         }
//         finally{
//             setSaving(false);
//         }
//       }

//   return (
//     <div className={!isExpand ?  'DrawCanvas' : 'DrawCanvas-expand'}>
//         <div className='draw-expand' >
//             <div className = 'tools'>

//             <div
//             onClick={handlePenOnClick}
//             className={!allowPen ? 'tool' : 'tool-active'}>
//                 <DrawIcon />
//             </div>

//             <div
//             onClick={handleEraserClick}
//             className={!eraseMode ?  'tool' : 'tool-active'}>
//                 <AutoFixHighIcon />
//             </div>
//             <div
//             onClick={handleClearClick}
//              className='tool'>
//                 <NotInterestedIcon />
//             </div>

//             <div
//             className='draw-autosave'>

//                         < p>{!isSaving ? 'Saved' : 'Saving...'}</p>
//                     <span onClick={handleManualSave}><AutorenewIcon /></span>
//                 </div>

//             </div>

//             <span
//             onClick={() => setExpand(!isExpand)}
//              className='expand'><OpenInFullIcon /></span>
//         </div>
//         <div className="canvas-wrapper">

//     <ReactSketchCanvas
//         className='sketch-canvas'
//         allowOnlyPointerType="mouse"
//         style={{
//             border: 'none',
//             borderRadius: '20px',
//         }}
//         onChange={e => handleOnChange(e)}
//         ref={canvasRef}
//         width="100%"
//         height="100%"
//         canvasColor="transparent"
//         strokeColor="#a855f7"
//     />
// </div>
//     </div>
//   )
// }

// export default DrawCanvas
