import Cookies from "js-cookie";
export const logout = () => {
    Cookies.remove('token'); // ✅ clears the cookie
    // redirect to login page
  };