import axios from "axios";

export const logoutUser = async() => {
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {}, {withCredentials: true});
  }
  catch(AxiosError){
    console.log(AxiosError);
  }
}