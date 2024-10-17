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
      "http://localhost:3000/user/login",
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