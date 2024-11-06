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
      // setCreatedRooms((prevRooms) => [...prevRooms, createdRooms]);
      setCreatedRooms(createdRooms);
      // setSkip((prevSkip) => prevSkip + limit);
      // setIsLoading(false);
    };

    socket.on("createdRooms", hanldeCreatedRooms);

    // setIsLoading(true);
    socket.emit("getCreatedRooms", { userId, skip, limit });

    return () => {
      socket.off("getCreateRooms", { userId, skip, limit });
      socket.off("createdRooms", hanldeCreatedRooms);
    };
  }, [skip, userId]);

  // Scroll event to load more rooms
  // const handleScroll = useCallback(() => {
  //   console.log("triggerd");
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.offsetHeight - 10 &&
  //     !isLoading
  //   ) {
  //     console.log("fetch data");
  //     socket.emit("getCreatedRooms", { userId, skip, limit });
  //     setIsLoading(true);
  //   }
  // }, [isLoading, skip, userId]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading, handleScroll]);

  return (
    <div className="ActiveRooms">
      <h3>Active Rooms</h3>
      <div className="active-wrapper">
        {createdRooms.length > 0 &&
          createdRooms.map((room) => (
            <NavLink to={`/room/${room._id}`}>
              <ActRoom roomName={room.roomName} roomId={room._id} />
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default ActiveRooms;
