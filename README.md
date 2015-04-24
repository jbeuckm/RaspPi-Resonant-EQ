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

Clone this project:
```
git clone https://github.com/jbeuckm/RaspPi-Resonant-EQ.git res_eq
```

Install the nodejs dependencies:
```
cd res_eq/node
npm install .
```

Create a startup script...
`pico autostart.sh`

Add these lines to your autostart.sh script:
```
#!/bin/bash
cd /home/pi/res_eq/csound && csound realtime.csd &
cd /home/pi/res_eq/node && node index.js
```

Save the file, and make your script executable.
`sudo chmod +x autostart.sh`

Edit your cron tasks:
`sudo crontab -e`

Tell cron to run your script on startup:
`@reboot /bin/bash /home/pi/autostart.sh`

Restart and verify that the program starts...
`sudo reboot`






