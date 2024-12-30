import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSocketContext } from '../../context/SocketContext';
import { usePeer } from '../../context/Peer';
import { useNavigate } from 'react-router-dom';

const Videocall = () => {
  const { socket } = useSocketContext();
  const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream,remoteStream} = usePeer();
  const [myStream, setMyStream] = useState(null);
  const [remoteUserId, setRemoteUserId] = useState(null);
  // const [remoteStream, setRemoteStream] = useState();

  const navigate = useNavigate();

  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setMyStream(stream);
      sendStream(stream);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }, [sendStream]);

  const stopUserMediaStream = useCallback(() => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
    }
  }, [myStream]);

  const handleStartCall = useCallback(async () => {
    await getUserMediaStream();
  }, [getUserMediaStream]);

  const handleEndCall = useCallback(() => {
    socket.emit('call-ended'); 
    stopUserMediaStream(); 
    const vcElements = document.querySelectorAll('.vc');
    const mcElements = document.querySelectorAll('.mc');
    const sbElements = document.querySelectorAll('.sb');
    vcElements.forEach((element) => {
      element.style.display = 'none';
    });
    mcElements.forEach((element) => {
      element.style.display = 'block';
    });
    sbElements.forEach((element) => {
      element.style.display = 'block';
    });
  }, [socket, stopUserMediaStream]);
  

  const handleUserJoined = useCallback(
    async (data) => {
      const { userId } = data;
      console.log('New user joined:', userId);
      await handleStartCall();
      const offer = await createOffer();
      socket.emit('call-user', { userId, offer });
      setRemoteUserId(userId);
    },
    [createOffer, handleStartCall, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log('Incoming Call from', from, 'offer:', offer);
      if (!myStream) await handleStartCall();
      const ans = await createAnswer(offer);
      socket.emit('call-accepted', { userId: from, ans });
      setRemoteUserId(from)
    },
    [createAnswer, handleStartCall, myStream, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log('Call Accepted:', ans);
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer]
  );

  useEffect(() => {
    socket?.on('user-joined', handleUserJoined);
    socket?.on('incoming-call', handleIncomingCall);
    socket?.on('call-accepted', handleCallAccepted);
    socket?.on('call-ended', handleEndCall);

    return () => {
      socket?.off('user-joined', handleUserJoined);
      socket?.off('incoming-call', handleIncomingCall);
      socket?.off('call-accepted', handleCallAccepted);
      // socket?.off('call-ended', handleEndCall);
      stopUserMediaStream(); 
    };
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleEndCall, stopUserMediaStream]);

  const handleNegotiation=useCallback(()=>{
    const localOffer= peer.createOffer();
    socket?.emit('call-user',{userId:remoteUserId,offer:localOffer})
},[peer])

useEffect(()=>{
  peer.addEventListener('negotiationneeded',handleNegotiation)
  return () => {
    peer.removeEventListener('negotiationneeded', handleNegotiation);
}
},[peer,handleNegotiation])

// useEffect(() => {
//   peer?.peer?.addEventListener("track", async (ev) => {
//     const remoteStream = ev.streams;
//     console.log("GOT TRACKS!!");
//     setRemoteStream(remoteStream[0]);
//   });
// }, []);

  return (
    <div
      className="h-100 w-100 border-red-400 vc"
      style={{ display: myStream ? 'block' : 'none', zIndex: 1000 }}
    >
      {myStream ? (
        <div>
          <h3>Connected to {remoteUserId}</h3>
          <ReactPlayer
            url={myStream}
            playing
            muted
            height="100px"
            width="200px"
          />
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
          <button
            onClick={handleEndCall}
            style={{ padding: '10px', marginTop: '20px', backgroundColor: 'red', color: 'white' }}
          >
            End Call
          </button>
        </div>
      ) : (
        <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'red',
            fontSize: '18px',
          }}
          >
          Waiting for another user to join... 
        </div>
        <button
        onClick={handleEndCall}
        style={{ padding: '10px', marginTop: '20px', backgroundColor: 'red', color: 'white' }}
        >End Call</button>
        </>
      )}
    </div>
  );
};

export default Videocall;
