import express from "express";
import multer from "multer";

import {
    getAllImages,
} from '../controllers/imageController';

const router = express.Router();

router.get('/get-all', getAllImages);

export { router };