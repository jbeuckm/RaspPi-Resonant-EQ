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

      initc7	1, 2, .5
      initc7    1, 16, .5
      initc7    1, 19, .5
      initc7    1, 71, .5
      initc7    1, 74, .5

      initc7    1, 80, .5
      initc7    1, 81, .5
      initc7    1, 91, .5
      initc7    1, 1, .5
      initc7    1, 1, .5

      
awhite unirand 2.0
awhite = awhite - 1.0  
apink  pinkish awhite, 1, 0, 0, 1
;a1  = apink * 30000
ain = awhite * 10000

;a1     diskin2 "apache.wav", 1, 0, 1, 0, 32

klevel0    ctrl7 1, 2, 0, 1
klevel1    ctrl7 1, 16, 0, 1
klevel2    ctrl7 1, 19, 0, 1
klevel3    ctrl7 1, 71, 0, 1
klevel4    ctrl7 1, 74, 0, 1
klevel5    ctrl7 1, 80, 0, 1
klevel6    ctrl7 1, 81, 0, 1
klevel7    ctrl7 1, 91, 0, 1
klevel8 = 0
klevel9 = 0

kmod	   ctrl7 1, 1, .05, 1

af0    butterbp ain, 29, 30
       printks "gain(29hz) = %f, q(29hz) = %f\\n", 1, klevel0, kmod
af1    butterbp ain, 61, 60
af2    butterbp ain, 115, 100
af3    butterbp ain, 218, 100
af4    butterbp ain, 411, 200
af5    butterbp ain, 777, 300
af6    butterbp ain, 1500, 700
af7    butterbp ain, 2800, 1000
af8    butterbp ain, 5200, 2000
af9    butterbp ain, 11000, 5000

alc = klevel0*af0 + klevel1*af1 + klevel2*af2 + klevel3*af3 + klevel4*af4
ahc = klevel5*af5 + klevel6*af6 + klevel7*af7 + klevel8*af8 + klevel9*af9

       outs alc + ahc, alc + ahc

endin

</CsInstruments>
<CsScore>

i 1 0 3600

e

</CsScore>
</CsoundSynthesizer>
