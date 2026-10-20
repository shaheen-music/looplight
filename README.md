# Looplight

Endless music in five moods: Cozy, Sunny Side, Japanese Classical (Tsugaru shamisen and taiko), Jazz Noir and Silk & Bamboo. Cozy, Sunny Side, Japanese Classical and Silk & Bamboo are generated as you listen; Jazz Noir plays recordings. One page, no build step, works offline once opened.

Open it here: https://shaheen-music.github.io/looplight/


## Credits

The Silk & Bamboo flute and erhu (violin) notes come from the FluidR3_GM soundfont (via gleitz/midi-js-soundfonts), re-encoded as small mono MP3s. Silk & Bamboo's guzheng (a Dan Tranh zither) uses recordings from the Versilian Community Sample Library (VCSL, CC0) by Versilian Studios. Each instrument's recordings live in `samples/` and load only when a side needs them.


## Jazz Noir recordings

Jazz Noir plays the recordings in `audio/jazz-noir/` (`noir-01.mp3` ... `noir-40.mp3`): shuffled, crossfaded, endless. See `audio/jazz-noir/README.md`.
