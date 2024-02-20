import {useHook}  from '../context/use_context';
import { LogOut, ChevronLeft } from 'react-feather';
import { useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import  SignUp from './create_user';


export default function User({modal}) {
 const { user, dispatch } = useHook();
 const [tab, setTab] = useState('nav');
 
 window.onclick = (event) => {
  if (event.target == modal) {
    modal.current.style.display = "none";
  }
};
 
 return(
  <div ref={modal} className="hidden rounded-md bg-[whitesmoke] pb-6 w-[400px] fixed z-[2] right-2 overflow-auto">
   <span onClick={() => modal.current.style.display= 'none'}
    className="absolute right-[15px] text-[#000] text-[40px] semi-bold pointer" 
    title="Close Modal">
      &times;
   </span>
   <span className="absolute left-[15px] top-4 text-[#000] semi-bold pointer" onClick={() => setTab('nav')}>
    <ChevronLeft size={30} />
   </span>
   <br /><br /><br />
   {tab === "nav" &&
    <div className="animate">
      <button 
      className="flex align-items-center bg-red-700 text-white p-2 rounded-md"
      onClick={() => {
        sessionStorage.removeItem('userData');
        dispatch({type: "LOGOUT"});
        navigate('/statff/login');
       }}>
         Logout <LogOut size={25} />
      </button>
    </div>
   }
   {tab === "" &&
    <div></div>
   }
   {tab === "" &&
    <div></div>
   }
   {tab === "" &&
    <div></div>
   }
   {tab === "signup" &&
    <SignUp />
   }
  </div>
 )
}