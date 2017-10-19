let frameTime = 2000;
let currentFrameIndex = 0;

let xhr = new XMLHttpRequest();
xhr.open('GET', apiUrl, true);
xhr.send();
xhr.addEventListener("readystatechange", startAnimationLoopHandler, false)

function startAnimationLoopHandler(e) {
  if (xhr.readyState==4) {
    startAnimationLoop(JSON.parse(xhr.responseText));
  }
}

function startAnimationLoop(cowsayFrames) {
  displayNextFrame(cowsayFrames) //immediately show the first frame -- otherwise nothing would show up for frameTime
  setInterval(() => {displayNextFrame(cowsayFrames)},frameTime);
}

function displayNextFrame(cowsayFrames) {
  document.getElementById("cowsaytext").innerHTML = cowsayFrames[currentFrameIndex].replace(/ /g, '&nbsp;').replace(/(?:\r\n|\r|\n)/g, '<br />');

  if (currentFrameIndex==cowsayFrames.length-1) {
    currentFrameIndex=0;
  } else {
    currentFrameIndex++;
  }
}
