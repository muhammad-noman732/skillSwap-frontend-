//  this is for react query
//   a custom hook which makes code better seperation of logic from components

import { useMutation , useQuery ,QueryClient } from "@tanstack/react-query";
import { registerUser , loginUser , logoutUser ,changePassword,fetchCurrentUser } from "./authApi";
import { setCredentials , clearCredentials } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";


//  usemutaion is for post , put and delete 
export const useRegister = () =>{
    const dispatch = useDispatch();
      return  useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log('REGISTER SUCCESS DATA:', data); 
            dispatch(setCredentials({ user: data.data }));
          },
      })
}


//  for login , call loginser when user submit login buttn
export const useLogin = () => {
    const dispatch = useDispatch();
    return useMutation(loginUser, {
      onSuccess: (data) => {
        dispatch(setCredentials({ user: data.data }));
      },
    });
  };

//  logout

// export const useLogout = ()=>{
//     const dispatch = useDispatch();
//     const querylient = QueryClient() 
//     return  useMutation(logoutUser ,{
//         onSuccess:()=>{
//             dispatch(clearCredentials());
//             // clear cashed queries
//             querylient.clear() 
//         }
//     })
// }

//  feth the user 
export const useCurrentUser = ()=>{
     return  useQuery('currentuser' , fetchCurrentUser);
}

//  change password
export const useChangePassword = ()=>{
    return useMutation(changePassword)
}