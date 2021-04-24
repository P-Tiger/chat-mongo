import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from "socket.io-client";
import { after } from '../../store/features/chat';
import './chat.css';
import Input from './Input';
import Message from './MessageList';
import TopMenu from './TopMenu';

let socket = null
export const ChatComponent = ({ chatReducer }) => {
    let user = JSON.parse(localStorage.getItem("_Auth"));
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    useEffect(() => {
        let server = process.env.REACT_APP_SOCKET;
        socket = io.connect(server)
        socket.on('Output Chat Message', data => {
            let objMessage = $('.messages');
            if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight) {
                objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); // Scroll when have new message 
            } else {
                objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
            }
            dispatch(after(data))
        })
        return () => {
            socket.emit('User is disconnect');
            socket.off();
        };
    }, [dispatch])
    const sendMessage = event => {
        event.preventDefault();
        if (message && user) {
            socket.emit('Input Chat Message', {
                chatMessage: message,
                userId: user.id,
                type: "message"
            });
            setMessage('')
        }
    };
    return (
        <React.Fragment>
            <div className='appChat'>
                <div className='row'>
                    <div className='col'>
                        <div className='chat_window'>
                            <TopMenu room={"Real Time Chat"} />
                            <Message messages={chatReducer} />
                        </div>
                        <Input
                            message={message}
                            setMessage={setMessage}
                            sendMessage={sendMessage}
                            socket={socket}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
