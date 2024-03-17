import { useState, useEffect } from 'react';

export default function Update() {
  const [news, setNews] = useState([]);
  const [audios, setAudios] = useState([]);
  const [videos, setVideos] = useState([]);
  
  
 return(
  <main className="flex p-2 justify-between">
  <h2>hello</h2>
  {news.map((n) => (
    <>
   <h2>Delete News</h2>
    <div key={n._id} className="flex my-4 w-[95%] mx-auto bg-[whitesmoke] rounded-md">
     <div className="w-[150px] h-full">
       <img src={n.image} className="w-full h-full rounded-l-md" alt="product" />
     </div>
     <div className="m-4">
       <p>{n.heading}</p>
       <button className="" onClick={() => deleteNews(n._id) }>
         Delete
       </button>
     </div>
    </div>
  </>
  ))}
  
  {videos.map((n, index) => (
    <>
    <h2>Delete Video Streams</h2>
    <div key={index} className="flex my-4 w-[95%] mx-auto bg-[whitesmoke] rounded-md">
     <span>{n}</span>
     <button className="" onClick={() => deletefile(n, 'video') }>
      Delete
     </button>
    </div>
   </>
  ))}
  
  {audios.map((n, index) => (
    <>
    <h2>Delete Audio Streams</h2>
    <div key={index} className="flex my-4 w-[95%] mx-auto bg-[whitesmoke] rounded-md">
     <span>{n}</span>
     <button className="" onClick={() => deletefile(n, 'video') }>
      Delete
     </button>
    </div>
  </>
  ))}
  </main>
  )
}