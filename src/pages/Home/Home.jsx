import React from 'react';
import ReactDOM from 'react-dom/client';
import './Home.css';

export default function Home() {
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);//网页总高度

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleResize() {
    console.log("handleResize");
    setWindowHeight(window.innerHeight);
  }

  return (
    <div className='page' style={{ height: `${windowHeight}px` }}>
      <img className='background_img' src='/images/home_bg.jpg' />
      <a href="https://beian.miit.gov.cn/"
        className='force_url'
      >By Bushrdd - 冀ICP备2023010586号</a>
    </div>
  )
}