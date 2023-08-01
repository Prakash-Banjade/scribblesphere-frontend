import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = (props) => {
    const editorRef = useRef(null);

    useEffect(() => {
        const editor = editorRef.current;
        if (editor) {
            const observer = new MutationObserver(() => {
                // Handle the mutation event, if needed.
            });

            observer.observe(editor, {
                childList: true,
                subtree: true,
            });

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return <ReactQuill ref={editorRef} {...props} value={props.content} onChange={props.onContentChange} />;
};

export default TextEditor;
