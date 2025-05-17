import axios from "axios";

// base setup
const api = axios.create({
    baseURL:'http://localhost:8000/api/auth',
    withCredentials: true // for cookies
})

// Add request interceptor to include credentials
api.interceptors.request.use(
    (config) => {
        // No need to manually add token as it's handled by cookies
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle responses
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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
export const logoutUser = async() =>{
        const data = await api.post("/logout");
        return data ;
}

// Get current user
export const fetchCurrentUser = async () => {
    const { data } = await api.get("/current-user"  );
    console.log('Raw API response:', data);
    return data;
};

// Change password
export const changePassword = async (formData) => {
    const { data } = await api.post("/changepassord", formData);
    return data;
  };