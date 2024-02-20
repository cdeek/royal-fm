import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Menu, ArrowLeft } from "react-feather";
import { useEffect, useRef, useState } from 'react';
import Nav from "./nav_bar";

export default function Header() {
 const menuButton = useRef();
 const [isHome, setIsHome] = useState('true');
 
 const location = useLocation();
 const navigate = useNavigate();
 
 useEffect(() => {
  if (location.pathname == '/') {
   setIsHome(true)
  } else {
   setIsHome(false)
  }
 }, [location])
 
 return(
    <header className="flex text-white justify-between bg-gray-600 py-4 px-2 m-0 w-full">
     <div className="flex gap-2">
      { isHome ?
       <Link to="/">
        <Home size={25} />
       </Link>
      :
       <ArrowLeft onClick={() => navigate(-1)} size={25} />
     }
      <h1 className="text-xl font-bold">Royal Fm</h1>
     </div>
     <h2 className=""></h2>
     <div>
      <button onClick={() => menuButton.current.style.width = "70%" }>
         <Menu size={25} />
      </button>
      <br />
      <Nav menu={menuButton} />
    </div>
   </header>
  )
}