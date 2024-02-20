import { Link } from "react-router-dom";
import { Mic } from "react-feather";
import {useHook}  from '../context/use_context';
import Header from "../components/staff_header";

const buttonClassName =
    "rounded-3xl p-3 w-full font-bold bg-gray-500 hover:bg-gray-400 border-4 border-gray-600 font-mono flex flex-row items-center";
const iconClassName = "p-2 bg-gray-600 mr-4 rounded-full inline";

export default function Staff() {
    return (
        <div className="flex flex-col h-full">
          <Header />
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