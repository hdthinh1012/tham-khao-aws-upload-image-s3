"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const imageController_1 = require("../controllers/imageController");
const router = express_1.default.Router();
exports.router = router;
// SET STORAGE
let storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
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
router.get('/get-all', imageController_1.getAllImages);
router.post('/upload', upload.single('file'), imageController_1.uploadImage);
router.delete('/delete/:fileName', imageController_1.deleteImage);
