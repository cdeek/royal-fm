import { Mic, MicOff, ArrowLeft } from "react-feather";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const url = 'http://localhost:2220';

export default function LiveBroadcast() {
  const socket = useRef(null);
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
    socket.current = io(url);
    
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

  const Icon = recording ? MicOff : Mic;
  const title = `${recording ? "Stop" : "Start"} recording`;

  const onClickMic = async () => {
   try {
     const constraints = { audio: { deviceId: { exact: selectedDeviceId } } };
     const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
 
     if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
       const recorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm; codecs=opus' });
       const chunks = [];
 
       recorder.ondataavailable = (event) => {
         if (event.data.size > 0) {
           socket.current.volatile.emit('staff-audio-stream', event.data);
           chunks.push(event.data);
         }
       };
       
       recorder.onstop = () => {
         const audioBlob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
         const audioURL = URL.createObjectURL(audioBlob);
         
       };
       
       recorder.start(3000);
       setRecording(true);
     } else {
       throw new Error('The preferred MIME type "audio/webm; codecs=opus" is not supported.');
       alert('The preferred MIME type "audio/webm; codecs=opus" is not supported.')
     }
   } catch (error) {
     console.error('Error initializing stream:', error);
     alert('Failed to initialize stream. Please check your microphone settings.');
   }
};


  return (
    <>
      <header className="flex text-white bg-gray-600 py-4 px-2 m-0 w-full">
         <ArrowLeft size={25} />
         <h1 className="text-xl mx-auto font-bold">Live Streamer</h1>
      </header>
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