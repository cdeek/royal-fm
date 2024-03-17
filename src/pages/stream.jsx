import {useEffect, useRef, useState} from 'react';

export default function Stream() {
  const [audios, setAudios] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audioId, setAudioId] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  
  useEffect(() => {
    fetch('get/files')
     .then(res => res.json())
     .then(data => {
       setAudios(data.audio);
       setVideos(data.video);
     })
     .catch(err => console.error(err));
  }, []);
  
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
  <>
    <div>
    {audioId &&
    <div className="bg-black h-[250px] overflow-hidden">
     <img src="logo.png" className="w-[90%] h-[200px] mx-auto" alt="Audio" />
      <audio ref={audioRef} className="w-[90%] mx-auto" controls autoPlay>
        <source src={`get/audio-file-stream/${audioId}`}></source>
      </audio>
    </div>
    }
    {videoId &&
      <video ref={videoRef} className="w-full h-[300px]" controls autoPlay>
        <source src={`get/video-file-stream/${videoId}`} type="video/mp4"></source>
        Your browser does not support video
      </video>
    }
    </div>
    <div className="w-full p-4">
    <br />
    {audios.map((a, index) => (
      <span key={index} className="flex border-2 border-gray-700 my-2 rounded-md items-center gap-2 p-2 mx-auto w-[80%]" onClick={(e) => play(e, 'audio', a)}>
        <img src="logo.png" width={70} height={70} alt="audio" />
        <p>{a.slice(0,-4)}</p>
      </span>
    ))}
    {videos.map((v, index) => (
      <span key={index} className="flex border-2 my-2 rounded-md border-gray-700 items-center gap-2 p-2 mx-auto w-[80%]" onClick={(e) => play(e, 'video', v)}>
        <img src="logo.png" width={70} height={70} alt="video" />
        <p>{v.slice(0,-4)}</p>
      </span>
    ))}
    </div>
  </>
  )
}