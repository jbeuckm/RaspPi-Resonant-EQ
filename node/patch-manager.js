#!/usr/bin/env node

var Q = require('q');
var program = require('commander');
var prompt = require('prompt');
var fs = require('fs');
var midi = require('midi');
var Parser = require('midi-parser');
var msg = Parser.msg;

var input = new midi.input();
var parser = new Parser();


input.on('message', function (deltaTime, message) {
    parser.write(message);
});

parser.on('midi', function (status, channel, message) {

    switch (status) {

        case msg.ctrlChg:
//	console.log("Control Change ("+channel+") "+message);
            handleControllerMessage(message);
            break;

        case msg.progChg:
//	console.log("Program Change ("+channel+") "+message);
            handleProgramChange(message);
            break;

    }
});


// Write Sound Sysex Command: F0 41 6n 21 F7


var patches = [];
var currentBankNumber = 0;
var currentProgramNumber = 0;


function handleControllerMessage(message) {
    console.log("handleControllerMessage with " + message);
    console.log(typeof message);
}
function handleProgramChange(message) {
    console.log("handleProgramChange with " + message);
    console.log(typeof message);
}


function loadPatches() {

    fs.readdir(__dirname + '/data', function (err, files) {

        if (err) {
            console.log(err);
        }

        files.filter(function (file) {
            return file.substr(-5) === '.json';
        })
            .forEach(function (file) {

                loadPatch(file);
            });
    });

}

function loadPatch(filename) {

    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        data = JSON.parse(data);

        patches = data;
        console.dir(patches);

    });

}

function saveCurrentPatch() {

    var data = JSON.stringify(patches);

    var filename = __dirname + '/bank' + currentBankNumber + '/' + currentProgramNumber + '.json';

    fs.writeFile(filename, data, function (err) {
        if (err) {
            console.log(err);
        }
    });
}


program
    .version('0.0.1')
    .option('-i, --interface [number]', 'Select MIDI interface')
    .option('-c, --channel [number]', 'Respond to MIDI channel [1]', 1)
    .parse(process.argv);


var interfaceDef = Q.defer();

console.log('interface = ' + program.interface);

if (program.interface) {
    interfaceDef.resolve(program.interface);
}
else {

    console.log("Available MIDI ins:");
    var portCount = input.getPortCount();
    for (var i = 0; i < portCount; i++) {
        console.log(i + ": " + input.getPortName(i));
    }

    var schema = {
        properties: {
            interface: {
                pattern: /^[0-9]+$/,
                message: 'Interface must be an integer',
                required: true
            }
        }
    };

    prompt.start();

    prompt.get(schema, function (err, result) {
        if (err) {
            console.log(err);
            interfaceDef.reject(err);
        }
        else {
            console.log(result);
            interfaceDef.resolve(result.interface);
        }
    });
}

interfaceDef.promise.then(function (interface) {

    console.log("opening MIDI in " + interface);
    input.openPort(parseInt(interface));
// Sysex, timing, and active sensing
    input.ignoreTypes(false, true, false);

});

loadPatches();




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
                console.log('saving bank-' + currentBankNumber + "/program-" + currentProgramNumber);
                saveCurrentPatch();
        }

    });

}

listenForKeys();

