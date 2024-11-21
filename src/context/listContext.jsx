import { createContext, useState } from "react";

export const listContext = createContext();

export const ListContextProvider = ({children}) => {
  const [selectedList, setSelectedList] = useState(null);
  return(
    <listContext.Provider value={{selectedList, setSelectedList}}>
      {children}
    </listContext.Provider>
  );
} 