import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const userLogout = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser }=useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/auth/logout", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
          const data=await res.json()
          if(data.error){throw new Error(data.error)}

          localStorage.removeItem("chatApp-user")
          document.cookie = `jwt=${data.token}; Max-Age=${0}; Secure; SameSite=Strict`;
          setAuthUser(null)


        } catch (error) {
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }
    return{loading,logout}
}

export default userLogout