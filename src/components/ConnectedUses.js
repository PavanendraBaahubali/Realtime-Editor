import React, { useCallback, useEffect, useState } from "react";
import "../styles/ConnectedUses.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import ConnectOptions from "./ConnectOptions";
import socket from "../socket";
import { readOnly } from "../ReduxSlices/PermissionSlice";
import { useParams } from "react-router-dom";

const ConnectedUses = () => {
  const roomData = useSelector((state) => state.room);
  const connectedUsers = roomData.connectedUsers;
  const noOfUsers = connectedUsers ? connectedUsers.length : 0;

  // Track which user's options are shown
  const [showOptions, setShowOptions] = useState(false);
  const [readOnlyUsers, setReadOnlyUsers] = useState([]);
  const [readAndWriteUsers, setReadAndWriteUsers] = useState([]);

  const curUserId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    console.log("read only in useEffect", readOnlyUsers);
    console.log("read and write in useEffect", readAndWriteUsers);
  }, [readOnlyUsers, readAndWriteUsers]);

  useEffect(() => {
    const hanldeSomething = ({ roomData }) => {
      setShowOptions(false);

      console.log(roomData);
      const readOnly = roomData.connectedUsers.filter((user) => user.readOnly);
      const readAndWrite = roomData.connectedUsers.filter(
        (user) => user.readAndWrite
      );
      console.log("read only", readOnly);
      console.log("read and write", readAndWrite);

      setReadAndWriteUsers(readAndWrite);
      setReadOnlyUsers(readOnly);
    };

    socket.on("read-only-applied", hanldeSomething);
    return () => {
      socket.off("read-only-applied", hanldeSomething);
    };
  }, []);

  useEffect(() => {
    const handleAllTypes = ({ roomData }) => {
      console.log(roomData);
      const read = roomData.connectedUsers.filter((user) => user.readOnly);
      const readWrite = roomData.connectedUsers.filter(
        (user) => user.readAndWrite
      );
      setReadAndWriteUsers(readWrite);
      setReadOnlyUsers(read);
    };
    socket.on("allTypeUsers", handleAllTypes);
    socket.emit("getUsers", { roomId });

    return () => {
      socket.off("getUsers", handleAllTypes);
      socket.off("allTypeUsers", handleAllTypes);
    };
  }, [roomId]);

  const handleShowOptions = useCallback(
    (userId, userName) => {
      if (roomData.creatorId === curUserId) {
        if (!showOptions) {
          console.log("userId", userId.toString(), "username", userName);
          dispatch(readOnly({ userId, userName }));
        }
        setShowOptions(!showOptions);
      }
    },
    [showOptions, roomData.creatorId, curUserId, dispatch]
  );

  return (
    <div onBlur={() => setShowOptions(false)} className="ConnectedUses">
      <div className="connectedUsers-head">
        <h3>{`Connected Users (${noOfUsers})`}</h3>
      </div>
      <div className="connectedUsers-body">
        <div className="connectedUsers-body-wrapper">
          {/* Host */}
          {connectedUsers && connectedUsers.length > 0 ? (
            connectedUsers.map(
              (user) =>
                roomData.creatorId === user.userId && (
                  <div className="user-info" key={user.userId}>
                    <div className="connected-user">
                      <div className="connected-user-profile"></div>
                      <h4>{user.userName}</h4>
                      {roomData.creatorId === user.userId && (
                        <p className="host">HOST</p>
                      )}
                    </div>
                    <span
                      onClick={() =>
                        handleShowOptions(user.userId, user.userName)
                      }
                    >
                      <MoreHorizIcon />
                    </span>
                  </div>
                )
            )
          ) : (
            <></>
          )}

          {/* read only users */}
          <>
            {readOnlyUsers.length > 0 && (
              <h5 style={{ margin: "0px" }}>Read Only</h5>
            )}
            {readOnlyUsers.length > 0 &&
              readOnlyUsers.map(
                (readUser) =>
                  roomData.creatorId !== readUser.userId && (
                    <>
                      <div className="user-info" key={readUser.userId}>
                        <div className="connected-user">
                          <div className="connected-user-profile"></div>
                          <h4>{readUser.userName}</h4>
                        </div>
                        <span
                          onClick={(e) =>
                            handleShowOptions(
                              readUser.userId,
                              readUser.userName
                            )
                          }
                        >
                          <MoreHorizIcon />
                        </span>
                      </div>
                    </>
                  )
              )}
          </>

          {/*  users */}

          <>
            {readAndWriteUsers && readAndWriteUsers.length > 0 && (
              <h5 style={{ margin: "0px" }}>Users</h5>
            )}
            {readAndWriteUsers && readAndWriteUsers.length > 0 ? (
              readAndWriteUsers.map((user) =>
                roomData.creatorId !== user.userId ? (
                  <>
                    <div className="user-info" key={user.userId}>
                      <div className="connected-user">
                        <div className="connected-user-profile"></div>
                        <h4>{user.userName}</h4>
                      </div>
                      <span
                        onClick={() =>
                          handleShowOptions(user.userId, user.userName)
                        }
                      >
                        <MoreHorizIcon />
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )
              )
            ) : (
              <></>
            )}
          </>

          {showOptions && <ConnectOptions />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConnectedUses);
