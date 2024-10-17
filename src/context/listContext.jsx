import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { userContext } from "./userContext";

const listIdContext = createContext(null);
const { currentUser } = useContext(userContext);

useEffect(() => {
  if(currentUser){

  }

  return () => {}
}, [])


export const listIdContextProvider = ({children}) => {
  
} 