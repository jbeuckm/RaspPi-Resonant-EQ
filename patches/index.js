var midi = require('midi');
var Parser = require('midi-parser');
var msg = Parser.msg;

var input = new midi.input();
var parser = new Parser();

console.log("Available MIDI ins:");
var portCount = input.getPortCount();
for (var i=0; i<portCount; i++) {
    console.log(i+": "+input.getPortName(i));
}


input.on('message', function(deltaTime, message) {
    parser.write(message);
});

parser.on('midi', console.log);

input.openPort(1);

// Sysex, timing, and active sensing
input.ignoreTypes(false, false, false);

// Write Sound Sysex Command: F0 41 6n 21 F7


//input.closePort();

