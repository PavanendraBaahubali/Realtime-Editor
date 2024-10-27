import { createSlice } from "@reduxjs/toolkit";

const PopupSlice = createSlice({
    name: 'popup',
    initialState : {
        isVisible : false,
        popupType : ''
    },
    reducers : {
        togglePopup : (state, action) => {
            state.isVisible = !state.isVisible;
            state.popupType = action.payload;
        },
       
    }
})

export const {togglePopup} = PopupSlice.actions;
export default PopupSlice.reducer;
