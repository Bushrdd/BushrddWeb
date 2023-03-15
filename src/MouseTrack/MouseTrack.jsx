import * as React from 'react';
import { HeartTwoTone } from '@ant-design/icons'
import { xs } from './xs'
import { ys } from './ys'

import './MouseTrack.css'

export default function MouseTrack() {

  const [pageSize, setPageSize] = React.useState({ width: 0, height: 0 });
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [rotates, setRotates] = React.useState([]);

  // let space = 16;

  const hearts = new Array(198);
  hearts.fill(0);
  // const xs = new Array(198);
  // hearts.fill(0);
  // const ys = new Array(198);
  // hearts.fill(0);



  window.onload = () => {
    setPageSize({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    })
  }

  const handleResize = (value) => {
    console.log('value:', value);
  }

  const mouseMove = (data) => {
    // console.log('X:', data.pageX, 'Y:', data.pageY,);

    const arrowsRotate = hearts.map((_, index) => {

      let arrowWidth = document.getElementById(index).offsetWidth;
      let arrowHeight = document.getElementById(index).offsetHeight;
      let arrowX = document.getElementById(index).offsetLeft + arrowWidth / 2;
      let arrowY = document.getElementById(index).offsetTop + arrowHeight / 2;
      let mouseX = data.pageX;
      let mouseY = data.pageY;
      let x = arrowX - mouseX;
      let y = arrowY - mouseY;
      if (x < 0 && y > 0) {
        //第一象限
        return 0 - (Math.atan2(x, y) * 180 / Math.PI);
      } else if (x > 0 && y > 0) {
        //第二象限
        return Math.atan2(-x, y) * 180 / Math.PI;
      } else if (x > 0 && y < 0) {
        //第三象限
        return 0 - (Math.atan2(-y, x) * 180 / Math.PI + 90);
      } else if (x < 0 && y < 0) {
        //第四象限
        return Math.atan2(-y, -x) * 180 / Math.PI + 90;
      }
    })
    setRotates(arrowsRotate);
  }

  return (
    <div className='page' onMouseMove={mouseMove} >
      <div className='arrows'>
        {hearts.map((_, index) => {
          return (
            <HeartTwoTone id={index} style={{position:'absolute', marginLeft: xs[index] * 16, marginTop: ys[index] * 22, transform: `rotate(${rotates[index]}deg)` }} />
          )
        })}
      </div>
    </div>
  )
}