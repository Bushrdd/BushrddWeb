import * as React from 'react';

import './MapleIcons.css'

export default function MapleIcons(props, ref) {
  const [mapleIcons, setMapleIcons] = React.useState([]);
  const [mapleIconsCount, setMapleIconsCount] = React.useState(0);//生成过的icon总数
  const [mapleIconClasses, setMapleIconsClasses] = React.useState([]);
  const playMapleIconCount = 60;

  React.useEffect(() => {
    resetMapleIcon();

    return () => {
    };
  }, [])

  function resetMapleIcon() {
    let tmpMapleIcons = [];
    let tempCount = mapleIconsCount;
    for (var i = 0; i < playMapleIconCount; i++) {
      tmpMapleIcons.push(getNewMapleIconObj(tempCount));
      tempCount++;
    }
    setMapleIcons(tmpMapleIcons);
    setMapleIconsCount(tempCount);
    // console.log("初始化" + playMapleIconCount + "个icon：");
    // console.log(tmpMapleIcons);
  }

  function handleTransitionEnd(element) {
    // console.log("icon-" + element.target.id + '的动画播放结束啦！');
    // console.log(element);
    let arr = JSON.parse(JSON.stringify(mapleIcons));
    let index = getIndexById(arr, element.target.id);
    if (index == -1) {
      return;
    }
    arr.splice(index, 1);//移除旧的
    let newId = mapleIconsCount;
    arr.push(getNewMapleIconObj(newId));//添加一个新的
    // console.log("除旧" + element.target.id + "迎新" + newId);
    // console.log(arr);

    if (props.isPlaying) {
      let newIndex = getIndexById(arr, newId - 1);
      let objPlay = arr[newIndex];
      // console.log("播放 icon-" + objPlay.id);
      // console.log(objPlay);
      updatePlayMapleIconObj(objPlay, newIndex);
    }
    setMapleIcons(arr);
    setMapleIconsCount(newId + 1);
  }


  function playIcons() {
    let tempmapleIcons = JSON.parse(JSON.stringify(mapleIcons));
    // console.log(mapleIcons);
    for (var i = 0; i < playMapleIconCount - 1; i++) {
      updatePlayMapleIconObj(tempmapleIcons[i], i);
    }
    // console.log(tempmapleIcons);
    setMapleIcons(tempmapleIcons);
  }

  function stopIcons() {
    setMapleIcons([]);
    resetMapleIcon();
  }

  function getNewMapleIconObj(id) {
    return getMapleIconObj(id, 0, 0, 0, 0, 0, 1);
  }

  function getMapleIconObj(id, x, y, duration, delay, rotate, alpha) {
    let obj = {};
    obj.id = id;
    obj.X = x;
    obj.Y = y;
    obj.transitionDuration = duration;
    obj.delay = delay;
    obj.rotate = rotate;
    obj.alpha = alpha;

    return obj;
  }

  function updatePlayMapleIconObj(obj, index) {
    let angle = Math.random() * Math.PI * 2//0~2π
    obj.X = Math.cos(angle) * 150;//-150~150
    obj.Y = Math.sin(angle) * 150;
    obj.alpha = 0;
    obj.rotate = Math.random() * 721 + 180;//180~900
    obj.transitionDuration = Math.random() * 2001 + 1500;//1500~3000
    if (index < playMapleIconCount / 2) {//前一半
      obj.delay = 0;
    } else {
      obj.delay = 0;
    }
    return obj;
  }

  function getIndexById(arr, id) {
    for (var i = 0; i < arr.length; i++) {
      if (id == arr[i].id) {
        return i;
      }
    }
    return -1;
  }

  React.useImperativeHandle(ref, () => ({
    playIcons, stopIcons,
  }));

  return (
    <div className='maple_icon_view'>
      {mapleIcons.map((item, index) => {
        return (
          <img
            id={item.id}
            key={item.id}
            alt=''
            className="maple_icon"
            src='/images/maple_icon.png'
            onTransitionEnd={handleTransitionEnd}
            style={{
              transitionDuration: `${item.transitionDuration}ms`,
              opacity: `${item.alpha}`,
              transitionDelay: `${item.delay}ms`,
              transform: `translate(${item.X}px,${item.Y}px) rotate(${item.rotate}deg)`
            }}
          />
        )
      })}
    </div >
  )
}
MapleIcons = React.forwardRef(MapleIcons);