import React, { useEffect, useRef } from 'react';
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
    const isUpdatingFromServer = useRef(false);
    const localContentRef = useRef('');  // Track local content to compare with server updates

    useEffect(() => {
        const handleUpdatedContent = (newContent) => {
            if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                
                // Only update if the incoming content is different
                if (localContentRef.current !== newContent) {
                    isUpdatingFromServer.current = true;

                    const cursorPosition = editor.getSelection()?.index || 0;
                    editor.clipboard.dangerouslyPasteHTML(newContent); // Update content safely

                    editor.setSelection(cursorPosition);  // Preserve cursor position
                    localContentRef.current = newContent;  // Sync local content

                    setTimeout(() => {
                        isUpdatingFromServer.current = false;
                    }, 100);
                }
            }
        };

        socket.on('updated-content', handleUpdatedContent);

        return () => {
            socket.off('updated-content', handleUpdatedContent);
        };
    }, []);

    // Emit changes to the server only when user types
    const debounceEmitChange = useRef(
        _.debounce((content) => {
            if (!isUpdatingFromServer.current) {
                socket.emit('content-update', { roomId, content });
            }
        }, 300)
    ).current;

    const handleOnChange = (newContent) => {
        if (!isUpdatingFromServer.current) {
            localContentRef.current = newContent;  // Track local changes
            debounceEmitChange(newContent);  // Emit only when not server-triggered
        }
    };

    return (
        <div className={styleName}>
            <QuillEditor
                ref={quillRef}
                className='quill-editor'
                theme={'snow'}
                value={localContentRef.current}
                onChange={handleOnChange}
                modules={modules}
            />
        </div>
    );
};

export default Editor;
