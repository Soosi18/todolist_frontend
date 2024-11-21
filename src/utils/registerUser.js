import axios from "axios";

export const registerUser = async (username, password) => {
  const payload = {
    username: username,
    password: password,
  };
  const headers = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  try {
    console.log(`${import.meta.env.VITE_API_URL}/user/register`);
    
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/register`,
      payload,
      headers
    );
    return data;
  }
  catch(AxiosError){
    console.log(AxiosError);
    return AxiosError.response.data;
  }
}