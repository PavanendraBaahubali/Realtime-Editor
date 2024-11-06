import React, { useEffect, useRef, useState } from "react";
import "../styles/RoomEditor.css";
import TextEditor from "./Editor";
import socket from "../socket";

const RoomEditor = () => {
  const [error, setError] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState("");
  const cursorDivRef = useRef(null);

  const [activeUsers, setActiveUsers] = useState([]);

  const curUserId = localStorage.getItem("userId");
  const [quill, setQuill] = useState();

  useEffect(() => {
    console.log("active users ", activeUsers);
  }, [activeUsers]);

  useEffect(() => {
    const handleStoppedTyping = (updatedUsers) => {
      console.log("stopeed tuping&&&***__________", updatedUsers);
      setActiveUsers(updatedUsers);
    };

    socket.on("user-stopped-typing", handleStoppedTyping);

    const handleWhoIsTyping = ({ curTypingUsers }) => {
      console.log("cur******************", curTypingUsers);
      setActiveUsers(curTypingUsers);
    };
    socket.on("typing-found", handleWhoIsTyping);
    return () => {
      socket.off("typing-found", handleWhoIsTyping);
      socket.off("user-stopped-typing", handleStoppedTyping);
    };
  }, [curUserId, activeUsers]);

  return (
    <div className="room-editor">
      <div className="editor-header">
        {error && <div className="error-message">{error}</div>}
        <div className="save-status">
          {isSaving && <span>Saving...</span>}
          {lastSaved && <span>Last saved at {lastSaved}</span>}
          <button
            // onClick={handleManualSave}
            disabled={isSaving}
            className="save-button"
          >
            Save Now
          </button>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <TextEditor
          setQuill={setQuill}
          quill={quill}
          setError={setError}
          setSaving={setSaving}
          setLastSaved={setLastSaved}
          cursorDivRef={cursorDivRef}
        />

        {activeUsers.length > 0 &&
          activeUsers.map(({ userId, userName, caretIndex }) => {
            console.log(caretIndex);

            const range = quill.getSelection();
            let bounds;
            if (range) {
              bounds = quill.getBounds(caretIndex); // Use caretIndex from map callback
              if (!bounds) return null;

              // Proceed with bounds-related operations
              console.log(`Bounds for ${userName}:`, bounds);
            } else {
              return null;
            }

            return (
              <div
                key={userId}
                style={{
                  position: "absolute",
                  left: `${bounds.left + 38}px`,
                  top: `${bounds.top - bounds.height + 40}px`,
                  // height: `${bounds.height}px`,
                  minWidth: "2%",
                  maxWidth: "10%",
                  backgroundColor: "#ecb0ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "12px 20px",
                  borderLeft: "4px solid #f76f6f",
                  pointerEvents: "none",
                  transform: "translate(-50%, -5px)",
                }}
                title={userName}
              >
                <p style={{ position: "absolute", fontSize: "14px" }}>
                  {curUserId !== userId ? userName : "You"}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RoomEditor;
