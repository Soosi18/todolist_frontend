import axios from "axios";

export const editTodoStatus = async (list_id, todo_id, is_complete) => {
  const payload = 
  {
    is_complete: is_complete
  };

  try{
    const { data } = await axios.put(`http://localhost:3000/list/${list_id}/todo/status/${todo_id}`, payload, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response);
  }
}