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
        <div className="w-[90%] bg-gray-300 p-2 rounded-md mx-auto mt-16 text-gray-700 text-xl">
          <Link onClick={close} className="flex gap-2" to="/streaming">
            <Home size={25} />
            <span>Home news</span>
          </Link>
        </div>
    </aside>
  )
}