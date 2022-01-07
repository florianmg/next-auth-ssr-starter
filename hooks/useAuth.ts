import { useContext } from "react";
import { AuthContext } from '../store/authContext';

export const useAuth = () => {
  return useContext(AuthContext);
}; 

