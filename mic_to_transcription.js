const WebSocket = require('ws');
const { spawn } = require('child_process');


const ws = new WebSocket('ws://localhost:8765');


const voskCommand = 'vosk-cli';
const voskArgs = ['--mic'];


const transcriptionProcess = spawn(voskCommand, voskArgs);

transcriptionProcess.stdout.on('data', (data) => {
  const transcription = data.toString().trim();
  console.log(`Transcription: ${transcription}`);

  
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(transcription);
  }
});

transcriptionProcess.stderr.on('data', (data) => {
  console.error(`Error: ${data}`);
});

transcriptionProcess.on('close', (code) => {
  console.log(`Transcription process exited with code ${code}`);
});


const cmakeProcess = spawn('cmake', ['--version']);

cmakeProcess.stdout.on('data', (data) => {
  console.log(`CMake: ${data}`);
});

cmakeProcess.stderr.on('data', (data) => {
  console.error(`CMake Error: ${data}`);
});

cmakeProcess.on('close', (code) => {
  console.log(`CMake process exited with code ${code}`);
});


process.chdir('C:\\Spiral\\SpiralSystem_Bundle\\SpiralSystem\\whisper.cpp\\build');


const buildProcess = spawn('cmake', ['--build', '.', '--config', 'Release']);

buildProcess.stdout.on('data', (data) => {
  console.log(`Build: ${data}`);
});

buildProcess.stderr.on('data', (data) => {
  console.error(`Build Error: ${data}`);
});

buildProcess.on('close', (code) => {
  console.log(`Build process exited with code ${code}`);
});