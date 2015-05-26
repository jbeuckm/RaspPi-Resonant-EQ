var nconf = require('nconf');

var currentPatch;
var currentBankNumber = 0;
var currentProgramNumber = 0;

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


function createKeyFromBankPatch(bank, patch) {
    return "bank-"+bank+"_patch-"+patch;
}


module.exports = {

    setBankNumber: function(bank) {
        currentBankNumber = bank;
        module.exports.setProgramNumber(currentProgramNumber);
    },

    setProgramNumber: function (message) {

        console.log("setProgramNumber " + message);
        console.log(typeof message);

        currentProgramNumber = parseInt(message);
        currentPatch = nconf.get(createKeyFromBankPatch(currentBankNumber, currentProgramNumber));

        if (currentPatch == null) {
            currentPatch = createBlankPatch();
        }

        return currentPatch;
    },

    updateController: function(number, value) {
        currentPatch.controllers[number] = value;
    },

    saveCurrentPatch: function () {

        nconf.set(createKeyFromBankPatch(currentBankNumber, currentProgramNumber), currentPatch);

        nconf.save(function (err) {
            if (err) { console.error(err); }
            else {
                console.log('saved bank-' + currentBankNumber + " / program-" + currentProgramNumber);
            }
        });
    }

};


nconf.file({ file: 'patches/patches.json' });

module.exports.setProgramNumber(0);
