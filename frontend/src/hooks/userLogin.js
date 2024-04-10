import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from '../context/AuthContext'

function userLogin() {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async (username, password) => {
        setLoading(true)

        const checkInputs = inputErr(username, password)
        setLoading(false)
        if (checkInputs) return;
        try {
            const res = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()
            if (data.error) { throw new Error(data.error) }

            document.cookie = `jwt=${data.token}; Max-Age=${15 * 24 * 60 * 60}; Secure; SameSite=Strict`;

            localStorage.setItem("chatApp-user", JSON.stringify(data))

            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

const inputErr = (username, password) => {
    if (!username) {
        toast.error("Enter the username", {
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
    if (!password) {
        toast.error("Enter the password !", {
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
}

export default userLogin