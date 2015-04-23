B1;2c<CsoundSynthesizer>
<CsOptions>

-dm0 -odac -+rtaudio=alsa -Ma

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
      
klevel0 = 0
kres0 = 0
kq0 = 2

klevel1 = 0
kres1 = 0
kq1 = 2

klevel2    ctrl7 ichan, 19, 0, 1
kres2      ctrl7 ichan, 19, 1, 50, 1
kq2        ctrl7 ichan, 19, 2, 10, 1

klevel3    ctrl7 ichan, 71, 0, 1
kres3      ctrl7 ichan, 71, 1, 50, 1
kq3        ctrl7 ichan, 71, 2, 10, 1

klevel4    ctrl7 ichan, 74, 0, 1
kres4      ctrl7 ichan, 74, 1, 50, 1
kq4        ctrl7 ichan, 74, 2, 10, 1

klevel5    ctrl7 ichan, 80, 0, 1
kres5      ctrl7 ichan, 80, 1, 50, 1
kq5        ctrl7 ichan, 80, 2, 10, 1

klevel6    ctrl7 ichan, 81, 0, 1
kres6	   ctrl7 ichan, 81, 1, 50, 1
kq6	   ctrl7 ichan, 81, 2, 10, 1

klevel7    ctrl7 ichan, 91, 0, 1
kres7	   ctrl7 ichan, 91, 1, 50, 1
kq7	   ctrl7 ichan, 91, 2, 10, 1

klevel8	   ctrl7 ichan, 2, 0, 1
kres8      ctrl7 ichan, 2, 1, 50, 1
kq8	   ctrl7 ichan, 2, 2, 10, 1

klevel9	   ctrl7 ichan, 16, 0, 1
kres9	   ctrl7 ichan, 16, 1, 50, 1
kq9	   ctrl7 ichan, 16, 2, 10, 1

kmod	   ctrl7 ichan, 1, .05, 1

af0    rbjeq ain, 29, 1, kq0, kres0
af1    rbjeq ain, 61, 1, kq1, kres1
af2    rbjeq ain, 115, 1, kq2, kres2
af3    rbjeq ain, 218, 1, kq3, kres3
af4    rbjeq ain, 411, 1, kq4, kres4
af5    rbjeq ain, 777, 1, kq5, kres5
af6    rbjeq ain, 1500, 1, kq6, kres6
af7    rbjeq ain, 2800, 1, kq7, kres7
af8    rbjeq ain, 5200, 1, kq8, kres8
af9    rbjeq ain, 11000, 1, kq9, kres9

alc = klevel0*af0 + klevel1*af1 + klevel2*af2 + klevel3*af3 + klevel4*af4
ahc = klevel5*af5 + klevel6*af6 + klevel7*af7 + klevel8*af8 + klevel9*af9

    xout alc + ahc

endop


instr 1
;ain  rand .8

ain     diskin2 "apache.wav", 1, 0, 1, 0, 32

aout	ResonantEQ ain, p4

	out aout, aout

endin

</CsInstruments>
<CsScore>

f 1 0 129 5 0.00001 96 0.00001 32 1

i 1 0 360000 1

e

</CsScore>
</CsoundSynthesizer>
