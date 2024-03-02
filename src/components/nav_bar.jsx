import { Link } from "react-router-dom";
import { Home } from "react-feather";

export default function Nav({ menu }) {
 const close = () => {
  menu.current.style.width = 0;
 }
  return(
    <aside ref={menu} className="w-0 fixed h-full top-0 right-0 overflow-y-auto bg-[whitesmoke] duration-500">
        <span onClick={close}
         className="absolute right-[15px] text-[#000] text-[40px] semi-bold pointer" 
         title="Close Modal">
           &times;
        </span>
        <div className="w-[90%] p-2 mx-auto mt-16 text-gray-700 text-xl">
          <Link onClick={close} className="flex gap-2 bg-gray-300 p-2 my-4 rounded-sm" to="/">
            <Home size={25} />
            <span>Home</span>
          </Link>
          <Link onClick={close} className="flex gap-2 bg-gray-300 p-2 my-4 rounded-sm" to="/headlines">
            <span>Headlines</span>
          </Link>
          <Link onClick={close} className="flex gap-2 bg-gray-300 p-2 my-4 rounded-sm" to="/streaming">
            <span>Live</span>
          </Link>
          <Link onClick={close} className="flex gap-2 bg-gray-300 p-2 my-4 rounded-sm" to="/contact">
            <span>Contact</span>
          </Link>
          <Link onClick={close} className="flex gap-2 bg-gray-300 p-2 my-4 rounded-sm" to="/staff">
            <span>Staff</span>
          </Link>
        </div>
    </aside>
  )
}