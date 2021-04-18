import jwt from 'jsonwebtoken';
import {
	cfg
} from '../config';
import {
	User
} from '../models';
import {
	renderErr
} from '../routers/helper';
import {
	readFileAsync
} from '../services/file';
async function verify_user_token(req, res, next) {
	let tokenInQuery = req.query.token
	if (req.headers && !req.headers.authorization) {
		req.headers.authorization = ""
	}
	let parts = null;
	if (tokenInQuery) {
		parts = ['Bearer', tokenInQuery];
	} else {
		parts = req.headers.authorization.split(' ');
	}

	if (parts.length === 2) {
		const scheme = parts[0];
		const credentials = parts[1];
		if (/^Bearer$/i.test(scheme)) {
			const pubCert = await readFileAsync(cfg('JWT_PUBLIC_KEY'), String);
			let tokenCheck = null;
			try {
				const trustedData = jwt.verify(credentials, pubCert, {
					algorithm: 'ES256'
				});
				tokenCheck = trustedData
			} catch (err) {
				console.log("Err", err)
				return renderErr("VerifyUserToken", res, 401, "Authentication")
			}
			let user = await User.findById(tokenCheck.id);
			let token = user ? user.token_info : "";
			if (credentials != token) {
				return renderErr("VerifyUserToken", res, 401, "Authentication")
			}
			if (!token) {
				return renderErr("VerifyUserToken", res, 401, "token")
			}
			res.state = {
				user: tokenCheck
			};
		} else {
			return renderErr("VerifyUserToken", res, 401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
		}
	} else {
		return renderErr("VerifyUserToken", res, 401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
	}
	await next();
}
export {
	verify_user_token,
};
