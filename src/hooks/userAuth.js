import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLogin } from "../store/userLoginSlice";

const useAuth = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isLogged, setIsLogged] = useState(!!user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = (email, password) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        localStorage.setItem("user", email);
        dispatch(getUserLogin(email));
        setUser({ email });
        setIsLogged(true);
        navigate("/");
        res({ email });
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
    navigate("/login");
  };
  return { isLogged, login, logout };
};

export default useAuth;
