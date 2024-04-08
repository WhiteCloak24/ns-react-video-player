import { secondsTohhmmss } from "../helpers";

let rafId = null;
let isPlaying = false;

export function loadedMetadataHandler(e) {
  const currentTimeElm = document.getElementById("current-time");
  const totalTimeElm = document.getElementById("total-time");
  if (currentTimeElm) {
    currentTimeElm.innerText = secondsTohhmmss(e?.target?.currentTime || 0);
  }
  if (totalTimeElm) {
    totalTimeElm.innerText = secondsTohhmmss(e?.target?.duration || 0);
  }
}
export function getTotalTime() {
  const videoElm = document.getElementById("video-element");
  return videoElm?.duration || 0
}
export function progressHandler(e) {
  setCurrentBufferPos(e?.target);
}
export function playVideoHandler(e) {
  const elm = document.getElementById("current-time");
  if (elm) {
    elm.innerText = secondsTohhmmss(e?.target?.currentTime || 0);
  }
}
export function playingVideoHandler(e) {
  isPlaying = true;
  updateTime();
}
export function pauseVideoHandler(e) {
  isPlaying = false;
  setCurrentThumbPos(e?.target);
  const newid = rafId;
  rafId = null;
  cancelAnimationFrame(newid);
}

function updateTime() {
  const elm = document.getElementById("current-time");
  const videoElm = document.getElementById("video-element");
  if (elm) {
    elm.innerText = secondsTohhmmss(videoElm?.currentTime || 0);
  }
  setCurrentThumbPos(videoElm);
  if (!rafId && isPlaying) {
    rafId = requestAnimationFrame(updateTime);
  }
  if (isPlaying) {
    requestAnimationFrame(updateTime);
  }
}

const setCurrentThumbPos = (videoElm) => {
  const thumbElm = document.getElementById("video-thumb");
  const seekerElm = document.getElementById("video-seeker");
  const ratio = videoElm?.currentTime / videoElm?.duration;
  thumbElm.style.width = `${seekerElm?.offsetWidth * ratio}px`;
};
const setCurrentBufferPos = (videoElm) => {
  const thumbElm = document.getElementById("video-buffering");
  const seekerElm = document.getElementById("video-seeker");
  const ratio = videoElm?.buffered.end(videoElm?.buffered?.length - 1) / videoElm?.duration;
  thumbElm.style.width = `${seekerElm?.offsetWidth * ratio}px`;
};
