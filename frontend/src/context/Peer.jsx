import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";

const PeerContext = React.createContext(null);
export const usePeer = () => useContext(PeerContext);

export const PeerProvider = (props) => {
  const peer = useMemo(() => new RTCPeerConnection(), []);
  const [remoteStream, setRemoteStream] = useState(null);

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer) => {
    if (!peer || !offer) throw new Error("Invalid Peer or Offer");
    await peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const setRemoteAnswer = async (answer) => {
    await peer.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const sendStream = (stream) => {
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  };

  useEffect(() => {
    peer.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
    return () => {
      peer.ontrack = null;
    };
  }, [peer]);

  return (
    <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream }}>
      {props.children}
    </PeerContext.Provider>
  );
};
