import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from '../src/ReduxSlices/PopupSlice'
import roomReducer from '../src/ReduxSlices/RoomSlice'
import drawReducer from '../src/ReduxSlices/DrawShowSlice'


export const ReduxStore = configureStore({
    reducer : {
        'popup' : PopupReducer,
        'room' : roomReducer,
        'draw' : drawReducer,
    }
})

