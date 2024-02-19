import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useHook }  from '../context/use_context';

export default function App() {
 const { user, dispatch } = useHook();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [loading, setloading] = useState(false);
 
 const navigate = useNavigate();
 
 const handleSubmit = async (e) => {
   e.preventDefault();
   setError('');
   setloading(true);

    const res = await fetch('/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({email, password})
    });
    const json = await res.json();
    if(!res.ok) {
      setloading(false);
      setError(json.error || 'Something went wrong. Please try again.');
    }
    if(res.ok) {
      setloading(false);
      const setUser = await sessionStorage.setItem('userData', JSON.stringify(json), { expires: 7 });
      dispatch({type: "LOGIN", payload: json});
      navigate("/staff");
    }
  };
  return (
    <>
      <header className="flex text-white bg-gray-600 py-4 px-2 m-0 w-full">
        <h1 className="text-xl mx-auto font-bold">Staff Login Page</h1>
      </header>
      <form onSubmit={handleSubmit} className="p-4 w-[350px] text-white bg-gray-600 mt-20 mx-auto grid w-full items-center gap-4 rounded-md">
        <label htmlFor="user-email">Email</label>
        <input className="text-gray-700 outline-none p-2 rounded-md w-full" type="text" onChange={(e) => setEmail(e.target.value.toLowerCase())} id="user-email" placeholder="email@example.com" />
        <label htmlFor="password">Password</label>
        <input className="text-gray-700 outline-none p-2 rounded-md w-full" type="password" onChange={(e) => setPassword(e.target.value)} id="Password" placeholder="enter your password"/>
        {!loading &&
          <button className="bg-blue-800 w-full p-2">Login</button>
        }
        {loading &&
          <button className="bg-blue-800 w-full p-2" disabled={true} >Loging in...</button>
        }
        {error && 
          <h3 className="rounded-md border-2 text-red-300 border-red-300 p-2 m-2">
            {error}
          </h3>
        }
      </form>
    </>
  )
}