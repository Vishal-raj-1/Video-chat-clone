import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../SocketContext';
import Options from '../Options/Options';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import './Meet.css';
import homeIcon1 from '../../assets/video-call.png';
import Spinner from '../../common/Spinner';
import Navbar from '../Navbar/Navbar';

const Meet = (props) => {
  const {
    callAccepted,
    name,
    myVideo,
    userVideo,
    stream,
    setStream,
    myVideoStatus,
    myMicStatus,
    userVideoStatus,
    userMicStatus,
    otherUserStream,
    otherUserName,
  } = useContext(SocketContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    if (stream) {
      myVideo.current.srcObject = stream;
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        myVideo.current.srcObject = res;
      });
  }, [loading]);

  useEffect(() => {
    if (myVideo.current) myVideo.current.srcObject = stream;
  }, [myVideoStatus]);

  useEffect(() => {
    if (userVideo.current) userVideo.current.srcObject = otherUserStream;
  }, [otherUserStream, userVideoStatus, loading]);


  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <Spinner starting />
      </div>
    );
  }
  return (
    <div className='flex-div hide-editor'>
      <div className='left'>
        <Navbar />
        <div className='video-div'>
          {' '}
          <div
            className={callAccepted ? 'video-frames ' : 'video-frames v-size'}
          >
            <div className='video-frame'>
              {stream ? (
                <>
                  {myMicStatus ? <MicIcon /> : <MicOffIcon />}
                  {myVideoStatus ? (
                    <video
                      width='250'
                      height='140'
                      className='video-ref'
                      src=''
                      ref={myVideo}
                      autoPlay
                      muted
                    ></video>
                  ) : (
                    <div className='video-ref img-bg'>
                      <img src={homeIcon1} />
                    </div>
                  )}
                  <div className='name'>{name} (you)</div>
                </>
              ) : (
                <Spinner />
              )}
            </div>

            {callAccepted && (
              <div className='video-frame'>
                {userMicStatus ? <MicIcon /> : <MicOffIcon />}
                {userVideoStatus ? (
                  <video
                    width='250'
                    height='140'
                    src=''
                    className='video-ref'
                    ref={userVideo}
                    autoPlay
                    // muted
                  ></video>
                ) : (
                  <div className='video-ref img-bg'>
                    <img src={homeIcon1} />
                  </div>
                )}
                <div className='name'>{otherUserName}</div>
              </div>
            )}
          </div>
        </div>
        <div className='bar'>
          <Options history={props.history} />
        </div>
      </div>
    </div>
  );
};

export default Meet;
