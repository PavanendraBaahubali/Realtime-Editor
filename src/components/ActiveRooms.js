import React, { useEffect, useState } from "react";
import "../styles/ActiveRooms.css";
import ActRoom from "./ActRoom";
import socket from "../socket";
import { NavLink } from "react-router-dom";

const ActiveRooms = () => {
  const [createdRooms, setCreatedRooms] = useState([]);

  const userId = localStorage.getItem("userId");
  const skip = 0;
  const limit = 6; // Records per request

  useEffect(() => {
    const hanldeCreatedRooms = ({ createdRooms }) => {
      console.log("createdRooms", createdRooms);
      setCreatedRooms(createdRooms);
    };

    socket.on("createdRooms", hanldeCreatedRooms);

    // setIsLoading(true);
    socket.emit("getCreatedRooms", { userId, skip, limit });

    return () => {
      socket.off("getCreateRooms", { userId, skip, limit });
      socket.off("createdRooms", hanldeCreatedRooms);
    };
  }, [skip, userId]);

  return (
    <div className="ActiveRooms">
      <h3>Created Rooms</h3>
      <div className="active-wrapper">
        {createdRooms.length > 0 ? (
          createdRooms.map((room) => (
            <NavLink to={`/room/${room._id}`}>
              <ActRoom roomName={room.roomName} roomId={room._id} />
            </NavLink>
          ))
        ) : (
          <p style={{ textAlign: "left", fontWeight: "700px" }}>
            No Created Rooms Were Found
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveRooms;
