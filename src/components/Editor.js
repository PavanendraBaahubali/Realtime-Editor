import React, { useEffect, useRef, useCallback, useState } from 'react';
import '../styles/Editor.css';
import "react-quill/dist/quill.snow.css";
import QuillEditor from "react-quill";
import socket from '../socket.js';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

const modules = {
    toolbar: {
        container: [
            [{ header: [2, 3, 4, false] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ color: [] }],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    },
    clipboard: {
        matchVisual: true,
    },
};

const Editor = ({ styleName }) => {
    const { roomId } = useParams();
    const quillRef = useRef(null);
    const contentRef = useRef('');
    const isLocalUpdate = useRef(false);
    const lastCursorPosition = useRef(null);
    
    const [version, setVersion] = useState(0);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Fetch initial content from the API
    useEffect(() => {
        const fetchInitialContent = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/room/${roomId}`);
                const data = await response.json();
                contentRef.current = data.roomData.content;

                setVersion(data.roomData.version);

                if (quillRef.current) {
                    const editor = quillRef.current.getEditor();
                    editor.setContents(editor.clipboard.convert(contentRef.current));
                }
            } catch (error) {
                console.error("Error fetching initial content:", error);
            }
        };

        fetchInitialContent();
    }, [roomId]);


    // Store cursor position before any content update
    const storeCursorPosition = useCallback(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            lastCursorPosition.current = editor.getSelection();
        }
    }, []);

    // Restore cursor position after content update
    const restoreCursorPosition = useCallback(() => {
        if (quillRef.current && lastCursorPosition.current) {
            const editor = quillRef.current.getEditor();
            // Small delay to ensure content is fully updated
            setTimeout(() => {
                editor.setSelection(lastCursorPosition.current);
            }, 0);
        }
    }, []);

    // Handle updates from other clients
    useEffect(() => {
        const handleUpdatedContent = (newContent) => {
            if (newContent !== contentRef.current && quillRef.current && !isLocalUpdate.current) {
                const editor = quillRef.current.getEditor();
                storeCursorPosition();
                
                contentRef.current = newContent;
                editor.setContents(editor.clipboard.convert(newContent));
                
                restoreCursorPosition();
            }
        };

        socket.on('updated-content', handleUpdatedContent);

        return () => {
            socket.off('updated-content', handleUpdatedContent);
        };
    }, [storeCursorPosition, restoreCursorPosition]);

    // Debounced function to handle local content changes
    const debounceHandleChange = useRef(
        _.debounce((newContent) => {
            isLocalUpdate.current = true;
            socket.emit('content-update', { roomId, content: newContent });
            setTimeout(() => {
                isLocalUpdate.current = false;
            }, 100);
        }, 300)
    ).current;

    const handleOnChange = (newContent) => {
      console.log('handle on change', newContent !== contentRef.current)
        if (newContent !== contentRef.current) {
            storeCursorPosition();
            setHasUnsavedChanges(true)
            contentRef.current = newContent;
            debounceHandleChange(newContent);
        }
    };

    // Track cursor position changes
    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            editor.on('selection-change', (range) => {
                if (range) {
                    lastCursorPosition.current = range;
                }
            });
        }
    }, []);

    // Function to save content to the database

const saveContentToDatabase = useCallback(async () => {
  if (contentRef.current && !isSaving && hasUnsavedChanges) {
      setIsSaving(true);
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/room/${roomId}/save`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  content: contentRef.current,
                  version: version 
              }),
          });

          const data = await response.json();
          console.log('data inside save data', data);
          if (data.status === 'SUCCESS') {
              setVersion(data.version);
              setError(null);
              setLastSaved(new Date().toLocaleTimeString());
              setHasUnsavedChanges(false);

          } else if (data.status === 'CONFLICT') {
              setError("Content was updated by another user. Refreshing...");

              // Fetch the latest content and update the state
              const refreshResponse = await fetch(`${process.env.REACT_APP_API_URL}/room/${roomId}`);
              const refreshData = await refreshResponse.json();

              if (refreshData.status === 'SUCCESS') {
                  contentRef.current = refreshData.content;
                  setVersion(refreshData.version);
                  
                  if (quillRef.current) {
                      const editor = quillRef.current.getEditor();
                      editor.setContents(editor.clipboard.convert(refreshData.content));
                  }
              }
          }
      } catch (error) {
          console.log("Error saving content to database:", error);
          setError("Failed to save changes. Please try again.");
      } finally {
          setIsSaving(false);
          setHasUnsavedChanges(false);
      }
  }
}, [roomId, version, isSaving, hasUnsavedChanges]);


    // Save content at regular intervals
    useEffect(() => {
      if (hasUnsavedChanges) {
        const timeoutId = setTimeout(() => {
          saveContentToDatabase();
        }, 10000); // Adjust the delay as needed
    
        return () => clearTimeout(timeoutId);
      }
    }, [hasUnsavedChanges, saveContentToDatabase]);


    const handleManualSave = async () => {
      await saveContentToDatabase();
  };



  const getRowIdFromCursor = (editor) => {
    const range = editor.getSelection();
    console.log('range', range);
    if (!range) return null;
    const [line] = editor.getLine(range.index);
    console.log(line);
    return editor.getIndex(line);
  };

  const test = () => {
    const editor = quillRef.current.getEditor();
    const currentRowId = getRowIdFromCursor(editor);
    console.log('row id', currentRowId)
    console.log('editor', editor)
  }
 
  test();

    return (
      <div className={styleName}>
      <div className="editor-header">
          {error && (
              <div className="error-message">
                  {error}
              </div>
          )}
          <div className="save-status">
              {isSaving && <span>Saving...</span>}
              {lastSaved && <span>Last saved at {lastSaved}</span>}
              <button 
                  onClick={handleManualSave} 
                  disabled={isSaving}
                  className="save-button"
              >
                  Save Now
              </button>
          </div>
      </div>
      <QuillEditor
          ref={quillRef}
          className='quill-editor'
          theme={'snow'}
          defaultValue={contentRef.current}
          onChange={handleOnChange}
          modules={modules}
      />
  </div>
    );
};

export default Editor;