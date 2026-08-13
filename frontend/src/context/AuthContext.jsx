import { createContext, useEffect, useState,useContext } from "react";
import { getCurrentUser,logoutUser } from "../services/auth";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();

        setUser(response.data);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // log out 
  const logout=async()=>{
    try{
      await logoutUser();
      setUser(null)
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider;