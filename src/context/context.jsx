import { createContext, useEffect, useReducer, useState } from 'react';

export const Context = createContext();

export const authReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      return {
        user: action.payload
      }
    case "LOGOUT":
      return {
        user: null
      }
    default: state
  }
}

export default function ContextProvider({children}) {
  const [state, dispatch] = useReducer(authReducer, {user: null});
  
  useEffect(()=> {
    const getUser = () => {
      try {
        const user = sessionStorage.getItem('userData');
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error('Error getting cookie storage item:', error);
        alert(error);
        return null;
      }
   };
   
   const newUser = getUser();
  
   if(newUser) {
     dispatch({type: "LOGIN", payload: newUser})
   }
},[]);
  
  const values = {
    user: state.user,
    dispatch
  };
  
  return(
      <Context.Provider value={values}>
        {children}
      </Context.Provider>
    )
}

