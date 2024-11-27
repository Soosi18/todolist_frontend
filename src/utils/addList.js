import axios from "axios";

export const addList = async(listName) => {
  const payload = 
  {
    name: listName
  }

  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/list/`, payload, { withCredentials: true });
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.data);
    return AxiosError.response.data;
  }
}