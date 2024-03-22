import { Link } from "react-router-dom";
import { useState } from "react";
import { Mic, Edit } from "react-feather";
import {useHook}  from '../context/use_context';
import Header from "../components/staff_header";

const buttonClassName =
    "rounded-3xl p-3 w-full font-bold bg-gray-500 hover:bg-gray-400 border-4 border-gray-600 font-mono flex flex-row items-center";
const iconClassName = "p-2 bg-gray-600 mr-4 rounded-full inline";
const inputClassName = "my-4 rounded-xl p-2 w-full";

export default function Staff() {
  const { user } = useHook();
 const [translated, setTranslated] = useState('');
 const [loading, setLoading] = useState('');
 //const [image, setImage] = useState([]);
 
 const handleTranslation = async (e) => {
  e.preventDefault();
  setLoading('translate')
  
  const value = e.target.text.value;
  
  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
  const options = {
  	method: 'POST',
  	headers: {
  		'content-type': 'application/x-www-form-urlencoded',
  		'Accept-Encoding': 'application/gzip',
  		'X-RapidAPI-Key': '349a68829fmshd80ce07fa933b39p117353jsn80d70db45952',
  		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  	},
  	body: new URLSearchParams({
  		q: value,
  		target: 'ha',
  		source: 'en'
  	})
  };
  
  try {
  	const response = await fetch(url, options);
  	const result = await response.text();
  	const data = JSON.parse(result);
  	console.log(data);
  	setTranslated(data.data.translations[0].translatedText);
  	setLoading('');
  } catch (error) {
  	console.error(error);
  }
 }
 
 const handlePost = async (e) => {
  e.preventDefault();
  setLoading('post');
  
  const formData = new FormData(e.target);
  //formData.append('image', image);
  const res = await fetch('/post', {
    method: 'POST',
    headers: {
    'Authorization': `bearer ${user.token}`,
    },
    body: formData
  })
  const json = await res.json();
  if (!res.ok) {
    alert(json.error)
    setLoading('')
  };
  if (res.ok) {
    alert('posted successful')
    setLoading('')
  };
 }
 
 const uploadFiles = async (e) => {
  e.preventDefault();
  setLoading('upload');
  
  const formData = new FormData(e.target);

  const res = await fetch('/post/upload-files', {
    method: 'POST',
    headers: {
    'Authorization': `bearer ${user.token}`
    },
    body: formData
  })
  const json = await res.json();
  if (!res.ok) {
    setLoading('');
    alert('failed')
  };
  if (res.ok) {
    setLoading('');
    alert('uploaded')
  };
 }
    return (
        <div className="flex flex-col gap-8  h-full">
          <Header />
          <form onSubmit={handleTranslation} className="p-4 bg-[whitesmoke] w-[90%] mx-auto">
          <h2>Translator</h2>
            <textarea className="h-[400px] w-full rounded-lg p-2" type="text" name="text" placeholder="Translate..." required />
            {loading == 'translate' ?
               <button className="w-full bg-green-500 p-2 rounded-lg">Translating...</button>
               :
               <button className="w-full bg-green-500 p-2 rounded-lg">Translate</button>
            }
          </form>
          
          <div className="bg-black text-white p-4 w-[90%] mx-auto">
           <p>{translated}</p>
          </div>
          
          <div>
           <form onSubmit={handlePost} className="p-4 bg-[whitesmoke] w-[90%] mx-auto mt-[150px]">
           <h2>Post a News</h2>
             <input className={inputClassName} type="text" name="heading" placeholder="heading" required /> 
             <textarea className={inputClassName} type="text" name="body" placeholder="body" required />
             <label>news image</label>
             <input className={inputClassName} type="file" accept="image/*" name="image" />
             {loading == 'post' ?
               <button className="w-full bg-green-500 p-2 rounded-lg">Posting...</button>
               :
               <button type="submit" className="w-full bg-green-500 p-2 rounded-lg">Post</button>
              }
           </form>
          </div>
          
          <div>
            <form onSubmit={uploadFiles} className="p-4 bg-[whitesmoke] w-[90%] mx-auto">
            <h2>Upload a file Streaming</h2>
             <input className={inputClassName} type="file" id="files" accept="audio/*" name="audio" />
             <input className={inputClassName} type="file" id="files" accept="video/*" name="video" />
             {loading == 'upload' ?
               <button className="w-full bg-green-500 p-2 rounded-lg">Uploading...</button>
               :
               <button className="w-full bg-green-500 p-2 rounded-lg">Upload</button>
              }
            </form>
          </div>
          
          <div className="mx-auto space-y-3 flex flex-col items-center w-max">
             <Link to="/staff/live_broadcast" className="w-full">
                 <button type="button" className={buttonClassName}>
                     <div className={iconClassName}>
                         <Mic size={32} />
                     </div>
                     Start Stream
                 </button>
             </Link>
             <Link to="/staff/delete" className="w-full">
                 <button type="button" className={buttonClassName}>
                     <div className={iconClassName}>
                         <Edit size={32} />
                     </div>
                     Edit/Update
                 </button>
             </Link>
          </div>
        </div>
    );
}