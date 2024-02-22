import { useEffect, useRef, useState } from "react";
import { Headphones, Send } from "react-feather";
import { io } from "socket.io-client";
import Header from "../components/header"

const url = 'http://localhost:2220';
export default function LiveStream() {
 const socket = useRef(null);
 const [comments, setComments] = useState([]);
 const [message, setMessage] = useState('');
 const [status, setStatus] = useState('offline');
 const [canPlay, setCanPlay] = useState(false);
 
 
 useEffect(() => {
    if (socket.current === null) socket.current =  io(url);
    socket.current.on('connect', () => setStatus('online'));
    
    socket.current.on('message', data => {
     setComments((prev) => [...prev, data]);
    })

    socket.current.on('disconnect', () => setStatus('offline'));
    return () => {
      socket.current.off('message');
    };
  }, []);
 
 const sendMessage = () => {
  if (message) {
   socket.current.emit('message', `${socket.current.id}: ${message}`);
   setMessage('');
  }
 }
 
 const handleStream = () => {
  let mediaSource;
  let removing = false;
  const chunks = [];
  const audioElement = new Audio();
  
  if (!canPlay) {
    try {
      const audioContext = new AudioContext();
      
      mediaSource = new MediaSource();
      audioElement.src = URL.createObjectURL(mediaSource);
      
      if (MediaSource.isTypeSupported('audio/webm; codecs=opus')) {
        mediaSource.onsourceopen = () => {
          const sourceBuffer = mediaSource.addSourceBuffer('audio/webm; codecs=opus');
          sourceBuffer.mode = "sequence";

          socket.current.on("audio-stream", (data) => {
            sourceBuffer.appendBuffer(data);
          });

          sourceBuffer.onerror = (e) => {
            console.error('Error appending buffer:', e);
            alert('Failed to play audio stream.');
          };
        }
      } else {
        throw new Error('The preferred MIME type is not supported.');
      }
      document.body.appendChild(audioElement);
      audioElement.play();
      setCanPlay(true);
    } catch (err) {
      console.error('Error initializing playback:', err);
      alert('Failed to initialize audio playback.');
    }
  } else {
    mediaSource = null;
    audioElement.pause();
    setCanPlay(false);
  }
  return () => socket.current.off("audio-stream");
 };

  return (
    <>
    <Header />
    <h1 className="text-xl mx-auto font-bold">- Royal Fm Live Streaming</h1>
    <div className="bg-[#3a3d40] text-white p-2">
      <p>status: you are currently {status}</p>
      <div className="mt-20 flex flex-col items-center h-full">
        <h1 className="text-5xl font-bold">
          {!canPlay ? "Click to Listen" : "Listening..."}
        </h1>
        <button 
        onClick={handleStream} 
        className="mt-8 rounded-full p-5 bg-transparent border-2 border-blue-300 focus:border-red-600 hover:bg-gray-700 transition-all" 
        >
          <Headphones size={50} />
        </button>
      </div>
      <br />
      <fieldset className="overflow-y-scroll border-2 bg-black w-full p-2 rounded-md h-[200px]">
       <legend className="text-red-300">- Comments -</legend>
        {
         comments.map((m, index) => (
          <p key={index}>{m}</p>
         ))
        }
      </fieldset>
      <div className="my-4 flex text-gray-600 align-items-center w-full">
        <textarea className="p-2 outline-none rounded-l-md w-[85%]" onChange={(e)=> setMessage(e.target.value)} value={message} type="text" id="message-input" placeholder="Send a Comment..." />
        <button className="bg-blue-500 text-white rounded-r-md p-2 w-[15%]" onClick={sendMessage}>
         <Send size={25} />
        </button>
      </div>
     </div>
    </>
  )
}