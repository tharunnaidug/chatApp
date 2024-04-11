import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";


export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext()

    useEffect(() => {
        if (authUser) {
            const socket = io('https://chatapp-h0mo.onrender.com',{//replacing according to deploy or dev
                query:{
                    userId:authUser._id, 
                }
            })
            setSocket(socket);

            socket.on("getOnlineUsers",(users)=>{
                   setOnlineUsers(users)
            })

            return () => socket.close();
        }
        else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])
    console.log(onlineUsers)
    return (<SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>)
}
