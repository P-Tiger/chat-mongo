import React from 'react';
import {
  NavbarComponent,
  ChatComponent
} from '../../components';
import './styles.css';
import { request } from '../../store/features/chat';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export const Home = () => {
  const dispatch = useDispatch()
  const chatReducer = useSelector(state => state.chatReducer)
  useEffect(() => {
    dispatch(request())
  }, [dispatch])
  return (
    <div className='home-container'>
      <NavbarComponent />
      <div className="container mt-3 mb-3">
        {
          chatReducer && chatReducer.chatData && chatReducer.chatData.length >= 0 ?
            (<ChatComponent chatReducer={chatReducer.chatData} />)
            :
            null
        }
      </div>
    </div>
  )
};
