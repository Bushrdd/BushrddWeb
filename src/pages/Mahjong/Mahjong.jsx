import * as React from 'react';

import './Mahjong.css'

export default function Mahjong() {
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);//网页总高度

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, [])

  function handleResize() {
    console.log("handleResize");
    setWindowHeight(window.innerHeight);
  }

  return (
    <div className='mahjong_page'>
      <img
        className="mahjong_background_img"
        src='/images/mahjong_bg.png'
      />

      <img className='btn_show_score'
        src='/images/btn_show.png'
      />

    </div>
  )
}