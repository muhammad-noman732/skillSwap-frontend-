//  this is for react query
//   a custom hook which makes code better seperation of logic from components

import { useMutation , useQuery , QueryClient, useQueryClient } from "@tanstack/react-query";
import { registerUser , loginUser , logoutUser ,changePassword,fetchCurrentUser } from '../api/authApi/authApi'
import { setCredentials , clearCredentials } from "../../store/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";


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
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    return useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
        console.log("Login successful", data);
        // Set credentials immediately after successful login
        dispatch(setCredentials(data.data));
        toast.success("Login successful");
        // After successful login, fetch the current user
        queryClient.invalidateQueries(['currentuser']);
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || "Login failed";
        toast.error(errorMessage);
      }
    });
};

//  logout

export const useLogout = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            // Clear credentials from Redux
            dispatch(clearCredentials());
            // Clear all queries from cache
            queryClient.clear();
            // Redirect to login
            navigate('/login', { replace: true });
        }
    });
};

//  feth the user 
export const useCurrentUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();

  return useQuery({
    queryKey: ['currentuser'],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    // Only disable the query if we're on the login page and not authenticated
    // This allows the query to run when Google login redirects back
    enabled: !(location.pathname === '/login' && !isAuthenticated),
    onSuccess: (response) => {
      if (response?.data) {
        dispatch(setCredentials(response.data));
      }
    },
    onError: (error) => {
      // Clear credentials for any auth error
      dispatch(clearCredentials());
      
      // Get the current path
      const currentPath = location.pathname;
      
      // Only redirect to login if we're not already on the login page
      if (currentPath !== '/login') {
        navigate('/login', { 
          replace: true,
          state: { from: currentPath }
        });
      }
      
      // Show error message
      const errorMessage = error.response?.data?.message || 'Authentication failed. Please login again.';
      toast.error(errorMessage);
    }
  });
}

//  change password
export const useChangePassword = ()=>{
    return useMutation(changePassword)
}

