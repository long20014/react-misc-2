import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import './ChatPage.scss';

const host = 'http://localhost:3001';

type MessagePackage = {
  msg: string;
  id: string;
};

const ChatPage = () => {
  const [socketIO, setSocketIO] = useState<any>();
  const [msgPackage, setMsgPackage] = useState<MessagePackage>();
  const [msgPackages, setMsgPackages] = useState<MessagePackage[]>([]);
  const [currentId, setCurrentId] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const socket = io(host);
    setSocketIO(socket);

    socket.on('connect', () => {
      if (!currentId) {
        setCurrentId(socket.id);
        console.log(currentId); // x8WIv7-mJelg7on_ALbx
      }
    });

    socket.on('disconnect', () => {
      if (currentId) {
        setCurrentId(socket.id);
        console.log(currentId); // undefined
      }
    });

    socket.on('chat message', (msgPackage: MessagePackage) => {
      setMsgPackage(msgPackage);
      // window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (msgPackage) {
      const newPackages = [...msgPackages, msgPackage];
      setMsgPackages(newPackages);
    }
  }, [msgPackage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      socketIO.emit('chat message', { id: currentId, msg: inputRef.current?.value });
      inputRef.current.value = '';
    }
  };

  return (
    <>
      {' '}
      <ul id="messages">
        {msgPackages.map((msgPackage, index) => {
          const { id, msg } = msgPackage;
          return <li key={`msg-${index}`}>{`Id<${id}>: ${msg}`}</li>;
        })}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input ref={inputRef} id="input" autoComplete="off" />
        <button>Send</button>
      </form>
    </>
  );
};

export default ChatPage;
