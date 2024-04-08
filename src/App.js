import { useRef, useState } from "react";
import Video from "./component/Video";

const dummyVideo = "https://videos.pexels.com/video-files/3121459/3121459-uhd_3840_2160_24fps.mp4";

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const canvasRef = useRef();
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Video videoFile={videoFile} videoUrl={dummyVideo} canvasRef={canvasRef} />
    </div>
  );
}

export default App;
