import axios from "axios";

export const getTodos = async (list_id) => {
  try{
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/list/${list_id}/todo/`, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.message);
  }
}