import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../context/AuthContext";

const userSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signUp = async ({ name, username, password, cpassword, email, gender }) => {
    const checkInputs = inputErr(name, username, password, cpassword, email, gender)
    if (checkInputs) return;

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password, cpassword, email, gender })
      })
      const data = await res.json()
      if (data.error) { throw new Error(data.error) }

      //Setting data to local stroage
      localStorage.setItem("chatApp-user", JSON.stringify(data))
      //upadating 
      setAuthUser(data)
      // console.log(data)

    } catch (error) {
      toast.error(error.meassage, {
        position: "top-center"
      });
    } finally {
      setLoading(false)
    }

  }
  return { loading, signUp }

}

export default userSignup

const inputErr = (name, username, password, cpassword, email, gender) => {
  if (!name || !username || !password || !cpassword || !email || !gender) {
    toast.error("Input all fields properly !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return true
  }
  if (password != cpassword) {
    toast.error("Passwords doesnot match!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return true;
  }
  if (password.length < 8) {
    toast.error("Passwords must be aleast 8 length", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return true;

  }

}