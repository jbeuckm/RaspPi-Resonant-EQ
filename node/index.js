var fs = require('fs');
var csv = require('fast-csv');
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

parser.on('midi', function(status, channel, message) {

    switch (status) {

    case msg.ctrlChg:
	console.log("Control Change ("+channel+") "+message);
	break;

    case msg.progChg:
	console.log("Program Change ("+channel+") "+message);
	break;

    }
});

input.openPort(1);

// Sysex, timing, and active sensing
input.ignoreTypes(false, false, false);

// Write Sound Sysex Command: F0 41 6n 21 F7


//input.closePort();

var stream = fs.createReadStream("data/programs.csv");

var programs = [];
var currentProgramNumber = 0;
var currentBankNumber = 0;

csv
    .fromStream(stream, {
        headers: true
    })
    .on("data", function(program){
	programs.push(program);
    })
    .on("end", function () {
	console.log("loaded programs");
	console.log(programs);

	programs.push({ 'name': 'new' });

	savePrograms();
    });


function savePrograms() {

    csv
	.writeToPath("data/bank"+currentBankNumber+".csv", 
		     programs, {headers: true})
	.on("finish", function(){
	    console.log("done!");
	});
}

