import React from 'react'
import './style.css'

interface Props {
  onClick: VoidFunction
  active: boolean
  data: {
    chat_id: number,
    title: string,
    avatar: string
  }
}

export default ({ data, onClick, active }: Props) => {
  return (
    <div className={`list ${active ? 'active' : ''}`}
      onClick={onClick}>
      <img src={data.avatar} alt="avatar" />
      <div className="list-tile">
        <div className="subject">
          <span className="name" >{data.title}</span>
          <span className="date" >19:00</span>
        </div>
        <div className="subject">
          <div className="last-message">
            <p>Ola mundo!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
