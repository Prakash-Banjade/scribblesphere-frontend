import React from 'react'
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
import imageCompression from 'image-compressor';


Quill.register('modules/imageResize', ImageResize);

const quill = new Quill('#editor', {
    // Your other Quill options
    modules: {
        imageResize: {
            modules: ['Resize', 'DisplaySize'],
        },
    },
});


quill.on('editor-change', (eventName, ...args) => {
    if (eventName === 'text-change') {
        const range = quill.getSelection();
        if (range) {
            const [ops] = args;
            ops.forEach((op) => {
                if (op.insert && typeof op.insert === 'object') {
                    const image = new Image();
                    image.src = op.insert.image;

                    image.onload = async () => {
                        // Set the maximum width and height of the compressed image
                        const maxWidth = 800;
                        const maxHeight = 600;

                        // Compress the image while preserving the aspect ratio
                        const compressedImage = await imageCompression(image, {
                            maxWidth,
                            maxHeight,
                            useWebWorker: true,
                        });

                        // Convert the compressed image to a data URL
                        const dataURL = compressedImage.toDataURL('image/jpeg');

                        // Replace the original image with the compressed image in the editor
                        quill.updateContents([
                            { retain: range.index },
                            { delete: range.length },
                            { insert: { image: dataURL } },
                        ]);
                    };
                }
            });
        }
    }
});



const TextEditor = () => {



    return (
        <div id="#editor" className="rounded-lg" style={{ background: 'var(--text-editor-bg)' }}>

        </div>
    )
}

export default TextEditor
