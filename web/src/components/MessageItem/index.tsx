import React from 'react'
import './style.css'

interface Props {
  data: {
    remetente_id: number
    body: string
    date: string
  },
  user: {
    id: number
    name: string
    avatar: string
  }
}

export default ({ data, user }: Props) => {
  return (
    <div
      className="message-line"
      style={{ justifyContent: user.id === data.remetente_id ? 'flex-end' : 'flex-start' }}
    >
      <div
        className="message-item"
        style={{ backgroundColor: user.id === data.remetente_id ? '#DCF8C6' : '#FFF' }}
      >
        <div className="message-text">{data.body}</div>
        <div className="message-date">{data.date}</div>
      </div>
    </div>
  );
}