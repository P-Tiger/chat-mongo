import express from 'express'

const router = express.Router();
router.get('/v1/login', (req, res, next) => {
    return res.send("heelo")
})
// router.post('/v1/login', validatorPostLogin, async (ctx, next) => {
//     let {
//         user_name,
//         password
//     } = ctx.request.body;
//     let user = await User.findOne({
//         where: {
//             user_name: user_name
//         },
//     });
//     if (user && user.status != User.STATUS_ACTIVE) {
//         return renderErr("Login", ctx, 403, "status");
//     }
//     let a = false;
//     try {
//         a = bcrypt.compareSync(password, user.password);
//     } catch {
//         return renderErr("Login", ctx, 403, "Incorrect username or password");
//     }
//     if (a) {
//         let data = {
//             id: user.id,
//             name: user.name || "",
//         };
//         const cert = await readFileAsync(cfg('JWT_PRIVATE_KEY', String));
//         const token = jwt.sign(data, cert, {
//             algorithm: 'ES256'
//         });
//         let token_info = user.token_info || {};
//         token_info.token = token
//         try {
//             await user.update({
//                 token_info: token_info
//             }, {
//                 timestamps: false
//             })
//         } catch (e) {
//             return renderErr("Login", ctx, 500, "Update token");
//         }
//         ctx.body = Object.assign({
//             token
//         }, data);
//     } else {
//         return renderErr("Login", ctx, 403, "Incorrect username or password");
//     }
//     await next();
// });

// router.put('/v1/logout', verify_user_token, async (ctx, next) => {
//     let data = await User.findOne({
//         where: {
//             id: ctx.state.user.id,
//         }
//     });
//     if (!data) {
//         return renderErr("Logout", ctx, 404, "token")
//     }
//     let dataUpdate = {};
//     let token_info = data.token_info || {};
//     token_info.token = "";
//     dataUpdate.token_info = token_info;
//     try {
//         await data.update(dataUpdate, {
//             timestamps: false
//         });
//     } catch (error) {
//         return renderErr("Logout", ctx, 500)
//     }
//     ctx.body = "Logout Successfully!"
// });

// router.post('/v1/member/login', validatorPostLogin, async (ctx, next) => {
//     let {
//         user_name,
//         password
//     } = ctx.request.body;
//     let member = await Member.findOne({
//         where: {
//             user_name: user_name
//         },
//     });
//     if (member && member.status != Member.STATUS_ACTIVE) {
//         return renderErr("Login", ctx, 403, "status");
//     }
//     let a = false;
//     try {
//         a = bcrypt.compareSync(password, member.password);
//     } catch {
//         return renderErr("Login", ctx, 403, "Incorrect username or password");
//     }
//     if (a) {
//         let data = {
//             id: member.id,
//             name: member.name || "",
//             department_id: member.department_id
//         };
//         const cert = await readFileAsync(cfg('JWT_PRIVATE_KEY', String));
//         const token = jwt.sign(data, cert, {
//             algorithm: 'ES256'
//         });
//         let token_info = member.token_info || {};
//         token_info.token = token
//         try {
//             await member.update({
//                 token_info: token_info
//             }, {
//                 timestamps: false
//             })
//         } catch (e) {
//             return renderErr("Login", ctx, 500, "Update token");
//         }
//         ctx.body = Object.assign({
//             token
//         }, data);
//     } else {
//         return renderErr("Login", ctx, 403, "Incorrect username or password");
//     }
//     await next();
// });

// router.put('/v1/member/logout', verify_member_token, async (ctx, next) => {
//     let data = await Member.findOne({
//         where: {
//             id: ctx.state.member.id,
//         }
//     });
//     if (!data) {
//         return renderErr("Logout", ctx, 404, "token")
//     }
//     let dataUpdate = {};
//     let token_info = data.token_info || {};
//     token_info.token = "";
//     dataUpdate.token_info = token_info;
//     try {
//         await data.update(dataUpdate, {
//             timestamps: false
//         });
//     } catch (error) {
//         return renderErr("Logout", ctx, 500)
//     }
//     ctx.body = "Logout Successfully!"
// });

export default router;