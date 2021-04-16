import jwt from 'jsonwebtoken';
import {
	cfg
} from '../config';
import {
	readFileAsync
} from '../services/file';
import {
	renderErr
} from '../routers/helper';
import {
	User,
	Member
} from '../models'
async function verify_user_token(ctx, next) {
	let tokenInQuery = ctx.request.query.token;
	if (ctx.header && !ctx.header.authorization) {
		ctx.header.authorization = ""
	}
	let parts = null;
	if (tokenInQuery) {
		parts = ['Bearer', tokenInQuery];
	} else {
		parts = ctx.request.header.authorization.split(' ');
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
				return renderErr("VerifyUserToken", ctx, 401, "Authentication")
			}
			let user = await User.findOne({
				where: {
					id: tokenCheck.id
				}
			});
			let token_info = user ? user.token_info : {};
			let token = token_info.token || "-";
			if (credentials != token) {
				return renderErr("VerifyUserToken", ctx, 401, "Authentication")
			}
			if (!token) {
				return renderErr("VerifyUserToken", ctx, 401, "token")
			}
			ctx.state = {
				user: tokenCheck
			};
		} else {
			return renderErr("VerifyUserToken", ctx, 401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
		}
	} else {
		return renderErr("VerifyUserToken", ctx, 401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
	}
	await next();
}

async function verify_member_token(ctx, next) {
	let tokenInQuery = ctx.request.query.token;
	if (ctx.header && !ctx.header.authorization) {
		ctx.header.authorization = ""
	}
	let parts = null;
	if (tokenInQuery) {
		parts = ['Bearer', tokenInQuery];
	} else {
		parts = ctx.request.header.authorization.split(' ');
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
				return renderErr("VerifyUserToken", ctx, 401, "Authentication")
			}
			let member = await Member.findOne({
				where: {
					id: tokenCheck.id
				}
			});
			let token_info = member ? member.token_info : {};
			let token = token_info.token || "-";
			if (credentials != token) {
				return renderErr("VerifyUserToken", ctx, 401, "Authentication")
			}
			if (!token) {
				return renderErr("VerifyUserToken", ctx, 401, "token")
			}
			ctx.state = {
				member: tokenCheck
			};
		} else {
			return renderErr("VerifyUserToken", ctx, 401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
		}
	} else {
		return renderErr("VerifyUserToken", ctx, 401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
	}
	await next();
}


export {
	verify_user_token,
	verify_member_token
};