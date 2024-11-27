import axios from "axios";

export const editListName = async (list_id, name) => {  
  const payload = 
  {
    name: name
  };

  try{
    const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/list/${list_id}`, payload, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response);
    return AxiosError.response;
  }
}