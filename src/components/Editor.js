import React, { useEffect, useRef, useCallback } from 'react';
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

    // Fetch initial content from the API
    useEffect(() => {
        const fetchInitialContent = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/room/${roomId}`);
                const data = await response.json();
                contentRef.current = data.content;

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
        if (newContent !== contentRef.current) {
            storeCursorPosition();
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
        if (contentRef.current) {
            try {
                await fetch(`${process.env.REACT_APP_API_URL}/room/${roomId}/save`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: contentRef.current }),
                });
            } catch (error) {
                console.error("Error saving content to database:", error);
            }
        }
    }, [roomId]);

    // Save content at regular intervals
    useEffect(() => {
        const intervalId = setInterval(saveContentToDatabase, 10000);
        return () => clearInterval(intervalId);
    }, [saveContentToDatabase]);

    return (
        <div className={styleName}>
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