import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";


export const useHandleVC = () => {
  const { socket } = useSocketContext();
  const {authUser}=useContext(AuthContext);

  const handleVC = () => {
    socket?.emit("join-room", { roomId: 1, userId:authUser?.username });
  };

  return handleVC;
};
