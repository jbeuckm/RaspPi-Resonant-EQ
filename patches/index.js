var midi = require('midi');

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
var portCount = input.getPortCount();

for (var i=0; i<portCount; i++) {
    console.log(input.getPortName(i));
}


// Configure a callback.
input.on('message', function(deltaTime, message) {
    console.log('m:' + message + ' d:' + deltaTime);
});

// Open the first available input port.
input.openPort(1);

// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// For example if you want to receive only MIDI Clock beats
// you should use 
// input.ignoreTypes(true, false, true)
input.ignoreTypes(false, false, false);

// ... receive MIDI messages ...

// Close the port when done.
//input.closePort();

