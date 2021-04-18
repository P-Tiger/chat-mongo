import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import {
    cfg
} from '../config';
import {
    verify_user_token
} from '../middlewares/jwt-verify';
import {
    User
} from '../models';
import {
    readFileAsync
} from '../services/file';
import {
    validatorsPostAuth
} from '../validators/validators-auth';
import {
    renderErr
} from './helper';

const router = express.Router();
router.post('/v1/login', validatorsPostAuth, async (req, res, next) => {
    let {
        email,
        password
    } = req.body;
    let user = await User.findOne({
        email: email
    });
    let a = false;
    try {
        a = bcrypt.compareSync(password, user.password);
    } catch {
        return renderErr("Login", res, 403, "Incorrect username or password");
    }
    if (a) {
        let data = {
            id: user.id,
            name: user.name || "",
        };
        const cert = await readFileAsync(cfg('JWT_PRIVATE_KEY', String));
        const token = jwt.sign(data, cert, {
            algorithm: 'ES256'
        });
        try {
            await User.findByIdAndUpdate(user.id, {
                token_info: token
            }, {})
        } catch (e) {
            return renderErr("Login", res, 500, "Update token");
        }
        res.status(200).send(Object.assign({
            token
        }, data));
    } else {
        return renderErr("Login", res, 403, "Incorrect username or password");
    }
    await next();
});

router.put('/v1/logout', verify_user_token, async (req, res, next) => {
    let user = res.state.user
    let data = await User.findById(user.id);
    if (!data) {
        return renderErr("Logout", res, 404, "user")
    }
    try {
        await User.findByIdAndUpdate(user.id, {
            token_info: ""
        });
    } catch (error) {
        return renderErr("Logout", res, 500, "Update User")
    }
    return res.status(200).send("Logout Successfully!")
});
export default router;