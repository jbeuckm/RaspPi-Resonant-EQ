B1;2c<CsoundSynthesizer>
<CsOptions>

-dm0 -odac -+rtaudio=alsa -Ma

</CsOptions>
<CsInstruments>

sr     = 44100
ksmps  = 32
nchnls = 2
0dbfs  = 1

instr 1

      initc7	1, 2, 1
      initc7    1, 16, 1
      initc7    1, 19, 1
      initc7    1, 71, .3
      initc7    1, 74, .3

      initc7    1, 80, .3
      initc7    1, 81, 1
      initc7    1, 91, 1
      initc7    1, 1, 1
      initc7    1, 1, 1

      
awhite unirand 2.0
awhite = awhite - 1.0  
apink  pinkish awhite, 1, 0, 0, 1
;a1  = apink * 30000
a1 = awhite * 30000

;a1     diskin2 "apache.wav", 1, 0, 1, 0, 32

klevel0    ctrl7 1, 2, 0, 3
klevel1    ctrl7 1, 16, 0, 3
klevel2    ctrl7 1, 19, 0, 3
klevel3    ctrl7 1, 71, 0, 3
klevel4    ctrl7 1, 74, 0, 3
klevel5    ctrl7 1, 80, 0, 3
klevel6    ctrl7 1, 81, 0, 3
klevel7    ctrl7 1, 91, 0, 3

kmod	   ctrl7 1, 1, .05, 5

af0    pareq a1, 29, klevel0, kmod
       printks "gain(29hz) = %f, q(29hz) = %f\\n", 1, klevel0, kmod
af1    pareq af0, 61, klevel1, 1
af2    pareq af1, 115, klevel2, 1
af3    pareq af2, 218, klevel3, 1
af4    pareq af3, 411, klevel4, 1
af5    pareq af4, 777, klevel5, 1
af6    pareq af5, 1500, klevel6, 1
af7    pareq af6, 2800, klevel7, 1
af8    pareq af7, 5200, 1, 1
af9    pareq af8, 11000, 1, 1
       outs af9, af9
endin

</CsInstruments>
<CsScore>

i 1 0 3600

e

</CsScore>
</CsoundSynthesizer>
