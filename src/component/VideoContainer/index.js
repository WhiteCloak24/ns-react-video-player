import React from "react";

const VideoContainer = ({ videoRef, videoFile, videoUrl = "" }) => {
  return (
    <video
    id="video-element"
      ref={videoRef}
      className="w-full h-full bg-black rounded-md"
      src={videoFile ? URL.createObjectURL(videoFile) : videoUrl}
      preload="metadata"
    />
  );
};

export default React.memo(VideoContainer);
