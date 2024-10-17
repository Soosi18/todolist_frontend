import { createContext, useState, useEffect } from "react";
import axios from 'axios' 

export const userContext = createContext();

export const UserContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async() => {
      try{
        const { data } = await axios.get('http://localhost:3000/user/current', {withCredentials: true});
        if(data.success){
          setCurrentUser(data.username);
        } 
      }
      catch(AxiosError){
        console.log(AxiosError);
      }
    }
    
    getUser();
    return () => {}
  }, [])
  
  return (
    <userContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </userContext.Provider>
  );
}
