//  this is for react query
//   a custom hook which makes code better seperation of logic from components

import { useMutation , useQuery , QueryClient, useQueryClient } from "@tanstack/react-query";
import { registerUser , loginUser , logoutUser ,changePassword,fetchCurrentUser } from '../api/authApi/authApi'
import { setCredentials , clearCredentials } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


//  usemutaion is for post , put and delete 
export const useRegister = () =>{
    const QueryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
      mutationFn: registerUser,
      onSuccess: (data) => {
        toast("Signup successfully");
        console.log('REGISTER SUCCESS DATA:', data); 
        QueryClient.invalidateQueries(["currentuser"]);
        dispatch(setCredentials({ user: data.data }));
      },
    });
}

//  for login , call loginser when user submit login buttn
export const useLogin = () => {
    const dispatch = useDispatch();
    return useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
        console.log("user login successfully" , data);
        toast("Login successfully");
        dispatch(setCredentials({ user: data.data }));
      },
    });
};

//  logout

export const useLogout = ()=>{
    const dispatch = useDispatch();
    const QueryClient = useQueryClient() 
    return  useMutation({
        mutationFn: logoutUser,
        onSuccess:()=>{
            dispatch(clearCredentials());
            // clear cashed queries 
        }
    })
}

//  feth the user 
export const useCurrentUser = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ['currentuser'],
    queryFn: fetchCurrentUser,
    onSuccess: (response) => {
      console.log('Response in onSuccess:', response);
      
    },
    select: (response) => {
      console.log('Response in select:', response);
      return response.data || null;
    }
  });
}

//  change password
export const useChangePassword = ()=>{
    return useMutation(changePassword)
}