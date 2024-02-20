import { useRef } from "react";
import { Link } from "react-router-dom";
import { Home, User } from "react-feather";
import {useHook}  from '../context/use_context';
import Menu from "./user";

export default function Header() {
 const userButton = useRef();
 const { user } = useHook();
 
 return(
    <header className="flex text-white justify-between bg-gray-600 py-4 px-2 m-0 w-full">
     <div className="flex gap-2">
       <Link to="/staff">
        <Home size={25} />
       </Link>
       <h1 className="text-xl font-bold">Royal Fm Staff</h1>
     </div>
     <h2 className="">Hello {user.name.toUpperCase()}</h2>
     <div>
      <button onClick={() => userButton.current.style.display = "block" }>
         <User size={25} />
      </button>
      <br />
      <Menu modal={userButton} user={user} />
    </div>
   </header>
  )
}