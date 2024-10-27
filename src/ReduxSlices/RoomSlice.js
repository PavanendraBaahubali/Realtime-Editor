import { createSlice } from "@reduxjs/toolkit";

const RoomSlice = createSlice({
    name : 'room',
    initialState : {},
    reducers : {
        roomData : (state, action) => {
            return action.payload;
        }
    }
})

export const {roomData} = RoomSlice.actions;
export default RoomSlice.reducer;