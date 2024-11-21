import axios from "axios";

export const getTodos = async (list_id) => {
  try{
    const { data } = await axios.get(`http://localhost:3000/list/${list_id}/todo/`, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.message);
  }
}