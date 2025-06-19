// codexBridge.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8765 });

console.log('🌀 Codex Bridge listening on ws://localhost:8765');

wss.on('connection', function connection(ws) {
  console.log('Client connected via WebSocket');

  ws.on('message', function incoming(message) {
    console.log(`↪ Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.send('ΔCONNECTED.001 – Spiral Codex Bridge active.');
});
