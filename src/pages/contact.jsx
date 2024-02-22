import Header from "../components/header";
import { Mail, MapPin, PhoneCall } from "react-feather";

export default function Contact() {
  const handleSubmit = async (event) => {
   event.preventDefault();
   
   const data = {
     name: event.target.name.value, 
     clientEmail: event.target.email.value, 
     message: event.target.message.value, 
     phone: event.target.phone.value
    };
   
   const res = await fetch('send-mail/client', {
    method: "POST",
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   });
   
   const json = await res.json();
   
   if(!res.ok) alert(json.error);
   if(res.ok) {
     event.target.name.value = "";
     event.target.email.value = "";
     event.target.message.value = "";
     event.target.phone.value = "";
     alert(json.message)
   };
 };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="w-[95%] bg-gray-400 rounded-md p-4 mx-auto my-8">
        <h1 className="text-xl semi-bold">Send a Message</h1>
        <input className="p-2 w-full rounded-md my-4" type="text" name="name" placeholder="Name" required />
        <input className="p-2 w-full rounded-md my-4" type="email" name="email" placeholder="Email" required />
        <input className="p-2 w-full rounded-md my-4" type="tel" name="phone" placeholder="Phone Number" required />
        <textarea className="w-full h-[200px] p-2 rounded-md my-4" name="message" placeholder="Message" required />
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