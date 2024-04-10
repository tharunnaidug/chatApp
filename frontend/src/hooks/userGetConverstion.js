import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const userGetConverstion = () => {
    const [loading, setLoading] = useState(false)
    const [converstions, setConverstions] = useState([])

    useEffect(() => {
        const getConverstions = async () => {
            setLoading(true)
            try {

                const res = await fetch("/user/", { credentials: "include" })
                const data = await res.json()

                if (data.error) { throw new Error(data.error) }
                toast.error(data, {
                    position: "top-center"
                });

                setConverstions(data)

            } catch (error) {
                toast.error(error.meassage, {
                    position: "top-center"
                });
            } finally {
                setLoading(false)
            }
        }
        getConverstions()
    }, [])
    return { loading, converstions }
}

export default userGetConverstion