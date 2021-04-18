import bodyParser from 'body-parser';
import express from 'express';
import {
    createServer
} from "http";
import path from 'path';
import {
    Server
} from "socket.io";
import {
    cfg
} from './config';
import routeLog from './middlewares/route-log';
import whiteListOrigin from './middlewares/white-list-origin';
import {
    Chat
} from './models';
import routers from './routers';
import {
    renderErr
} from './routers/helper';
const app = express();
app
    .use(whiteListOrigin)
    .use(routeLog)
    .use('/v1/src/uploads', express.static(path.join(__dirname, 'uploads')))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(routers)
// Socket

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true,
    },
    allowEIO3: true
}).listen(cfg('SOCKET_PORT', parseInt));

io.on("connection", (socket) => {
    console.log("conection");
    socket.on("Input Chat Message", async msg => {
        let {
            chatMessage,
            userId,
            type
        } = msg
        let data = null
        try {
            data = await Chat.create({
                message: chatMessage,
                sender: userId,
                type: type
            })
        } catch (error) {
            return renderErr("Chat Create", res, 500, "Create Chat")
        }
        data = await Chat.findById(data.id).populate("sender", { token_info: 0, password: 0 });
        return io.emit("Output Chat Message", data);
    })

    socket.on('User is disconnect', (data) => {
        console.log('disconect: ', socket.rooms);
    });
})

app.listen(cfg('APP_PORT', parseInt), cfg('APP_HOST', String));
console.info(`API Server started at http://%s:%d`, cfg('APP_HOST', String), cfg('APP_PORT', parseInt));

