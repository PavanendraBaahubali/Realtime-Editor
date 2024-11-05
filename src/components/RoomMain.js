import React, { useEffect, useState } from "react";
import "../styles/RoomMain.css";
import RoomEditor from "./RoomEditor";
import RoomRight from "./RoomRight";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roomData } from "../ReduxSlices/RoomSlice";
import socket from "../socket";
import ConnectedUses from "./ConnectedUses";

const RoomMain = () => {
  const { roomId } = useParams();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const [connecting, setConnecting] = useState(false);

  const dispatch = useDispatch();

  const isConnected = useSelector(
    (state) => state.popup.connectedPop.isConnected
  );
  console.log(isConnected);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/room/${roomId}`)
      .then((res) => {
        dispatch(roomData(res.data.roomData));
      })
      .catch((err) => console.log(err.message));

    socket.on("connect", () => {
      console.log("re - connected");
      setConnecting(true);
      socket.emit("join-room", { userId, roomId, userName });
    });

    socket.on("room-created", () => console.log("room created"));

    socket.on("user-joined", (roomInfo) => {
      console.log(roomInfo);
      setConnecting(false);
      dispatch(roomData(roomInfo));
    });

    return () => {
      socket.off("room-created");
      socket.off("user-joined");
    };
  }, [roomId, dispatch, userId, userName]);

  return (
    <div className="RoomMain">
      {connecting ? <p>Connecting....</p> : <RoomEditor />}
      <RoomRight />

      {isConnected && <ConnectedUses />}
    </div>
  );
};

export default RoomMain;
