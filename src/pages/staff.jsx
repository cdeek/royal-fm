import React from "react";
import { Link } from "react-router-dom";
import { Mic, User } from "react-feather";

const buttonClassName =
    "rounded-3xl p-4 w-full font-bold bg-gray-500 hover:bg-gray-400 border-4 border-gray-600 font-mono flex flex-row items-center";
const iconClassName = "p-3 bg-gray-600 mr-4 rounded-full inline";

export default function Staff() {
    return (
        <div className="flex text-white flex-col items-center h-full">
          <header className="flex bg-gray-600 py-4 px-2 m-0 w-full">
            <h1 className="text-xl mx-auto font-bold">Royal Fm Staff</h1>
            <User size={25} />
          </header>
          <br />
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