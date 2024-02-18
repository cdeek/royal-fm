import { useEffect, useRef, useState } from "react";
import { Headphones } from "react-feather";
import { io } from "socket.io-client";

const url = 'http://localhost:2220';
export default function LiveStream() {
 const socket = useRef(null);
 const [comments, setComments] = useState([]);
 const [message, setMessage] = useState('');
 const [status, setStatus] = useState('offline');
 const [canPlay, setCanPlay] = useState(false);
 
 
 useEffect(() => {
    socket.current = io(url);
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
   socket.current.emit('message', message);
   setMessage('');
  }
 }
 
 const handleStream = () => {
  const audioElement = new Audio();
  
  if (!canPlay) {
    try {
      const audioContext = new AudioContext();
      const mediaSource = new MediaSource();
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
    audioElement.pause();
    setCanPlay(false);
  }
};

  return (
    <>
      <p>status: you are currently {status}</p>
      <div className="flex flex-col items-center h-full">
        <h1 className="text-5xl font-bold">
          {!canPlay ? "Click to Listen" : "Listening..."}
        </h1>
        <button 
        onClick={handleStream} 
        className="rounded-full p-5 bg-transparent border-2 border-blue-300 focus:border-red-600 hover:bg-gray-700 transition-all" 
        >
          <Headphones size={50} />
        </button>
      </div>
      <br />
      <div className="overflow-y-scroll border-2 border-red-600 w-1/2 mx-2 h-[150px]">
        {
         comments.map((m, index) => (
          <p key={index}>{m}</p>
         ))
        }
      </div>
      <input onChange={(e)=> setMessage(e.target.value)} value={message} type="text" id="message-input" placeholder="Type your message" />
      <button onClick={sendMessage}>Send</button>
    </>
  )
}