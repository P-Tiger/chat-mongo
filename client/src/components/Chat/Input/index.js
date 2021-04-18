import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { request } from '../../../store/features/upload';
import './Input.css';

export default function Input({ message, setMessage, sendMessage, socket, user }) {
  const dispatch = useDispatch()
  const uploadReducer = useSelector(state => state.uploadReducer)

  useEffect(() => {
    if (uploadReducer && uploadReducer.uploadData && uploadReducer.uploadData.url) {
      let chatMessage = uploadReducer.uploadData.url;
      let userId = user.id
      let type = "VideoOrImage"
      socket.emit("Input Chat Message", {
        chatMessage,
        userId,
        type
      });
    }
  }, [uploadReducer, socket, user.id])

  const handlerFileOnChange = (e) => {
    const formData = new FormData();
    let files = e.target.files[0]
    if (files) {
      let dataSplit = files.name.split('.');
      switch (dataSplit[dataSplit.length - 1].toLowerCase()) {
        case 'mp4':
          break;
        case 'avi':
          break;
        case 'mov':
          break;
        case 'flv':
          break;
        case 'wmv':
          break;
        case 'jpg':
          break;
        case 'jpeg':
          break;
        case 'png':
          break;
        default:
          Swal.fire(
            "Upload file",
            "You just can upload file video and image",
            "error"
          )
          return;
      }

      formData.append("file", files);
      dispatch(request(formData))
    }
  }

  return (
    <div className='bottom_wrapper'>
      <label className="custom-file-upload">
        <input type="file" onClick={e => e.target.value = null} onChange={handlerFileOnChange} />
        <div className='upload'>Upload</div>
      </label>
      <input id="file-upload" type="file" />
      <div className='message_input_wrapper'>
        <input
          className='message_input'
          type='text'
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === 'Enter' ? sendMessage(event) : null
          }
        />
      </div>
      <div className='send_message' onClick={event => sendMessage(event)}>
        <div className='icon' />
        <div className='text'>Send</div>
      </div>
    </div >
  );
}
