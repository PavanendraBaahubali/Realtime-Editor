import React, { useCallback } from "react";
import "../styles/connectOptions.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import socket from "../socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ConnectOptions = () => {
  const { roomId } = useParams();

  const userData = useSelector((state) => state.permission);
  console.log("user data", userData);
  const userId = userData.userId;

  const handleReadOnly = useCallback(() => {
    console.log("activated********************8");
    socket.emit("read-only", { userId, roomId });
  }, [userId, roomId]);

  // console.log("userName", userName);
  return (
    <div className="connectOptions">
      <div onClick={() => handleReadOnly()} className="connect-option">
        <p>Read only</p>
        <VisibilityIcon />
      </div>

      <div className="connect-option">
        <p>Read Write</p>
        <CreateIcon />
      </div>

      <div className="connect-option">
        <p>Remove</p>
        <LogoutIcon />
      </div>
    </div>
  );
};

export default React.memo(ConnectOptions);
