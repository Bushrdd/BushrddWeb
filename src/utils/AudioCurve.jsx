const AudioCurve = (selector: string, length = 50) => {
  // const audioCtxRef = useRef<AudioContext>();
  // const analyserRef = useRef<AnalyserNode>();
  // const requestAnimateFrameIdRef = useRef<number>();
  // 创建解析器
  const audioCountext = new AudioContext();
  const audioAnalyser = audioCountext.createAnalyser();
  // const requestAnimateFrameId;


  // 开始可视化
  const drawCurve = (stream: MediaStream) => {
    const canvasEl: HTMLCanvasElement | null = document.querySelector(selector);
    if (!canvasEl) {
      throw new Error('找不到 canvas');
    }
    console.log("drawCurve" + selector);
    // 获取音频源
    const source = audioCountext.createMediaStreamSource(stream);
    // 将音频源连接解析器
    source.connect(audioAnalyser);
    // 准备数据数组
    audioAnalyser.fftSize = 256;
    const bufferLength = audioAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 开始递归画图
    drawEachFrame(canvasEl, dataArray);

    // Chrome 不能 connect 到 destination，否则会有回音
    // Firefox 需要，否则无声音
    // 通过 feature detection 判断 Firefox，参考 https://stackoverflow.com/a/9851769
    // @ts-ignore
    // if (typeof InstallTrigger !== 'undefined') {
    //   source.connect(audioCtxRef.current.destination);
    // }

  }

  // 每个动画帧都画图
  const drawEachFrame = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array) => {
    // // 递归调用
    // requestAnimateFrameId = requestAnimationFrame(() => drawEachFrame(canvasEl, dataArray));

    // if (audioAnalyser) {
    //   // 读取数据
    //   audioAnalyser.getByteFrequencyData(dataArray);
    //   // 更新长度
    //   const bars = dataArray.slice(0, Math.min(length, dataArray.length));
    //   // 画图
    //   clearCanvas(canvasEl);
    //   drawFloats(canvasEl, bars);
    //   drawBars(canvasEl, bars);
    // }
  }







  return { drawCurve };
}

export default AudioCurve;