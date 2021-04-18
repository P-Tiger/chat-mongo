import express from 'express';
import {
    verify_user_token
} from '../middlewares/jwt-verify';
import {
    upload
} from '../controllers/controller-multers'
import { renderErr } from './helper';

const router = express.Router();


router.post('/v1/uploads', verify_user_token, async (req, res, next) => {
    upload(req, res, err => {
        if (err) {
            return renderErr("Upload File", res, 500, "File Update")
        }
        return res.status(200).send({
            message: "Upload File Successfuly!!!",
            url: res.req.file.path
        })
    })
});
export default router;