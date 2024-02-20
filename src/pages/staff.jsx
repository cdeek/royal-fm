import { useRef } from "react";
import { Link } from "react-router-dom";
import { Mic, User } from "react-feather";
import {useHook}  from '../context/use_context';
import Menu from "../components/user.jsx";

const buttonClassName =
    "rounded-3xl p-3 w-full font-bold bg-gray-500 hover:bg-gray-400 border-4 border-gray-600 font-mono flex flex-row items-center";
const iconClassName = "p-2 bg-gray-600 mr-4 rounded-full inline";

export default function Staff() {
 const userButton = useRef();
 const { user, dispatch } = useHook();
 
    return (
        <div className="flex flex-col h-full">
          <header className="flex text-white justify-between bg-gray-600 py-4 px-2 m-0 w-full">
            <h1 className="text-xl font-bold">Royal Fm Staff</h1>
            <div>
             <button onClick={() => userButton.current.style.display = "block" }>
              <User size={25} />
             </button>
             <br />
             <Menu modal={userButton} />
            </div>
          </header>
          <h2 className="text-xl p-2 font-bold">Welcome Back {user.name.toUpperCase()}</h2>
          <div>
            
          </div>
          <div className="space-y-3 flex flex-col items-center w-max">
             <Link to="/staff/live_broadcast" className="w-full">
                 <button type="button" className={buttonClassName}>
                     <div className={iconClassName}>
                         <Mic size={32} />
                     </div>
                     Start Stream
                 </button>
             </Link>
          </div>
        </div>
    );
}