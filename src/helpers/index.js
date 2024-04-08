export function readFileMetaData({ src = null, isFile = false }) {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      // const video = document.createElement("video");
      // video.id = "canvas-video";
      // video.preload = "metadata";
      // video.style.display = "none";
      // document.body.appendChild(video);
      // video.onloadedmetadata = () => {
      //   resolve({
      //     arrayBuffer: reader.result,
      //     size: event.total,
      //     duration: video.duration,
      //   });
      // };
      // const blob = new Blob([reader.result], { type: file?.type || "video/mp4" });
      // video.src = URL.createObjectURL(blob);
    };
    reader.onerror = (error) => {
      reject(error);
    };

    let blob;
    if (!isFile) {
      blob = await fetchFn(src);
    }
    const video = document.createElement("video");
    video.id = "canvas-video";
    video.preload = "metadata";
    video.style.display = "none";
    document.body.appendChild(video); 
    video.onloadedmetadata = (e) => {
      resolve({
        // arrayBuffer: reader.result,
        duration: video.duration,
      });
    };
    video.onwaiting=(e)=>{
      console.log('onwaiting',e)
    }
    video.src = URL.createObjectURL(blob);
    // reader.readAsDataURL(isFile ? src : blob);
  });
}

export const secondsTohhmmss = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;
  // round seconds
  seconds = Math.round(seconds * 100) / 100;
  let result = hours === 0 ? "" : hours < 10 ? "0" + hours + ":" : hours + ":";
  result += minutes < 10 ? "0" + minutes : minutes;
  result += ":" + (seconds < 10 ? "0" + Math.floor(seconds) : Math.floor(seconds));
  return result;
};

const fetchFn = async (url) => {
  const data = await fetch(url);
  const blob = await data?.blob();
  return blob;
};
