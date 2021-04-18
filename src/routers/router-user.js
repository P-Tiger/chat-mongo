import bcrypt from 'bcrypt';
import express from 'express';
import {
    cfg
} from '../config';
import {
    verify_user_token
} from '../middlewares/jwt-verify';
import {
    validatorsPostUser
} from '../validators/validators-user'
import {
    User
} from '../models';
import { renderErr } from './helper';

const router = express.Router();


router.get('/v1/users', verify_user_token, async (req, res, next) => {
    let data = await User.getList({}, {});
    return res.status(200).send(data);
});

router.post('/v1/users', validatorsPostUser, async (req, res, next) => {
    let {
        email,
        password,
        name,
    } = req.body;
    let dataInsert = {
        password: bcrypt.hashSync(password, cfg("BCRYPT_SALT_ROUNDS", parseInt)),
        email: email,
        name: name,
        token_info: ""
    }
    if (email) {
        let checkData = await User.findOne({
            email: email
        }).exec()
        if (checkData) {
            return renderErr("User Create", res, 409, "email");
        }
    }
    let data = null
    try {
        data = await User.create(dataInsert);
    } catch (error) {
        console.log(error);
        return renderErr("User Create", res, 500, "User Create");
    }
    data = await User.findById(data.id).exec();
    return res.status(200).send(data)
});
export default router;