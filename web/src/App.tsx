import React, { useState, useEffect } from 'react'

import './App.css'

import ChatListItem from './components/ChatListItem/'
import ChatIntro from './components/ChatIntro'
import ChatWindow from './components/ChatWindow'

import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'

export default () => {

  const [chatlist, setChatList] = useState([
    { chat_id: 1, title: 'Maxmiller Nunes', avatar: 'https://avatars0.githubusercontent.com/u/40812823?s=400&u=ac578d21272f3840fdb5d29b80c2b92d58b1426a&v=4' },
    { chat_id: 2, title: 'Manoel Carvalho', avatar: 'https://avatars3.githubusercontent.com/u/23405557?s=400&u=ddc1a067e07d8a9ef254feafbb050b993a39f8b3&v=4' },
    { chat_id: 3, title: 'Carlos Cenci', avatar: 'https://avatars2.githubusercontent.com/u/61289109?s=400&u=5341aaa881134dc973ba04a5f9588f4a92e718da&v=4' },
  ])
  const [activeChat, setActiveChat] = useState({ chat_id: 0 })
  const [user, setUser] = useState({
    id: 1,
    name: 'Josimar Martins',
    avatar: 'https://avatars3.githubusercontent.com/u/49077388?s=400&u=551a7010f9fc91859229f0d600481a2b2ca118a6&v=4'
  })

  return (
    <div className="container">
      <div className="sidebar">
        <header>
          <img src={user.avatar} alt="avatar" />
          <ul>
            <li><DonutLargeIcon style={{ color: '#919191' }} /></li>
            <li><ChatIcon style={{ color: '#919191' }} /></li>
            <li><MoreVertIcon style={{ color: '#919191' }} /></li>
          </ul>
        </header>
        <div className="search">
          <div className="search-input">
            <SearchIcon fontSize="small" style={{ color: '#919191' }} />
            <input type="search" placeholder="Procurar ou começar uma nova conversa" />
          </div>
        </div>
        <div className="chat-list">
          {chatlist.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chat_id === chatlist[key].chat_id}
              onClick={() => setActiveChat(chatlist[key])}
            />
          ))}
        </div>
      </div>
      <div className="content">
        {activeChat.chat_id !== 0 && <ChatWindow user={user} />}
        {activeChat.chat_id === 0 && <ChatIntro />}
      </div>
    </div>
  );
}