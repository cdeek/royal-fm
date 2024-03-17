import { createContext, useEffect, useReducer, useState } from 'react';

export const Context = createContext();

const authReducer = (state, action) => {
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

const initialState = {
  news: [],
  audios: [],
  videos: []
}

const storeReducer = (state, action) => {
  switch(action.type) {
    case "NEWS":
      return {
        ...state,
        news: action.payload
      }
    case "AUDIOS":
      return {
        ...state,
        audios: action.payload
      };
    case "VIDEOS":
      return {
        ...state,
        videos: action.payload
      };
    case 'FETCH_ERROR':
      return { 
        ...state,
        error: action.payload 
      };
    default: state
  }
}

async function fetchData() {
  try {
    const res = await fetch('get/data');
    const json = await res.json();
    return json;
  } catch (error) {
  throw new Error('Failed to fetch data');
  }
}

export default function ContextProvider({children}) {
  const [state, dispatch] = useReducer(authReducer, {user: null});
  const [state1, dispatch1] = useReducer(storeReducer, initialState);
  
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
   
   const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        dispatch1({ type: 'NEWS', payload: data.news });
        dispatch1({ type: 'AUDIOS', payload: data.files.audio });
        dispatch1({ type: 'VIDEOS', payload: data.files.video });
        console.log(data);
      } catch (error) {
        dispatch1({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchDataAsync();
},[]);
  
  const values = {
    user: state.user,
    dispatch,
    news: state1.news,
    audios: state1.audios,
    videos: state1.videos
  };
  
  return(
      <Context.Provider value={values}>
        {children}
      </Context.Provider>
    )
}

