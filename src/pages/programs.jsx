import {useEffect, useRef, useState} from 'react';
import { useHook }  from '../context/use_context';
import Header from "../components/header";
import { Music, Video } from 'react-feather';

export default function Programs() {
  const { audios, videos } = useHook();
  const [audioId, setAudioId] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
    };
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    };
  });
  const play = (e, type, id) => {
    e.preventDefault();
    if (type == 'audio') {
      setVideoId(null);
      setAudioId(id);
    } else {
      setAudioId(null);
      setVideoId(id);
    }
  };
 return(
  <main className="bg-[#252525] text-white">
   <Header />
   {(audios.length <= 0 && videos.length <= 0) ?
   <h1 className="text-2xl text-center mt-[300px] mx-auto">No Streams at The Moment</h1>
   : <>
    <div>
    {audioId &&
    <div className="bg-black h-[300px] overflow-hidden">
     <Music className="mx-auto my-4" size={200} />
      <audio ref={audioRef} className="w-[80%] mx-auto" controls autoPlay>
        <source src={`get/file-stream/${audioId}`}></source>
      </audio>
    </div>
    }
    {videoId &&
      <video ref={videoRef} className="bg-black w-full h-[300px]" controls autoPlay>
        <source src={`get/file-stream/${videoId}`} type="video/mp4"></source>
        Your browser does not support video
      </video>
    }
    </div>
    <div className="w-full p-4">
    <br />
    <hr />
    {audios.map((a, index) => (
      <>
      <span key={index} className="flex my-2 rounded-md items-center gap-4 p-2 w-full" onClick={(e) => play(e, 'audio', a)}>
        <Music size={60} />
        <p>{a.slice(0,-4)}</p>
      </span>
      <hr />
      </>
    ))}
    {videos.map((v, index) => (
      <>
      <span key={index} className="flex my-2 rounded-md items-center gap-4 p-2 w-full" onClick={(e) => play(e, 'video', v)}>
        <Video size={60} />
        <p>{v.slice(0,-4)}</p>
      </span>
      <hr />
      </>
    ))}
    </div>
   </>
   }
   <br />
  </main>
  )
}