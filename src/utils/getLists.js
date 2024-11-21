import axios from "axios";

export const getLists = async() => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/list`, { withCredentials: true });
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError.response.data);
  }
}