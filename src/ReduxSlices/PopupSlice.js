import { createSlice } from "@reduxjs/toolkit";

const PopupSlice = createSlice({
    name: 'popup',
    initialState : {
        isVisible : false,
        popupType : '',
        connectedPop : {
            isConnected : false,
        }
    },
    reducers : {
        togglePopup : (state, action) => {
            if (action.payload === 'connectedTop'){
                state.connectedPop.isConnected =  !state.connectedPop.isConnected;
            }
            else{

                state.isVisible = !state.isVisible;
                state.popupType = action.payload;
            }
        },
       
    }
})

export const {togglePopup} = PopupSlice.actions;
export default PopupSlice.reducer;
