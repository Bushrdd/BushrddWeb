import * as React from 'react';
import SeekBar from '../../components/SeekBar/SeekBar';
import { Slider } from 'antd';

import './SongPlayer.css'
import LyricText from '../../components/LyricText/LyricText';

export default function SongPlayer() {
  const coverRef = React.createRef();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);//网页总宽度
  const [coverClass, setCoverClass] = React.useState(['cover']);//封面样式
  const [btnPlayClass, setBtnPlayClass] = React.useState(['button', 'play']);//开始按钮样式
  const [isRotate, setIsRotate] = React.useState(false);//封面是否旋转
  const [isPlaying, setIsPlaying] = React.useState(false);//是否在播放
  const [isMoving, setIsMoving] = React.useState(false);//是否在拖动进度条
  const [startX, setStartX] = React.useState(0);//拖动进度条时的起始位置
  const [marginLeft, setMarginLeft] = React.useState(0);//拖动进度条时上次位置
  const [currentMarginLeft, setCurrentMarginLeft] = React.useState(0);//拖动进度条时当前位置
  const [activeWidth, setActiveWidth] = React.useState(0);//已播放长度


  function clickCover() {
    if (isRotate) {//暂停旋转

    } else {//开始旋转

    }
  }

  function btnPlay() {
    if (isPlaying) {//暂停
      setBtnPlayClass(['button', 'play']);
      setIsPlaying(false);
      setCoverClass(['cover', 'rotate', 'pause']);
      setIsRotate(false);
    } else {//继续
      setBtnPlayClass(['button', 'pause']);
      setIsPlaying(true);
      setCoverClass(['cover', 'rotate']);
      setIsRotate(true);
    }
  }

  function arrowMouseDown(x) {
    // console.log("arrowMouseDown: " + x)
    setIsMoving(true);
    setStartX(x);
  }

  function arrowMouseUp() {
    setIsMoving(false);
    setMarginLeft(currentMarginLeft);
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

  return (
    <div className='page' onMouseUp={arrowMouseUp} onMouseMove={handleMouseMove}>
      <img ref={coverRef} className={coverClass.join(' ')} onClick={clickCover} src='/images/maple.jpg' />
      <LyricText></LyricText>
      <div className='progress_bar_view'>
        <div className='button_view'>
          <div className={btnPlayClass.join(' ')} onClick={btnPlay} />
        </div>
        <div className='song_current_time_view'>00:00</div>
        <SeekBar
          arrowMouseDown={arrowMouseDown}
          marginLeft={currentMarginLeft}
          activeWidth={activeWidth}
        />
        <div className='song_position_view'>03:24</div>
      </div>
    </div >
  )
}