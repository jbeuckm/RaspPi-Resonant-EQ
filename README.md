# RaspPi-Resonant-EQ
A MIDI controllable DSP version of the [Serge Resonant Equalizer](http://www.cgs.synth.net/modules/cgs202_reseq.html)

## Setup Your Pi

- (start with a clean install of Raspbian)

- sudo apt-get update
- sudo apt-get install csound
- sudo apt-get install puredata

Create a startup script...

- `pico autostart.sh`
- add these lines to your autostart.sh file:
```
csound res_eq.csd
pd -noaudio -alsamidi patcher.pd
```
- `sudo chmod +x autostart.sh`
- sudo crontab -e





