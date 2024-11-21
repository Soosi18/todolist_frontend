import axios from "axios";

export const editListName = async (list_id, name) => {  
  const payload = 
  {
    name: name
  };

  try{
    const { data } = await axios.put(`http://localhost:3000/list/${list_id}`, payload, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response);
    return AxiosError.response;
  }
}