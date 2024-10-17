import axios from "axios";

export const logoutUser = async() => {
  try{
    await axios.post("http://localhost:3000/user/logout", {}, {withCredentials: true});
  }
  catch(AxiosError){
    console.log(AxiosError);
  }
}