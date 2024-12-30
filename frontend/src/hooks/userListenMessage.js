import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import userConversation from '../zustand/userConverstion';
import notification from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = userConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on('newMessage', handleNewMessage);

    return () => {
      socket?.off('newMessage', handleNewMessage);
    };
  }, [socket, setMessages]);

  useEffect(() => {
    const handleJoinedRoom = (data) => {
      const { roomId } = data;
      console.log('Joined room:', roomId);
      const vcElements = document.querySelectorAll('.vc');
      const mcElements = document.querySelectorAll('.mc');
      const sbElements = document.querySelectorAll('.sb');
      vcElements.forEach((element) => {
        element.style.display = 'block';
      });
      mcElements.forEach((element) => {
        element.style.display = 'none';
      });
      sbElements.forEach((element) => {
        element.style.display = 'none';
      });
    };

    const handleEndCall = () => {
      console.log('Call ended');
      const vcElement = document.querySelectorAll('.vc');
      const mcElement = document.querySelectorAll('.mc');
      const sbElement = document.querySelectorAll('.sb');
      vcElement.forEach((element) => {
        element.style.display = 'none';
      });
      mcElement.forEach((element) => {
        element.style.display = 'block';
      });
      sbElement.forEach((element) => {
        element.style.display = 'block';
      });
    };

    socket?.on('joined-room', handleJoinedRoom);
    socket?.on('call-ended', handleEndCall); 

    return () => {
      socket?.off('joined-room', handleJoinedRoom);
      socket?.off('call-ended', handleEndCall);
    };
  }, [socket]);
};

export default useListenMessages;
