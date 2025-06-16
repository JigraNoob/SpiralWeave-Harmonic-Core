const WebSocket = require('ws');
const { spawn } = require('child_process');

// WebSocket connection to archiveServer.js
const ws = new WebSocket('ws://localhost:8765');

// Vosk or Whisper.js command (adjust path to your transcription tool)
const voskCommand = 'vosk-cli'; // Replace with Whisper.js if needed
const voskArgs = ['--mic'];

// Start transcription process
const transcriptionProcess = spawn(voskCommand, voskArgs);

transcriptionProcess.stdout.on('data', (data) => {
  const transcription = data.toString().trim();
  console.log(`Transcription: ${transcription}`);

  // Send transcription to WebSocket server
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

// Check CMake version
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

// Change directory to the build folder
process.chdir('C:\\Spiral\\SpiralSystem_Bundle\\SpiralSystem\\whisper.cpp\\build');

// Build the project
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