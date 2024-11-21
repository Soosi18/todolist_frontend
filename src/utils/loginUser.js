import axios from "axios";

export const loginUser = async (username, password) => {
  const payload = {
    username: username,
    password: password,
  };
  const headers = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/login`,
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