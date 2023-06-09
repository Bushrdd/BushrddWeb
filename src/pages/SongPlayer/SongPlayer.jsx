import * as React from 'react';
import SeekBar from '../../components/SeekBar/SeekBar';
import { Slider, message } from 'antd';
import Lottie from "react-lottie";
import loadAnim from "./loading.json";
// import { drawCurve } from "../../utils/AudioCurve";

import './SongPlayer.css'
import LyricText from '../../components/LyricText/LyricText';
import MapleIcons from '../../components/MapleIcons/MapleIcons';
import AudioCurve from "../../utils/AudioCurve";

export default function SongPlayer() {
  const { drawCurve } = AudioCurve('zxddddd', 50);
  const [toast, contextHolder] = message.useMessage();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);//网页总宽度
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);//网页总高度
  const [coverClass, setCoverClass] = React.useState(['cover_image']);//封面样式
  const [btnPlayClass, setBtnPlayClass] = React.useState(['button', 'play']);//开始按钮样式
  const [isRotate, setIsRotate] = React.useState(false);//封面是否旋转
  const [currentPosition, setCurrentPosition] = React.useState("00:00");//已播时长
  const [songDuration, setSongDuration] = React.useState(0);//总时长
  // const [isPlaying, setIsPlaying] = React.useState(false);//是否在播放
  const [songStatus, setSongStatus] = React.useState(0);//歌曲当前状态
  const [isMoving, setIsMoving] = React.useState(false);//是否在拖动进度条
  const [startX, setStartX] = React.useState(0);//拖动进度条时的起始位置
  const [marginLeft, setMarginLeft] = React.useState(0);//拖动进度条时上次位置
  const [currentMarginLeft, setCurrentMarginLeft] = React.useState(0);//拖动进度条时当前位置
  const [activeWidth, setActiveWidth] = React.useState(0);//已播放长度
  const [songSrc, setSongSrc] = React.useState("");//歌曲路径
  const [lyricUrl, setLyricUrl] = React.useState("");//歌词路径
  const [audio, setAudio] = React.useState(null);//播放器
  const [loadFinish, setLoadFinish] = React.useState(false);//是否加载完成
  const lyricRef = React.useRef({});
  const MapleIconRef = React.useRef({});
  const SONG_STATE_IDLE = 0;
  const SONG_STATE_PLAYING = 1;
  const SONG_STATE_PAUSED = 2;
  // const URL = "/songs/枫.mp3";
  // const URL = "/songs/很久很久.mp3";
  const SongApi = "http://bushrdd.cn:8368/getSongList";
  // const SongApi = "http://localhost:8368/getSongList";
  // const URL = "http://web.bushrdd.cn/songs/%E6%9A%97%E5%8F%B7.mp3";

  React.useEffect(() => {
    // setSongSrc(URL);
    window.addEventListener('resize', handleResize);
    document.title = '为什么那天我做梦又梦到你'

    // const formData = new URLSearchParams();
    // formData.append('username', 'ccc');
    // formData.append('password', '456');

    fetch(SongApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 可根据需要添加其他请求头部信息
      },
      // body: JSON.stringify({'username': 'ccc','password':'456' }) // 根据需要设置请求体数据
      // body: JSON.stringify({ username: 'ccc', password: '456' }) // 根据需要设置请求体数据
      // body: formData
    })
      .then(response => response.json())
      .then(data => {
        // 处理返回的数据
        console.log(data);
        var songs = data.data;
        for (var i = 0; i < songs.length; i++) {
            if(songs[i].today == 1){
            setSongSrc(songs[i].songUrl);
            setLyricUrl(songs[i].lyricUrl)
            setLoadFinish(true);
            break;
          }
        }
      })
      .catch(error => {
        // 处理错误
        console.error(error);
      });

    return () => {
      window.removeEventListener('resize', handleResize)
      if (audio == null) {
        return;
      }
      audio.pause();
      audio.currentTime = 0;
    };
  }, [])

  function handleResize() {
    console.log("handleResize");
    setWindowHeight(window.innerHeight);
  }

  function onCanPlay(event) {
    if (songStatus != SONG_STATE_IDLE) {
      return;
    }
    console.log("onCanPlay:");
    console.log(event);
    setSongDuration(event.target.duration);
    setAudio(event.target);
    event.target.play();
    setSongStatus(SONG_STATE_PLAYING);

    // let audioStream = event.target.captureStream();
    // console.log(audioStream);
    // drawCurve(audioStream);
  }

  function handleOnPlay(event) {
    console.log("onPlay:");
    console.log(event);
  }

  function handleOnPlaying(event) {
    console.log("onPlaying:");
    console.log(event);
  }

  function onTimeUpdate(event) {

    let currentTime = event.target.currentTime;
    setCurrentPosition(secondsToString(currentTime));//更新已播时长
    if (currentTime == 0) {//刚加载时调用onTimeUpdate不执行updateLyric
      return;
    }
    let currrntPercent = currentTime / songDuration / 2 * 100;
    if (!isMoving) {
      setMarginLeft(currrntPercent);//更新进度条
      setCurrentMarginLeft(currrntPercent);
    }
    var delay = 0.3;//加速歌词(s)
    lyricRef.current.updateLyric(currentTime + delay);
  }

  function onEnded(event) {
    if (audio == null) {
      toast.open({
        type: 'error',
        content: '歌曲加载失败！',
        duration: 1,
      });
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    setBtnPlayClass(['button', 'play']);
    setSongStatus(SONG_STATE_PAUSED);
    setCoverClass(['cover_image', 'rotate', 'pause']);
    setIsRotate(false);
    setMarginLeft(0);//更新进度条
    setCurrentMarginLeft(0);
    lyricRef.current.updateLyric(0);
  }

  function clickCover() {
  }

  function btnPlay() {
    if (songStatus == SONG_STATE_PLAYING) {//暂停
      audio.pause();
      console.log(audio);
      setBtnPlayClass(['button', 'play']);
      setSongStatus(SONG_STATE_PAUSED);
      setCoverClass(['cover_image', 'rotate', 'pause']);
      MapleIconRef.current.stopIcons();
      setIsRotate(false);
    } else {//继续
      if (audio == null) {//未加载
        document.getElementById('audio').load();
      } else {
        audio.play();
        setSongStatus(SONG_STATE_PLAYING);
      }
      setBtnPlayClass(['button', 'pause']);
      setCoverClass(['cover_image', 'rotate']);
      MapleIconRef.current.playIcons();
      setIsRotate(true);
    }
  }

  function arrowMouseDown(x) {
    // console.log("arrowMouseDown: " + x)
    setIsMoving(true);
    setStartX(x);
  }

  function arrowMouseUp() {
    if (!isMoving) {
      return;
    }
    if (audio == null) {
      toast.open({
        type: 'error',
        content: '歌曲加载失败！',
        duration: 1,
      });
      setCurrentMarginLeft(0);
      setMarginLeft(0);
      return;
    }
    setIsMoving(false);
    setMarginLeft(currentMarginLeft);
    let songPercent = currentMarginLeft * 2;
    audio.currentTime = songDuration * songPercent / 100;
  }

  function handleMouseMove(event) {
    event.preventDefault();
    if (!isMoving) {
      return;
    }
    let currentX = event.clientX;
    let moveX = currentX - startX;
    let movePercent = moveX / windowWidth * 100;
    // console.log("moveX: " + moveX);
    // console.log("movePercent: " + movePercent);
    // console.log("marginLeft: " + marginLeft);
    let currentPercent = marginLeft + movePercent;
    if (currentPercent < 0) {
      setCurrentMarginLeft(0);
      setActiveWidth(0);
    } else if (currentPercent > 50) {
      setCurrentMarginLeft(50);
      setActiveWidth(100);
    } else {
      setCurrentMarginLeft(marginLeft + movePercent);
      setActiveWidth((marginLeft + movePercent) * 2);
    }
  }

  //秒数转换为分:秒
  const secondsToString = (timeSeconds) => {
    const minute = Math.floor(timeSeconds / 60)
    const second = Math.round(timeSeconds % 60)
    return (minute < 10 ? '0' : '') + minute + ':' + (second < 10 ? '0' : '') + second
  }

  return (
    <div
      className='song_page'
      onMouseUp={arrowMouseUp}
      onMouseMove={handleMouseMove}
      style={{ height: `${windowHeight}px` }}
    >
      <img
        className="song_background_img"
        src='/images/bg.jpg'
      />

      {contextHolder}
      {loadFinish ? (
        <div>
          <div className='cover_view'>
            <img
              alt=''
              className={coverClass.join(' ')}
              onClick={clickCover}
              src='/images/maple_cover.jpg'
            />
            <MapleIcons ref={MapleIconRef} isPlaying={songStatus == SONG_STATE_PLAYING} />
          </div>

          <LyricText ref={lyricRef} lyricUrl={lyricUrl}/>

          <audio
            id='audio'
            src={songSrc}
            preload="none"
            autoPlay={false}
            onCanPlay={onCanPlay}
            onPlay={handleOnPlay}
            onPlaying={handleOnPlaying}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
          />

          <div className='progress_bar_view'>
            <div className='button_view' onClick={btnPlay} >
              <div className={btnPlayClass.join(' ')} />
            </div>

            <div className='song_current_time_view'>{currentPosition}</div>
            <SeekBar
              arrowMouseDown={arrowMouseDown}
              marginLeft={currentMarginLeft}
              activeWidth={currentMarginLeft * 2}
            />
            <div className='song_position_view'
              style={{ visibility: songStatus == SONG_STATE_IDLE ? "hidden" : "" }}>{secondsToString(songDuration)}</div>

          </div>
        </div >
      ) : (
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loadAnim,
            // rendererSettings: {
            //   preserveAspectRatio: 'xMidYMid slice'
            // }
          }} />

      )}
    </div>
  )
}