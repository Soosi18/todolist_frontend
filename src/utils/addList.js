import axios from "axios";

export const addList = async(listName) => {
  payload = 
  {
    name: listName
  }

  try {
    const { data } = await axios.post("http://localhost:3000/list/", payload, { withCredentials: true });
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.data);
    return AxiosError.response.data;
  }
}