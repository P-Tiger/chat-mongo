import React, { useEffect } from 'react';
import './MessageItem.css';
import $ from 'jquery';
import _ from 'lodash'
import { ReactVideo } from "reactjs-media";
import moment from 'moment'


export default function MessageItem({ message }) {
  let user = JSON.parse(localStorage.getItem("_Auth"));
  useEffect(() => {
    let objMessage = $('.messages');
    objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') + 100000 }, 10);
  }, [])

  const renderData = (message) => {
    let messageClone = _.cloneDeep(message)
    let isUploadFile = messageClone.includes("src/uploads/")
    if (isUploadFile) {
      let dataSplit = messageClone.split('.');
      if (
        dataSplit[dataSplit.length - 1].toLowerCase() === 'mp4' ||
        dataSplit[dataSplit.length - 1].toLowerCase() === 'avi' ||
        dataSplit[dataSplit.length - 1].toLowerCase() === 'mov' ||
        dataSplit[dataSplit.length - 1].toLowerCase() === 'flv' ||
        dataSplit[dataSplit.length - 1].toLowerCase() === 'wmv') {
        return (<ReactVideo
          src={`${process.env.REACT_APP_API_URL}/${messageClone}`}
          primaryColor="red"
          autoPlay={false}
        />)
      } else {
        return (<img
          style={{ maxWidth: '200px' }}
          src={`${process.env.REACT_APP_API_URL}/${messageClone}`}
          alt="img"
        />)
      }
    }
    return messageClone;
  }

  return (
    message && message.sender && message.sender._id && user && user.id ? (
      <li
        className={
          user.id === message.sender._id
            ? 'message right appeared' :
            'message left appeared'
        }
      >
        <div className='avatar' />
        <div className='text_wrapper'>
          <div className='user'> {message.sender.name} ({moment(message.createdAt).format('HH:mm:ss DD-MM-YYYY')})</div>
          <div className='text'>{
            renderData(message.message)
          }</div>
        </div>
      </li >) : null
  );
}
