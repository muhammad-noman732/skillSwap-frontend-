import axios from "axios";

// base setup

const api = axios.create({
    baseURL:'http://localhost:8000/api/auth',
    withCredentials: true // for cookies
})

//  registe user
export const registerUser = async(formData)=>{
    const {data} =  await api.post('/signup' ,  formData)
    return data;
} 

//  login user 
export const loginUser = async(formData)=>{
      const {data} = await api.post('/login' , formData);
      return data;
}

//  logout user
export const logoutUser = async()=>{
        const data = await api.post("/logout");
        return data ;
}

// Get current user
export const fetchCurrentUser = async () => {
    const { data } = await api.get("/current-user");
    return data;
  };

// Change password
export const changePassword = async (formData) => {
    const { data } = await api.post("/changepassord", formData);
    return data;
  };