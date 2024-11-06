import React, { useEffect, useState } from "react";
import "../styles/HomeBody.css";
import Sidebar from "./Sidebar";
import RoomSidebar from "./RoomSidebar";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import ActiveRooms from "./ActiveRooms";

const HomeBody = () => {
  const [show, setShow] = useState(false);

  const location = useLocation();

  const path = location.pathname;
  console.log("pathname", path);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, [show]);

  if (path === "/active-rooms") {
    return (
      <div className="HomeBody">
        {show ? (
          <RoomSidebar />
        ) : (
          <>
            <Sidebar />
            <ActiveRooms />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="HomeBody">
      {show ? (
        <RoomSidebar />
      ) : (
        <>
          <Sidebar />
          <ReactQuill style={{ width: "80%" }} />
        </>
      )}
    </div>
  );
};

export default HomeBody;
