import { createSlice } from "@reduxjs/toolkit";

const PermissionSlice = createSlice({
  name: "readOnly",
  initialState: {},
  reducers: {
    readOnly: (state, action) => {
      console.log("action.payload", action.payload);
      return action.payload;
    },
  },
});

export const { readOnly } = PermissionSlice.actions;
export default PermissionSlice.reducer;
