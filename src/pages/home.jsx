import Header from "../components/header";
import liveImg from '../assets/live.png';
import { Link } from "react-router-dom";
import NewsAPI from 'newsapi';
import { useState, useEffect } from 'react';


export default function App() {
 const [news, setNews] = useState([]);
 const [localNews, setLocalNews] = useState([]);
 
 useEffect(() => {
  fetch('get/local-news')
   .then(res => res.json())
   .then(data => {
     setLocalNews(data)
   })
   .catch(err => console.error(err));
  
  async function fetchData() {
    const url = 'https://newsapi.org/v2/top-headlines?country=ng&apiKey=780a0a9d32654ef7b0408d321fc7f8bc';
   
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setNews(result.articles);
        console.log(result);
      } else {
        console.error('Response not okay:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  fetchData();
}, []);

  return (
    <>
      <Header />
      <Link to="/live-streaming">
       <img src={liveImg} className="w-full h-[200px]" alt="live" />
      </Link><br />
      <main className="w-[90%] mx-auto flex flex-col gap-8  h-full">
      <h3 className="w-[160px] text-center mx-auto text-white bg-blue-600 p-1">LOCAL NEWS</h3>
        <div className="border-t-4 bg-white border-t-black flex flex-col gap-8">
         {
          localNews.map((n) => (
           <div key={n._id} to={n.url} className="bg-[whitesmoke] p-4 w-full">
            <img src={n.image} className="w-full h-[260px]" alt="news image" />
            <h2 className="text-semi-bold text-2xl">{n.heading}</h2>
            <p>{n.body}</p>
          </div>
         ))
         }
        </div>
        
      <h3 className="w-[100px] text-center mx-auto text-white bg-blue-600 p-1">HEADLINES</h3>
        <div className="p-2 border-t-4 bg-white border-t-black flex flex-col gap-8">
         {
          news.map((n,index) => (
           <Link key={index} to={n.url} className="bg-[whitesmoke] p-2">
            <img src={n.urlToImage} alt="news image" />
            <small className="text-semi-bold">{n.source.name}</small>
            <h2 className="text-semi-bold text-2xl">{n.title}</h2>
            <small>{n.publishedAt}</small>
            <p>{n.description}</p>
            <p>{n.content}</p>
           </Link>
         ))
         }
        </div>
        <Link to="/live-streaming">
         <img src={liveImg} className="w-full h-[200px]" alt="live" />
        </Link>
      </main>
    </>
  )
}