import { useState } from 'react';
import Header from "../components/header";
import { Mail, MapPin, PhoneCall } from "react-feather";

export default function Contact() {
 const [name, setName] = useState('');
 const [client_email, setClient_email] = useState('');
 const [message, setMessage] = useState('');
 const [phone, setPhone] = useState(Number);
 
 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const res = await fetch('/send-mail/client', {
   method: "POST",
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ client_email, name, phone, message })
  });
  const json = await res.json();
  if (!res.ok) alert(json.error);
  if (!res.ok) alert(json.message);
  
 }
  
  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="w-[95%] bg-gray-400 rounded-md p-4 mx-auto my-8">
        <h1 className="text-xl semi-bold">Send a Message</h1>
        <input className="p-2 w-full rounded-md my-4" type="text" onChange={(e)=>setName(e.target.value)} placeholder="Name" required />
        <input className="p-2 w-full rounded-md my-4" type="email" onChange={(e)=>setClient_email(e.target.value)} placeholder="Email" required />
        <input className="p-2 w-full rounded-md my-4" type="tel" onChange={(e)=>setPhone(e.target.value)} placeholder="Phone Number" required />
        <textarea className="w-full h-[200px] p-2 rounded-md my-4" onChange={(e)=>setMessage(e.target.value)} placeholder="Message" required />
        <button className="p-2 bg-sky-500 hover:bg-sky-700 w-full rounded-md my-4">Send</button>
      </form><br/>
        <ul className="list-none my-8 mx-auto w-[95%]">
          <li className="flex gap-4">
            <span><PhoneCall size={30} /></span> 
            <span>08098578576</span>
          </li><br />
          <li className="flex gap-4">
            <span><Mail size={30} /></span> 
            <span>royalfm@gmail.com</span>
          </li><br />
          <li className="flex gap-4">
            <span><MapPin size={30} /></span> 
            <span>Plot 217 Kaduna road, near Nepa office, Sokoto, Nigeria</span>
          </li>
        </ul>
    </>
  )
}