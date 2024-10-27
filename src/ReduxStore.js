import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from '../src/ReduxSlices/PopupSlice'
import roomReducer from '../src/ReduxSlices/RoomSlice'


export const ReduxStore = configureStore({
    reducer : {
        'popup' : PopupReducer,
        'room' : roomReducer,
    }
})

