// export default function resizeImage(file, maxWidth, maxHeight, callback) {
//     const img = new Image();
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     img.onload = () => {
//         let width = img.width;
//         let height = img.height;

//         if (width > height) {
//             if (width > maxWidth) {
//                 height *= maxWidth / width;
//                 width = maxWidth;
//             }
//         } else {
//             if (height > maxHeight) {
//                 width *= maxHeight / height;
//                 height = maxHeight;
//             }
//         }

//         canvas.width = width;
//         canvas.height = height;

//         ctx.drawImage(img, 0, 0, width, height);

//         // Convert the canvas image back to a data URL
//         const resizedDataURL = canvas.toDataURL(file.type);

//         callback(resizedDataURL);
//     };

//     img.src = URL.createObjectURL(file);
// }
