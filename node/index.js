#!/usr/bin/env node

var patchManager = require('./lib/patch-manager.js');

var Q = require('q');
var program = require('commander');

var midi = require('midi');
var Parser = require('midi-parser');
var MIDI_MESSAGE = Parser.msg;

var input = new midi.input();
var parser = new Parser();


var output = new midi.output();
output.openVirtualPort("Patch Manager");



input.on('message', function (deltaTime, message) {
    parser.write('message:');
    parser.write(message);
});

parser.on('midi', function (status, channel, message) {

    switch (status) {

        case MIDI_MESSAGE.ctrlChg:
//	console.log("Control Change ("+channel+") "+message);
            handleControllerMessage(message);
            break;

        case MIDI_MESSAGE.progChg:
//	console.log("Program Change ("+channel+") "+message);
            var patch = patchManager.setProgramNumber(message);
            sendPatchToMidiOut(patch);
            break;

        case MIDI_MESSAGE.startSysex:
            startSysex(message);
            break;

        case MIDI_MESSAGE.endSysex:
            endSysex(message);
            break;

    }
});



function sendPatchToMidiOut(patch) {

    for (var i in patch.controllers) {
        sendMidiController(parseInt(i), patch.controllers[i]);
    }
}

function sendMidiController(number, value) {
    output.sendMessage([MIDI_MESSAGE.ctrlChg, number, value]);
}


function startSysex(message) {
    console.log(message);
}

function endSysex(message) {
    console.log(message);
}



function handleControllerMessage(message) {
    console.log("handleControllerMessage with " + message);
    console.log(typeof message);

    switch (message[0]) {

        case 0:
            patchManager.setBankNumber(message[1]);
            break;

        default:
            patchManager.updateController(message[0], message[1]);
            break;
    }

    // thru
    sendMidiController(message[0], message[1]);
}


program
    .version('0.0.1')
    .option('-i, --interface [number]', 'Select MIDI interface')
    .option('-c, --channel [number]', 'Respond to MIDI channel [1]', 1)
    .parse(process.argv);



console.log("opening MIDI interface " + program.interface);
input.openPort(parseInt(program.interface));
// Sysex, timing, and active sensing
input.ignoreTypes(false, true, false);



function listenForKeys() {
    var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);

// listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {

        // ctrl-c ( end of text )
        if (key === '\u0003') {
            process.exit();
        }

        switch (key && key.name) {
            case 's':
                patchManager.saveCurrentPatch();
                break;
        }

    });

}

listenForKeys();

