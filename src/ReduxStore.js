import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from "../src/ReduxSlices/PopupSlice";
import roomReducer from "../src/ReduxSlices/RoomSlice";
import drawReducer from "../src/ReduxSlices/DrawShowSlice";
import PermissonReducer from "../src/ReduxSlices/PermissionSlice";

export const ReduxStore = configureStore({
  reducer: {
    popup: PopupReducer,
    room: roomReducer,
    draw: drawReducer,
    permission: PermissonReducer,
  },
});
