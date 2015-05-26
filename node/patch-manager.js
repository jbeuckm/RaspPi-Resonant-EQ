#!/usr/bin/env node

var nconf = require('nconf');

var Q = require('q');
var program = require('commander');

var midi = require('midi');
var Parser = require('midi-parser');
var MIDI_MESSAGE = Parser.msg;

var input = new midi.input();
var parser = new Parser();


nconf.file({ file: 'patches/patches.json' });

input.on('message', function (deltaTime, message) {
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
            handleProgramChange(message);
            break;

        case MIDI_MESSAGE.startSysex:
            startSysex(message);
            break;

        case MIDI_MESSAGE.endSysex:
            endSysex(message);
            break;

    }
});



function startSysex(message) {
    console.log(message);
}

function endSysex(message) {
    console.log(message);
}



// Write Sound Sysex Command: F0 41 6n 21 F7

var defaultTemplate = {
    controllers: {}
};

function createBlankPatch(template) {

    template = template || defaultTemplate;

    return {
        controllers: JSON.parse(JSON.stringify(template.controllers))
    };
}

var currentPatch;
var currentBankNumber = 0;
var currentProgramNumber = 0;


function handleControllerMessage(message) {
    console.log("handleControllerMessage with " + message);
    console.log(typeof message);

    switch (message[0]) {

        case 0:
            currentBankNumber = message[1];
            handleProgramChange(currentProgramNumber);
            break;

        default:
            currentPatch.controllers[message[0]] = message[1];
            break;
    }
}


function handleProgramChange(message) {
    console.log("handleProgramChange with " + message);
    console.log(typeof message);

    currentProgramNumber = parseInt(message);
    currentPatch = nconf.get(createKeyFromBankPatch(currentBankNumber, currentProgramNumber));

    if (currentPatch == null) {
        currentPatch = createBlankPatch();
    }

    
}


handleProgramChange(0);


function createKeyFromBankPatch(bank, patch) {
    return "bank-"+bank+"_patch-"+patch;
}

function saveCurrentPatch() {

    nconf.set(createKeyFromBankPatch(currentBankNumber, currentProgramNumber), currentPatch);

    nconf.save(function (err) {
        if (err) { console.error(err); }
        else { console.log("saved patch")}
    });
}


program
    .version('0.0.1')
    .option('-i, --interface [number]', 'Select MIDI interface')
    .option('-c, --channel [number]', 'Respond to MIDI channel [1]', 1)
    .parse(process.argv);


var interfaceDef = Q.defer();

console.log('interface = ' + program.interface);


    console.log("opening MIDI in " + program.interface);
    input.openPort(parseInt(program.interface));
// Sysex, timing, and active sensing
    input.ignoreTypes(false, true, false);


function initializeAllPatches() {
    nconf.file({ file: './patches/patches.json' });
}

initializeAllPatches();


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
                console.log('saving bank-' + currentBankNumber + " / program-" + currentProgramNumber);
                saveCurrentPatch();
                break;
        }

    });

}

listenForKeys();

