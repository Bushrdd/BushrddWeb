import * as React from 'react';

import './LyricText.css'

export default function LyricText(props, ref) {
  const [lyricObjArr, setLyricObjArr] = React.useState([{ text: '', time: '' }]);//所有歌词数组
  // const [currentLyricObjArr, setCurrentLyricObjArr] = React.useState([{ text: '', time: '' }]);//正在滚动的歌词数组
  // const [lyricAlpha, setLyricAlpha] = React.useState([0.3, 0.4, 0.6, 0.7, 1, 0.7, 0.6, 0.4, 0.3]);//正在滚动的歌词数组透明度
  const [currentLyricObj, setCurrentLyricObj] = React.useState({ text: '', time: '' });//正在滚动的歌词
  const [currentLineIndex, setCurrentLineIndex] = React.useState(4);//当前播放的行标，前四行空格所以4开始
  // const [lyricObjArr, setLyricObjArr] = React.useState([{ text: '', time: '' }]);//所有歌词数组
  // const URL = `/lyrics/枫8.lrc`;
  const URL = `http://web.bushrdd.cn/lyrics/暗号.lrc`;



  React.useEffect(() => {
    //加载歌词
    fetch(URL, {})
      .then(response => response.text())
      .then(data => parseLyricData(data))
      .catch(error => console.log(error))
  }, [])

  function parseLyricData(lyricData) {
    // console.log(lyricData)
    let tmpLyricObjArr = []
    let lyricsArr = lyricData.split("\n")
    // for (var j = 0; j < 4; j++) {//占位
    //   let obj = {}
    //   obj.time = 0;
    //   obj.text = " ";
    //   tmpLyricObjArr.push(obj)
    // }
    for (let i = 0; i < lyricsArr.length; i++) {
      if (lyricsArr[i].indexOf('[') == 0) {
        let obj = {}
        let midCharIndex = lyricsArr[i].indexOf(']')
        let timeString = lyricsArr[i].substring(1, midCharIndex)
        let timeSeconds = stringToSeconds(timeString)
        if (timeSeconds !== timeSeconds) {
          //不是时间
          continue;
        }
        let text = lyricsArr[i].substring(midCharIndex + 1, lyricsArr[i].length);
        obj.time = timeSeconds;
        obj.text = text == "" ? "-" : text;
        // console.log(obj)
        if (text != "") {
          tmpLyricObjArr.push(obj)
        }
      }
    }
    for (var j = 0; j < 4; j++) {
      let obj = {}
      obj.time = 1000;
      obj.text = " ";
      tmpLyricObjArr.push(obj)
    }
    console.log("歌词：")
    console.log(tmpLyricObjArr)
    setLyricObjArr(tmpLyricObjArr);
    // setCurrentLyricObjArr(tmpLyricObjArr.slice(0, 9));
    setCurrentLyricObj(tmpLyricObjArr[0]);
  }

  const updateLyric = (currentTime) => {
    // console.log("currentTime: " + currentTime);
    if (currentTime == 0) {
      setCurrentLineIndex(0);
      setCurrentLyricObj(lyricObjArr[0]);
    }
    for (var i = 0; i < lyricObjArr.length; i++) {
      if (lyricObjArr[i + 1].time <= currentTime) {//播放时间到达下一行时间之后了，换行
        let nextLineIndex = i + 1;
        if (lyricObjArr[nextLineIndex + 1].time > currentTime) {
          setCurrentLineIndex(nextLineIndex);
          // setCurrentLyricObjArr(lyricObjArr.slice(nextLineIndex - 4, nextLineIndex + 5));
          setCurrentLyricObj(lyricObjArr[nextLineIndex]);
          break;
        }
      } else {
        break;
      }
    }
  }

  React.useImperativeHandle(ref, () => ({
    updateLyric,
  }));

  //分:秒转换为秒数
  const stringToSeconds = (timeString) => {
    let indexMidChar = ("" + timeString).indexOf(':')
    if (indexMidChar === -1) {
      //没有':'
      return;
    }
    const minute = timeString.substring(0, indexMidChar)
    const second = timeString.substring(indexMidChar + 1, timeString.length)
    return minute * 60 + second * 1
  }

  return (
    <div className='lyric_view'>
      {/* {currentLyricObjArr.map((item, index) => {
        return (
          <div
            key={index}
            className='lyric_item_view'
            style={{
              opacity: lyricAlpha[index],
              fontSize: index == 4 ? "1.65vw" : "1.2vw",
            }}
          >
            {item.text}
          </div>
        )
      })} */}
      <div
        className='lyric_item_view'
        style={{
        }}
      >
        {currentLyricObj.text}
      </div>
    </div>
  )
}
LyricText = React.forwardRef(LyricText);