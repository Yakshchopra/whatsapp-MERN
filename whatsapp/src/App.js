import React from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import {useState,useEffect} from 'react';
import axios from './axios';

// whatsapp-mern-af159

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  },[]);

  useEffect(()=>{
    var pusher = new Pusher('e6e1ff65d6070144e2cd', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=>  {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return() => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages])

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>      
    </div>
  );
}

export default App;
