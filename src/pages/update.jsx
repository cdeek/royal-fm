import { useHook }  from '../context/use_context';
import Header from "../components/staff_header";
import { Trash2 } from "react-feather";

export default function Update() {
  const { user, videos, audios, news } = useHook();

  const deleteNews = async (id) => {
    const res = await fetch(`/delete/news/${id}`, {
      method: "DELETE",
      headers: {
      'Authorization': `bearer ${user.token}`,
      }
    });
    const json = await res.json();
    if (!res.ok) {
      alert('failed to delete');
      console.error(json.error)
    }
    else alert('deleted');
    console.error(json.error)
  };
  
  const deletefile = async (id) => {
    const res = await fetch(`/delete/file/${id}`, {
      method: "DELETE",
      headers: {
      'Authorization': `bearer ${user.token}`,
      }
    });
    const json = await res.json();
    if (!res.ok) alert('failed to delete');
    else alert('deleted');
  };
  
 return(
  <>
  <Header />
  <main className="grid gap-4">
  <h2>hello</h2>
  {news.map((n) => (
    <div key={n._id} className="flex my-4 w-[95%] mx-auto bg-[whitesmoke] rounded-md overflow-hidden">
     <div className="w-[180px] h-[150px]">
       <img src={'/' + n.image} className="w-full h-full" alt="news image" />
     </div>
     <div className="w-full flex items-center justify-between m-4">
       <p className="flex-[80%]">{n.heading}</p>
       <Trash2 className="flex-[20] text-red-600" size={35} onClick={() => deleteNews(n._id) } />
     </div>
    </div>
  ))}
  
  {videos.map((n, index) => (
    <>
    <h2>Delete Video Streams</h2>
    <div key={index} className="flex p-4 my-4 gap-4 w-[95%] mx-auto bg-[whitesmoke] rounded-md">
     <span>{n}</span>
     <Trash2 size={35} className="text-red-600" onClick={() => deletefile(n) } />
    </div>
   </>
  ))}
  
  {audios.map((n, index) => (
    <>
    <h2>Delete Audio Streams</h2>
    <div key={index} className="flex p-4 my-4 gap-4 w-[95%] mx-auto bg-[whitesmoke] rounded-md">
     <span>{n}</span>
     <Trash2 className="text-red-600" size={35} onClick={() => deletefile(n) } />
    </div>
  </>
  ))}
  </main>
  </>
  )
}