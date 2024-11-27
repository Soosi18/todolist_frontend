import axios from "axios";

export const deleteTodo = async(list_id, todo_id) =>{
  try{
    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/list/${list_id}/todo/${todo_id}`, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.data);
  }
}