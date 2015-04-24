B1;2c<CsoundSynthesizer>
<CsOptions>

-dm0 -+rtaudio=alsa -Ma -odac:hw:1,0 -i adc:hw:1,0

</CsOptions>
<CsInstruments>

sr     = 44100
ksmps  = 32
nchnls = 2
0dbfs  = 1

#include "ResonantEQ.csd"

instr 1

kbend init 0

kstatus, kchan, klsb, kmsb midiin
if (kstatus == 224 && kchan == p4) then
kbend = -8192 + (kmsb << 7) + klsb
printks "kbend = %d\\n", 0, kbend
endif


aL, aR	ins
ain = aR
;ain  rand .8
;ain     diskin2 "apache.wav", 1, 0, 1, 0, 32

aout	ResonantEQ ain, p4, kbend

	out aout, aout

endin

</CsInstruments>
<CsScore>

f 1 0 129 5 0.00001 76 0.00001 52 1	; turn up at the high end 
f 2 0 129 5 .01 65 1 64 25     	  	; shallow first half then steep for level control

i 1 0 360000 1

e

</CsScore>
</CsoundSynthesizer>
