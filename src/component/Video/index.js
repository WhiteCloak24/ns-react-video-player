import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import VideoContainer from "../VideoContainer";
import { loadedMetadataHandler, pauseVideoHandler, playingVideoHandler, playVideoHandler, progressHandler } from "../../eventListenerHandler";

const byteRange = "0-4000"; // Adjust the byte range as needed

const Video = ({ videoFile, canvasRef, videoUrl = "" }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState();
  const [metadata, setMetadata] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.addEventListener("loadedmetadata", loadedMetadata);
      videoRef.current.addEventListener("play", playVideoHandler);
      videoRef.current.addEventListener("pause", pauseVideo);
      videoRef.current.addEventListener("playing", playingVideo);
      videoRef.current.addEventListener("progress", progressHandler);
      // videoRef.current.addEventListener("waiting", (e) => {
      //   console.log("waiting");
      // });

      // videoRef.current.addEventListener("loadeddata", (e) => {
      //   console.log("loadeddata");
      //   // console.log("progress", videoRef.current?.buffered.end(videoRef.current?.buffered?.length - 1));
      // });
      // videoRef.current.addEventListener("seeked", (e) => {
      //   console.log("seeked");
      //   // console.log("progress", videoRef.current?.buffered.end(videoRef.current?.buffered?.length - 1));
      // });
      // videoRef.current.addEventListener("stalled", (e) => {
      //   console.log("stalled");
      //   // console.log("progress", videoRef.current?.buffered.end(videoRef.current?.buffered?.length - 1));
      // });
      // videoRef.current.addEventListener("ended", () => {
      //   console.log("ended");
      //   videoRef.current.currentTime = 0;
      //   setCurrentTime(0);
      //   setIsPlaying(false);
      //   getCurrentThumbPos(0);
      //   cancelAnimationFrame(rafId);
      // });
    }
    return () => {
      if (videoRef?.current) {
        videoRef.current.removeEventListener("loadedmetadata", loadedMetadata);
        videoRef.current.removeEventListener("play", playVideoHandler);
        videoRef.current.removeEventListener("pause", pauseVideo);
        videoRef.current.removeEventListener("playing", playingVideo);
        videoRef.current.removeEventListener("progress", progressHandler);
      }
    };
  }, [videoRef?.current, metadata]);

  function handlePlayVideo() {
    videoRef?.current?.play();
  }
  function handlePauseVideo() {
    videoRef?.current?.pause();
  }

  const handleTrackerHover = useCallback(
    (e) => {
      if (!metadata) return;
      const rect = e.target.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      let percentage = offsetX / rect.width;
      let time = metadata?.duration * percentage;
      const ref = document.getElementById("canvas-video");
      const previewRef = document.getElementById("preview-canvas");
      ref.currentTime = time;
      const videoContainer = videoRef?.current?.getBoundingClientRect();
      previewRef.style.left = e.clientX - videoContainer.left + "px";
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        ctx.drawImage(ref, 0, 0, canvasRef?.current?.width, canvasRef?.current?.height);
      }
    },
    [metadata]
  );
  function loadedMetadata(e) {
    loadedMetadataHandler(e);
  }
  function playingVideo(e) {
    setIsPlaying(true);
    playingVideoHandler(e);
  }
  function pauseVideo(e) {
    setIsPlaying(false);
    pauseVideoHandler(e);
  }
  return (
    <div className="h-1/2 w-2/4 flex relative group/video-container">
      <VideoContainer videoFile={videoFile} videoUrl={videoUrl} videoRef={videoRef} />
      <div className="hiddens absolute backdrop-blur-md bottom-0 w-full h-14  items-center justify-between px-2 rounded-md group-hover/video-container: flex animate-fade-in">
        <div
          //  onMouseMove={handleTrackerHover}
          className="absolute top-0 w-full h-3 left-0 cursor-pointer peer/video-seeker">
          <div className="flex justify-between px-1">
            <div id="video-seeker" className="w-full bg-white opacity-20 h-1 rounded-md"></div>
            <div id="video-thumb" className="absolute left-1 rounded-full h-[4px] bg-white " />
            <div id="video-buffering" className="absolute left-1 rounded-full h-[4px] bg-white opacity-30" />
          </div>
        </div>

        {/* <span id="preview-canvas" className="border hidden border-gray-300 peer-hover/video-seeker:flex absolute bottom-14">
          <canvas ref={canvasRef} width={300} height={200}></canvas>
        </span> */}
        <div id="current-time" className="text-white" />
        <div
          className="bg-white opacity-45 relative cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => {
            if (isPlaying) {
              handlePauseVideo();
            } else {
              handlePlayVideo();
            }
          }}>
          <div className="flex items-center justify-center absolute">{isPlaying ? <FaPause /> : <FaPlay />}</div>
        </div>
        <div id="total-time" className="text-white"></div>
      </div>
    </div>
  );
};

export default Video;
