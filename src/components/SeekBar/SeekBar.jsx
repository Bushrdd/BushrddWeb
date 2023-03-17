import * as React from 'react';

import './SeekBar.css'

export default function SeekBar(props) {

  function arrowMouseDown(event) {
    props.arrowMouseDown(event.clientX);
  }

  function arrowMouseUp(event) {
    props.arrowMouseUp();
  }

  return (
    <view className='seekBar'>
      <view
        className='active'
        style={{ width: `${props.activeWidth}%` }} />
      <img
        className='arrow'
        onMouseDown={arrowMouseDown}
        draggable={true}
        style={{ marginLeft: `${props.marginLeft}%` }}
        src='/images/seekbar_arrow.png' />
      <view className='background' />
    </view >
  )
}