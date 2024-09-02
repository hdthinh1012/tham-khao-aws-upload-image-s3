import express from "express";
import multer from "multer";

import { deleteImage, getAllImages, uploadImage } from '../controllers/imageController';

const router = express.Router();

// SET STORAGE
let storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 10 * 1024 * 1024
    }
});
// var exStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage })

router.get('/get-all', getAllImages);
router.post('/upload', upload.single('file'), uploadImage);
router.delete('/delete/:fileName', deleteImage);

export { router };