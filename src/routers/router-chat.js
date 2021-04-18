import express from 'express';
import {
    verify_user_token
} from '../middlewares/jwt-verify';
import {
    Chat
} from '../models';

const router = express.Router();


router.get('/v1/chats', verify_user_token, async (req, res, next) => {
    let data = await Chat.getList({}, {});
    return res.status(200).send(data);
});

export default router;