import axios from "axios";

export const deleteList = async(list_id) =>{
  try{
    console.log(list_id);
    
    const { data } = await axios.delete(`http://localhost:3000/list/${list_id}`, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.data);
    return AxiosError.response.data;
  }
}