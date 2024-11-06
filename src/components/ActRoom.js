import React from "react";
import "../styles/ActRoom.css";

const ActRoom = ({ roomName, roomId }) => {
  return (
    <div className="ActRoom">
      <div className="room-title">
        <h4>{roomName}</h4>
        <p>{roomId}</p>
      </div>
    </div>
  );
};

export default ActRoom;
