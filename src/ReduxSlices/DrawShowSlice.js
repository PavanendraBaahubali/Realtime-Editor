import { createSlice } from "@reduxjs/toolkit";

const DrawShowSlice = createSlice({
    name : 'draw',
    initialState : false,
    reducers : {
        toggleExpand : (state, action) => {
            return !state;
        }
    }
    
})

export const {toggleExpand} = DrawShowSlice.actions;
export default DrawShowSlice.reducer;