import moment from 'moment';
import multer from 'multer';
// Socket
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${moment().format('x')}_${file.originalname}`)
    }
})

let upload = multer({ storage: storage }).single("file")

export {
    upload
};
