# Looplight

Endless generative music in three moods: Cozy, Sunny Side and Japanese Classical. One page, no build step, works offline once opened.

Open it here: https://shaheen-music.github.io/looplight/


## Credits

The Jazz Noir saxophone uses tenor-sax notes from the FluidR3_GM soundfont (via gleitz/midi-js-soundfonts), re-encoded as small mono MP3s. The Silk & Bamboo flute and erhu (violin) notes come from the same soundfont.

Jazz Noir's saxophone and upright-style bass come from the Karoryfer Samples and FluidR3_GM sets, and its piano from Versilian Studios' VSCO 2 Community Edition, via nbrosowsky/tonejs-instruments (CC BY 3.0). Each instrument's recordings live in `samples/` and load only when a side needs them.

Jazz Noir's tenor saxophone (with its breath and key-click sounds) uses the MTG Solo Saxophones recordings by MTG (freesound.org), SFZ version by kinwie, licensed CC BY 4.0 (https://github.com/sfzinstruments/MTG.SoloSax). Its upright piano and Silk & Bamboo's guzheng (a Dan Tranh zither) use recordings from the Versilian Community Sample Library (VCSL, CC0) by Versilian Studios. The sax and piano mentioned above from the older sets were replaced by these.


## Jazz Noir recordings

Jazz Noir plays real recordings if you put them in `audio/jazz-noir/` (`noir-01.mp3` ... `noir-30.mp3`): shuffled, crossfaded, endless. With none there it uses the generated sax band. See `audio/jazz-noir/README.md`.
