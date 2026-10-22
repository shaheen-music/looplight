# Looplight

Endless music in four moods: Cozy, Sunny Side, Jazz Noir and Silk & Bamboo (a fifth, Japanese Classical with Tsugaru shamisen and taiko, is switched off for now). Cozy and Sunny Side are generated as you listen; Jazz Noir and Silk & Bamboo play recordings (Silk & Bamboo falls back to its generated guzheng, flute and erhu if the recordings are missing). One page, no build step, works offline once opened.

Open it here: https://shaheen-music.github.io/looplight/


## Credits

The Silk & Bamboo flute and erhu (violin) notes come from the FluidR3_GM soundfont (via gleitz/midi-js-soundfonts), re-encoded as small mono MP3s. Silk & Bamboo's guzheng (a Dan Tranh zither) uses recordings from the Versilian Community Sample Library (VCSL, CC0) by Versilian Studios. Each instrument's recordings live in `samples/` and load only when a side needs them.


## Jazz Noir recordings

Jazz Noir plays the recordings in `audio/jazz-noir/` (`noir-01.mp3` ... `noir-40.mp3`): shuffled, crossfaded, endless. See `audio/jazz-noir/README.md`.

## Tsugaru transcriptions

The Japanese Classical side (switched off for now, the code is kept) plays real Tsugaru-jamisen pieces (Tsugaru Jonkara Kyūbushi, Kuroishi Yosare Bushi, Tsugaru Jinku, Tsugaru Shiogama Jinku, Yasaburō Bushi, Kokiriko Bushi). The note data embedded in `index.html` comes from the transcriptions in [threedaymonk/tsugaru](https://github.com/threedaymonk/tsugaru) (shamisen.space), licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). That data is therefore shared under the same licence. The sound itself is synthesized by the app.

## Space view

In Cozy and Sunny Side a small star button at the bottom right opens a full-screen looping star-field video over the whole app; the close button (or Escape) brings you back. It starts at a random point and is randomly mirrored each time. The music keeps playing. The video is `video/space.mp4` (about 1.3 MB).
