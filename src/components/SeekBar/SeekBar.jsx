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
    <div className='seekBar'>
      <div
        className='active'
        style={{ width: `${props.activeWidth}%` }} />
      <img
        className='arrow'
        onMouseDown={arrowMouseDown}
        draggable={true}
        style={{ marginLeft: `${props.marginLeft}%` }}
        src='/images/seekbar_arrow.png' />
      <div className='background' />
    </div >
  )
}