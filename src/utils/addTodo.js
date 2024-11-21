import axios from "axios";

export const addTodo = async(list_id, description) => {
  const payload = 
  {
    description: description
  }

  try {
    const { data } = await axios.post(`http://localhost:3000/list/${list_id}/todo/`, payload, { withCredentials: true });
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.data);
    return AxiosError.response.data;
  }
}