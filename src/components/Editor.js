import { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import socket from "../socket";
import "../styles/Editor.css";

const SAVE_INTERVAL_MS = 10000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["clean"],
];

export default function TextEditor({
  setSaving,
  setError,
  cursorDivRef,
  setQuill,
  quill,
}) {
  // const [quill, setQuill] = useState()

  const { roomId } = useParams();
  const userName = localStorage.getItem("userName");

  const [hasChanges, setHasChanges] = useState(false);

  const userId = localStorage.getItem("userId");
  const debounce = useRef();

  const getRowIdFromCursor = useCallback(() => {
    if (!quill) return;
    const range = quill.getSelection();
    if (!range) return null;
    const [line] = quill.getLine(range.index);
    console.log("line", line);
    return quill.getIndex(line);
  }, [quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    setQuill(quill);
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", roomId);
  }, [quill, roomId, setQuill]);

  // save doc
  useEffect(() => {
    if (socket == null || quill == null) return;

    if (hasChanges) {
      const interval = setTimeout(() => {
        console.log(quill.getContents());
        setSaving(true);
        socket.emit("save-document", { roomId, data: quill.getContents() });
      }, SAVE_INTERVAL_MS);

      socket.on("data-saved", () => {
        setSaving(false);
        setHasChanges(false);
      });

      return () => {
        clearTimeout(interval);
      };
    }
  }, [quill, roomId, hasChanges, setSaving]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      console.log(delta);
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [quill]);

  useEffect(() => {
    const handleLock = (locks) => {
      console.log("locks", locks);
    };
    socket.on("lock-activated", handleLock);

    // socket.on('lock-released', unlocked)

    const handleError = (err) => {
      setError(err);
      console.log(err);
    };
    socket.on("error", handleError);

    return () => {
      socket.off("lock-activated", handleLock);
      socket.off("error", handleError);
    };
  }, [userId, getRowIdFromCursor, setError]);

  // Setup stopTyping and whoIsTyping
  const stopTyping = useCallback(() => {
    socket.emit("stop-typing", { userId, roomId });
  }, [userId, roomId]);

  const whoIsTyping = useCallback(() => {
    const range = quill.getSelection();
    if (range) {
      console.log("typing activated");
      socket.emit("who-is-typing", {
        userId,
        roomId,
        userName,
        caretIndex: range.index,
      });
    }
  }, [quill, roomId, userId, userName]);

  // Text change handler
  const handleTextChange = useCallback(
    (delta, oldDelta, source) => {
      if (source !== "user") return;
      setHasChanges(true);
      whoIsTyping();
      socket.emit("send-changes", { delta, roomId });

      // Start or reset typing timeout
      if (debounce.current) clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        stopTyping();
      }, 4000);
    },
    [stopTyping, whoIsTyping, roomId]
  );

  // Attach listeners with useEffect
  useEffect(() => {
    if (!socket || !quill) return;

    quill.on("text-change", handleTextChange);

    return () => {
      quill.off("text-change", handleTextChange);
      clearTimeout(debounce.current); // Clear timeout on unmount
    };
  }, [quill, handleTextChange]);

  // Optional: Clean up debounce when the component unmounts
  useEffect(() => {
    return () => clearTimeout(debounce.current);
  }, []);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;

      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      // q.disable()
      q.setText("Loading...");
      setQuill(q);
    },
    [setQuill]
  );

  const style = {
    width: "100%",
    height: "100vh",
    position: "relative",
  };

  return (
    <>
      <div style={style} className="container" ref={wrapperRef}></div>
    </>
  );
}
