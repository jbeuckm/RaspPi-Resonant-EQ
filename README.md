# RaspPi-Resonant-EQ
A MIDI controllable DSP version of the [Serge Resonant Equalizer](http://www.cgs.synth.net/modules/cgs202_reseq.html)

![Frequency Response](peaks.png)

## Setup Your Pi

Begin with a clean install of Raspbian. Install csound, node and libasound2-dev:

```
sudo apt-get update
sudo apt-get install csound
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
sudo apt-get install libasound2-dev
```

Clone this repo
`git clone https://github.com/jbeuckm/RaspPi-Resonant-EQ.git res_eq`

Create a startup script...
`pico autostart.sh`

Add these lines to your autostart.sh file:
```
#!/bin/bash
node /home/pi/res_eq/patches/index.js &
csound /home/pi/res_eq/res_eq.csd
```

Save the file, and ake your script executable.
`sudo chmod +x autostart.sh`

Edit your cron tasks:
`sudo crontab -e`

And tell cron to run your script on startup:
`@reboot /bin/bash /home/pi/autostart.sh`

Restart and verify that the program starts...
`sudo reboot`






