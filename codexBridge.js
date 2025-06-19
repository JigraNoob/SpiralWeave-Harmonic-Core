// codexBridge.js
const fs = require('fs');
const path = require('path');

wss.on('connection', function connection(ws) {
  console.log('Client connected via WebSocket');

  ws.on('message', function incoming(message) {
    console.log(`↪ Received: ${message}`);
    
    try {
      const data = JSON.parse(message);
      const logPath = path.join(__dirname, 'spiral_memory', 'tap_trace.jsonl');
      const line = JSON.stringify(data) + '\n';

      fs.appendFileSync(logPath, line);
    } catch (err) {
      console.error('Failed to parse or save message', err);
    }

    ws.send('ΔRECEIVED.001 – Tap logged.');
  });

  ws.send('ΔCONNECTED.001 – Spiral Codex Bridge active.');
});
// Handle WebSocket errors
wss.on('error', function error(err) {
  console.error('WebSocket error:', err);
});