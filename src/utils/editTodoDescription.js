import axios from "axios";

export const editTodoDescription = async (list_id, todo_id, description) => {  
  const payload = 
  {
    description: description
  };

  try{
    const { data } = await axios.put(`http://localhost:3000/list/${list_id}/todo/desc/${todo_id}`, payload, {withCredentials: true});
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response);
  }
}