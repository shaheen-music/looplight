# Looplight

Endless music in five moods: Cozy, Sunny Side, Night Drive, Jazz Noir and Scarlet Mist. Cozy, Sunny Side and Night Drive (two flavours: C minor, D minor) are generated as you listen; Jazz Noir and Scarlet Mist play recordings (Scarlet Mist falls back to its generated guzheng, flute and erhu if the recordings are missing). One page, no build step, works offline once opened.

Open it here: https://shaheen-music.github.io/looplight/


## Credits

The Scarlet Mist flute and erhu (violin) notes come from the FluidR3_GM soundfont (via gleitz/midi-js-soundfonts), re-encoded as small mono MP3s. Scarlet Mist's guzheng (a Dan Tranh zither) uses recordings from the Versilian Community Sample Library (VCSL, CC0) by Versilian Studios. Each instrument's recordings live in `samples/` and load only when a side needs them.


## Jazz Noir recordings

Jazz Noir plays the recordings in `audio/jazz-noir/` (`noir-01.mp3` ... `noir-40.mp3`): shuffled, crossfaded, endless. See `audio/jazz-noir/README.md`.

## Space view

In Cozy and Sunny Side a small star button at the bottom right opens a full-screen looping star-field video over the whole app; the close button (or Escape) brings you back. It starts at a random point and is randomly mirrored each time. The music keeps playing. Phones get `video/space.mp4` (about 1.3 MB, portrait); wide screens such as desktops get `video/space-wide.mp4` (about 6 MB, 1600x900) so it stays sharp full screen.
