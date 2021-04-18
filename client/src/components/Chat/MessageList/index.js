import React from 'react';
import MessageItem from './MessageItem';
import './MessageList.css'

export default function MessageList({ messages }) {
    return (
        <ul className='messages'>
            {messages.map((message, i) => (
                <MessageItem key={i} message={message} />
            ))}
        </ul>
    );
}
