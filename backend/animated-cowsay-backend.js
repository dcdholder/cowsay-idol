"use strict";

let express  = require("express");
let cors     = require("cors");

let fs       = require("fs");
let readline = require("readline");

let cowsay   = require("cowsay");

let app = express();

let directory = "./lyrics";

//required for deployment to Google Cloud Functions
exports.cowsayIdol = function cowsayIdol(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  generateCowsayFramesFromRandomFilename(res);
};

app.use(cors({origin: "*"}));
app.get('/', (req,res) => {
  res.setHeader('Content-Type', 'application/json');

  generateCowsayFramesFromRandomFilename(res);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

function generateCowsayFramesFromRandomFilename(res) {
  let lyricsFilenames = fs.readdirSync(directory);
  let filenameIndex   = Math.floor(Math.random() * lyricsFilenames.length);
  generateCowsayFramesFromFilename(res,directory + '/' + lyricsFilenames[filenameIndex]);
}

function generateCowsayFramesFromFilename(res,filename) {
  let lyricsByLine = [];
  let lineReader = readline.createInterface({
    input: fs.createReadStream(filename),
    terminal: false
  });

  let cowsayFrames = [];
  lineReader.on("line", function(line) {
    lyricsByLine.push(line);
  }).on("close", function() {
    cowsayFrames = generateCowsayFramesFromLyrics(lyricsByLine);
    res.status(200).send(JSON.stringify(cowsayFrames).replace(/\\n/g, "\\n").replace(/\\'/g, "\\'")).end();
  });
}

function generateCowsayFramesFromLyrics(lyricsByLine) {
  let cowsayFrames = [];
  for (let i=0; i<lyricsByLine.length; i++) {
    let line = lyricsByLine[i];
    let cowsayArguments;

    if (line!="") {
      cowsayArguments = {
        text: line,
        T: "U "
      }
    } else {
      cowsayArguments = {
        text: "...",
        e: "--"
      }
    }

    cowsayFrames.push(cowsay.say(cowsayArguments));
  }

  let numBufferFrames = 3;

  let bufferCowsayArguments = {
    text: "...",
    e: "--"
  }

  for (let bufferFrameIndex=0; bufferFrameIndex<numBufferFrames; bufferFrameIndex++) {
    cowsayFrames.push(cowsay.say(bufferCowsayArguments));
  }

  return cowsayFrames;
}
