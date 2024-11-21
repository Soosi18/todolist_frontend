import axios from "axios";

export const deleteTodo = async(list_id, todo_id) =>{
  try{
    const { data } = await axios.delete(`http://localhost:3000/list/${list_id}/todo/${todo_id}`, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.data);
  }
}