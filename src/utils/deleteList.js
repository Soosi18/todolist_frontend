import axios from "axios";

export const deleteList = async(list_id) =>{
  try{
    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/list/${list_id}`, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.data);
    return AxiosError.response.data;
  }
}