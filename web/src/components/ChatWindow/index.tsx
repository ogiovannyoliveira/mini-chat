import React, { useState, useEffect, useRef, MutableRefObject } from 'react'
import EmojiPicker from 'emoji-picker-react'

import './style.css'
import MessageItem from '../MessageItem'

import SearchIcon from '@material-ui/icons/Search'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import CloseIcon from '@material-ui/icons/Close'
import SendIcon from '@material-ui/icons/Send'
import MicIcon from '@material-ui/icons/Mic'

interface Props {
  user: {
    id: number
    name: string
    avatar: string
  }
}

export default ({ user }: Props) => {

  const body: MutableRefObject<any> = useRef()

  let recognition: SpeechRecognition | null = null
  let SpeechRecognition = window.SpeechRecognition
  // let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (SpeechRecognition !== undefined) recognition = new SpeechRecognition()

  const [emojiOpen, setEmojiOpen] = useState(false)
  const [text, setText] = useState('')
  const [listening, setListening] = useState(false)
  const [list, setList] = useState([
    { remetente_id: 1, body: 'Ola Maria, como vai?', date: '18:01' },
    { remetente_id: 2, body: 'Oi Josimar, tudo bem e com vc?', date: '18:03' },
    { remetente_id: 1, body: 'Vou ótimo, que bom te ver!', date: '18:06' },
    { remetente_id: 1, body: 'Faz tempo que não te vejo...', date: '18:06' },
    { remetente_id: 1, body: 'Ola Maria, como vai?', date: '18:01' },
    { remetente_id: 2, body: 'Oi Josimar, tudo bem e com vc?', date: '18:03' },
    { remetente_id: 1, body: 'Vou ótimo, que bom te ver!', date: '18:06' },
    { remetente_id: 1, body: 'Faz tempo que não te vejo...', date: '18:06' },
    { remetente_id: 1, body: 'Ola Maria, como vai?', date: '18:01' },
    { remetente_id: 2, body: 'Oi Josimar, tudo bem e com vc?', date: '18:03' },
    { remetente_id: 1, body: 'Vou ótimo, que bom te ver!', date: '18:06' },
    { remetente_id: 1, body: 'Faz tempo que não te vejo...', date: '18:06' },
    { remetente_id: 1, body: 'Ola Maria, como vai?', date: '18:01' },
    { remetente_id: 2, body: 'Oi Josimar, tudo bem e com vc?', date: '18:03' },
    { remetente_id: 1, body: 'Vou ótimo, que bom te ver!', date: '18:06' },
    { remetente_id: 1, body: 'Faz tempo que não te vejo...', date: '18:06' },
    { remetente_id: 1, body: 'Ola Maria, como vai?', date: '18:01' },
    { remetente_id: 2, body: 'Oi Josimar, tudo bem e com vc?', date: '18:03' },
    { remetente_id: 1, body: 'Vou ótimo, que bom te ver!', date: '18:06' },
    { remetente_id: 1, body: 'Faz tempo que não te vejo...', date: '18:06' },
    { remetente_id: 1, body: 'Ola Maria, como vai?', date: '18:01' },
    { remetente_id: 2, body: 'Oi Josimar, tudo bem e com vc?', date: '18:03' },
    { remetente_id: 1, body: 'Vou ótimo, que bom te ver!', date: '18:06' },
    { remetente_id: 1, body: 'Faz tempo que não te vejo...', date: '18:06' },
  ])

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
    }
  }, [list])

  const handleEmojiClick = (e: Event, emojiObject: { emoji: string }) => {
    setText(text + emojiObject.emoji)
  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true)

  }

  const handleCloseEmoji = () => {
    setEmojiOpen(false)
  }

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript)
      }

      recognition.start()
    }
  }

  const handleSendClick = () => { }

  return (
    <div className="chat-window">
      <div className="header">
        <div className="header-info">
          <img src="https://avatars2.githubusercontent.com/u/61289109?s=400&u=5341aaa881134dc973ba04a5f9588f4a92e718da&v=4" alt="avatar" />
          <span>Carlos Cenci</span>
        </div>
        <div className="header-actions">
          <ul>
            <li><SearchIcon style={{ color: '#919191' }} /></li>
            <li><AttachFileIcon style={{ color: '#919191' }} /></li>
            <li><MoreVertIcon style={{ color: '#919191' }} /></li>
          </ul>
        </div>
      </div>
      <div
        ref={body}
        className="content"
      >
        {
          list.map((item, key) => (
            <MessageItem
              key={key}
              data={item}
              user={user}
            />
          ))
        }
      </div>
      <div className="emoji-area" style={{ height: emojiOpen ? '250px' : '0px' }}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>
      <div className="footer">
        <div className="list-emoji">
          <div className="emoji" onClick={handleCloseEmoji} style={{ width: emojiOpen ? 40 : 0 }}>
            <CloseIcon style={{ color: '#919191' }} />
          </div>
          <div className="emoji" onClick={handleOpenEmoji}>
            <InsertEmoticonIcon style={{ color: emojiOpen ? '#009688' : '#919191' }} />
          </div>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className="action">
          {text === '' &&
            <div className="button" onClick={handleMicClick}>
              <MicIcon style={{ color: listening ? '#126ECE' : '#919191' }} />
            </div>
          }
          {text !== '' &&
            <div className="button" onClick={handleSendClick}>
              <SendIcon style={{ color: '#919191' }} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}