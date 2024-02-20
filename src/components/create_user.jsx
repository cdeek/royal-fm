import { useState } from 'react';

export default function Signin() {
 const [email, setEmail] = useState('');
 const [name, setName] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [success, setSuccess] = useState(null);
 const [loading, setloading] = useState(false);
 
 const handleSubmit = async (e) => {
   e.preventDefault();
   setError('');
   setloading(true);

    const res = await fetch('/users/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({email, name, password})
    });
    const json = await res.json();
    if(!res.ok) {
      setloading(false);
      setError(json.error || 'Something went wrong. Please try again.');
    }
    if(res.ok) {
      setloading(false);
      setSuccess(json.message);
    }
  };
 return(
   <form onSubmit={handleSubmit} className="animate p-4 text-white bg-gray-600 mx-auto w-full rounded-md">
   {!success ?
    <div>
     <h1>Create a staff account</h1>
     <br />
     <label htmlFor="user-email">Email</label>
     <input className="text-gray-700 outline-none p-2 rounded-md w-full" type="text" onChange={(e) => setEmail(e.target.value.toLowerCase())} id="user-email" placeholder="email@example.com" />
     <br />
     <br />
     <label htmlFor="name">Name</label>
     <input className="text-gray-700 outline-none p-2 rounded-md w-full" type="text" onChange={(e) => setName(e.target.value.toLowerCase())} id="name" placeholder="email@example.com" />
     <br />
     <br />
     <label htmlFor="password">Password</label>
     <input className="text-gray-700 outline-none p-2 rounded-md w-full" type="password" onChange={(e) => setPassword(e.target.value)} id="Password" placeholder="enter your password"/>
     <br />
     <br />
     {!loading &&
      <button className="bg-blue-800 w-full p-2">Create Account</button>
     }
     {loading &&
      <button className="bg-blue-800 w-full p-2" disabled={true} >Creating...</button>
     }
     <br />
     {error && 
      <h3 className="rounded-md border-2 text-red-300 border-red-300 p-2 m-2">
        {error}
      </h3>
      }
     </div>
    :
    <div className="my-6 text-center">
     <h1 className="text-green-400">{success}</h1><br />
     <h4 className="blue-green-600" onClick={() => setSuccess(null)}>Done</h4>
    </div>
   }
   </form>
  )
}
