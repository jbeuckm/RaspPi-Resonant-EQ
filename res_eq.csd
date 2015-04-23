B1;2c<CsoundSynthesizer>
<CsOptions>

-dm0 -+rtaudio=alsa -Ma -odac:hw:1,0 -i adc:hw:1,0

</CsOptions>
<CsInstruments>

sr     = 44100
ksmps  = 32
nchnls = 2
0dbfs  = 1

opcode ResonantEQ, a, ap

ain, ichan	   xin

      initc7	ichan, 2, .5
      initc7    ichan, 16, .5
      initc7    ichan, 19, .5
      initc7    ichan, 71, .5
      initc7    ichan, 74, .5
      initc7    ichan, 80, .5
      initc7    ichan, 81, .5
      initc7    ichan, 91, .5
      initc7    ichan, 1, .5
      initc7    ichan, 1, .5

klevel0    ctrl7 ichan, 17, 0.001, 25, 2
kres0      ctrl7 ichan, 17, 1, 50, 1
kq0        ctrl7 ichan, 17, 8, 10, 1

klevel1    ctrl7 ichan, 18, 0.001, 25, 2
kres1      ctrl7 ichan, 18, 1, 50, 1
kq1        ctrl7 ichan, 18, 8, 10, 1

klevel2    ctrl7 ichan, 19, 0.001, 25, 2
kres2      ctrl7 ichan, 19, 1, 50, 1
kq2        ctrl7 ichan, 19, 8, 10, 1

klevel3    ctrl7 ichan, 71, 0.001, 25, 2
kres3      ctrl7 ichan, 71, 1, 50, 1
kq3        ctrl7 ichan, 71, 8, 10, 1

klevel4    ctrl7 ichan, 74, 0.001, 25, 2
kres4      ctrl7 ichan, 74, 1, 50, 1
kq4        ctrl7 ichan, 74, 8, 10, 1

klevel5    ctrl7 ichan, 80, 0.001, 25, 2
kres5      ctrl7 ichan, 80, 1, 50, 1
kq5        ctrl7 ichan, 80, 8, 10, 1

klevel6    ctrl7 ichan, 81, 0.001, 25, 2
kres6	   ctrl7 ichan, 81, 1, 50, 1
kq6	   ctrl7 ichan, 81, 8, 10, 1

klevel7    ctrl7 ichan, 91, 0.001, 25, 2
kres7	   ctrl7 ichan, 91, 1, 50, 1
kq7	   ctrl7 ichan, 91, 8, 10, 1

klevel8	   ctrl7 ichan, 2, 0.001, 25, 2
kres8      ctrl7 ichan, 2, 1, 50, 1
kq8	   ctrl7 ichan, 2, 8, 10, 1

klevel9	   ctrl7 ichan, 16, 0.001, 25, 2
kres9	   ctrl7 ichan, 16, 1, 50, 1
kq9	   ctrl7 ichan, 16, 8, 10, 1

printks "klevel9 = %f, kres9 = %f, kq9 = %f\\n", 1, klevel9, kres9, kq9

kmod	   ctrl7 ichan, 1, .05, 1

af0    rbjeq ain, 29, klevel0, kq0, kres0, 8
af1    rbjeq af0, 61, klevel1, kq1, kres1, 8
af2    rbjeq af1, 115, klevel2, kq2, kres2, 8
af3    rbjeq af2, 218, klevel3, kq3, kres3, 8
af4    rbjeq af3, 411, klevel4, kq4, kres4, 8
af5    rbjeq af4, 777, klevel5, kq5, kres5, 8
af6    rbjeq af5, 1500, klevel6, kq6, kres6, 8
af7    rbjeq af6, 2800, klevel7, kq7, kres7, 8
af8    rbjeq af7, 5200, klevel8, kq8, kres8, 8
af9    rbjeq af8, 11000, klevel9, kq9, kres9, 8

    xout af9

endop


instr 1

aL, aR	ins
ain = aR
;ain  rand .8
;ain     diskin2 "apache.wav", 1, 0, 1, 0, 32

aout	ResonantEQ ain, p4

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
