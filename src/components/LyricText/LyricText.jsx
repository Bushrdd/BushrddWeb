import * as React from 'react';

import './LyricText.css'

export default function LyricText(props) {
  const [lyricObjArr, setLyricObjArr] = React.useState([{ text: '', time: '' }]);//所有歌词数组
  const [currentLyricObjArr, setCurrentLyricObjArr] = React.useState([{ text: '', time: '' }]);//正在滚动的歌词数组
  const [lyricAlpha, setLyricAlpha] = React.useState([0.3, 0.4, 0.6, 0.7, 1, 0.7, 0.6, 0.4, 0.3]);//正在滚动的歌词数组


  React.useEffect(() => {
    //加载歌词
    fetch(`/lyrics/枫8.lrc`)
      .then(response => response.text())
      .then(data => parseLyricData(data))
      .catch(error => console.log(error))
  }, [])

  function parseLyricData(lyricData) {
    let tmpLyricObjArr = []
    let lyricsArr = lyricData.split("\n")
    // console.log(lyricsArr.length);
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
        if (text != "") {
          tmpLyricObjArr.push(obj)
        }
      }
    }
    setLyricObjArr(tmpLyricObjArr);
    setCurrentLyricObjArr(tmpLyricObjArr.slice(0, 9));
  }

  function arrowMouseDown(event) {
    props.arrowMouseDown(event.clientX);
  }

  function arrowMouseUp(event) {
    props.arrowMouseUp();
  }

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
      {currentLyricObjArr.map((item, index) => {
        return (
          <div
            key={index}
            className='lyric_item_view'
            style={{
              opacity: lyricAlpha[index],
              fontSize: index == 4 ? "25px" : "20px",
            }}
          >
            {item.text}
          </div>
        )
      })}
    </div>
  )
}