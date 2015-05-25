var midi = require('midi');

var output = new midi.output();


var outPortCount = output.getPortCount();


for (var i=0; i<outPortCount; i++) {
var name = output.getPortName(0);
    console.log(name);
}

output.openPort(0);


setInterval(function(){
    sendMidi();
}, 1000);


function sendMidi() {
    console.log("send");
    output.sendMessage([176,22,1]);
}

//output.closePort();
