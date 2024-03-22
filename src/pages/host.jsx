import { Mic, MicOff } from "react-feather";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Header from "../components/staff_header";

const url = 'http://localhost:2220';

export default function LiveBroadcast() {
  const socket = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [recording, setRecording] = useState(false);
  const [inputDevices, setInputDevices] = useState([]);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState('offline');
  const [clientsOnline, setClientsOnline] = useState(0);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
        setInputDevices(audioInputDevices);
      } catch (error) {
        console.error('Error enumerating devices:', error);
        alert('Error enumerating devices');
      }
    };

    getDevices();
  }, []);

  useEffect(() => {
    if (socket.current === null) socket.current =  io(url);
    
    socket.current.on('connect', () => setStatus(`online`));
    
    socket.current.on('message', data => {
     setComments((prev) => [...prev, data]);
    })
    
    socket.current.on('new-client', data => {
     setClientsOnline(data - 1);
    })
    
    socket.current.on('offline', data => {
     alert(data);
    })
    
    socket.current.on('disconnect', () => setStatus('offline'));
    
    return () => {
      socket.current.off('message');
      socket.current.off('new-client');
      socket.current.off('offline');
    };
  }, []);

  const Icon = streaming ? MicOff : Mic;
  const title = `${streaming ? "Stop" : "Start"} Live Stream`;
  const chunks = [];

  const onClickMic = async () => {
   let mediaStream;
   let recorder;
   
   if (!streaming) {
    try {
      const constraints = { audio: { deviceId: { exact: selectedDeviceId } } };
      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
  
      if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
        recorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm; codecs=opus' });
  
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            socket.current.volatile.emit('staff-audio-stream', event.data);
            if (recording) chunks.push(event.data);
          }
        };
        
        recorder.onstop = () => {
          // const audioBlob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
          // const audioURL = URL.createObjectURL(audioBlob);
          if (chunks.length > 5) {
            const filename = prompt('name the file');
          }
        };
        
        recorder.start(3000);
        setStreaming(true);
      } else {
        throw new Error('The preferred MIME type "audio/webm; codecs=opus" is not supported.');
        alert('The preferred MIME type "audio/webm; codecs=opus" is not supported.')
      }
    } catch (error) {
      console.error('Error initializing stream:', error);
      alert('Failed to initialize stream. Please check your microphone settings.');
    }
   } else {
    //recorder.stop();
    mediaStream = null;
    setStreaming(false);
   }
   
  return () => socket.current.off('staff-audio-stream');
};
 
 const resumePause = () => {
  if (recording) setRecording(false);
  if (!recording) setRecording(true);
 }

  return (
    <>
      <Header />
      <h1 className="text-xl mx-auto font-bold">- Diksa Fm Live Streamer</h1>
      <div className="bg-[#3a3d40] text-white p-2">
        <p>Status: You are currently {status}</p><br />
        <label htmlFor="selectInputDevice">Select Input Device:</label>
        <select className="w-[200px] p-2 rounded-md float-right bg-gray-400" id="selectInputDevice" onChange={(e) => setSelectedDeviceId(e.target.value)}>
          <option value="">Select Device</option>
          {inputDevices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Microphone ${device.deviceId}`}
            </option>
          ))}
        </select>
      <div className="mt-20 flex flex-col items-center w-full">
        <button
          type="button"
          title={title}
          onClick={onClickMic}
          className="rounded-full p-5 bg-transparent border-2 border-blue-300 focus:border-red-600 hover:bg-gray-700"
        >
          <Icon size={64} className="color-white" />
        </button>
        <p>{title}</p>
      </div>
      <br />
      <h3>Listners online: {clientsOnline}</h3>
      <br />
      <fieldset className="overflow-y-scroll border-2 bg-black w-full p-2 rounded-md h-[300px]">
       <legend className="text-red-300">- Comments -</legend>
        {
         comments.map((m, index) => (
          <p key={index}>{m}</p>
         ))
        }
      </fieldset>
      </div>
    </>
  );
}