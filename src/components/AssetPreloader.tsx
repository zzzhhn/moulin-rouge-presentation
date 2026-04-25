// Hidden media preloader — kicks the browser into eagerly downloading the
// can-can video and the 5 jukebox audio clips at app boot, so by the time
// the presenter advances to slides 02 / 03 the bytes are already cached
// and playback is instant.
//
// Why hidden <audio>/<video> elements with preload="auto" instead of
// <link rel="preload" as="audio">:
//   - <link rel="preload"> for media has known cache-key mismatches with
//     <audio>/<video>'s Range-request behavior in Chrome — sometimes the
//     browser ends up downloading the same file twice.
//   - <audio preload="auto"> only triggers DOWNLOAD + decode-prep. It does
//     not call .play() unless we explicitly ask. So preload != autoplay,
//     which is exactly the guarantee we want.
//
// Memory cost: 5 × ~200 KB AAC clips + 1 × 16 MB H.264 clip = ~17 MB held
// in browser media buffers. Safe.

const PRELOAD_AUDIO = [
  "/audio/your-song-clip.mp4",
  "/audio/lady-marmalade-clip.mp4",
  "/audio/come-what-may-clip.mp4",
  "/audio/chandelier-clip.mp4",
  "/audio/firework-clip.mp4",
];

const PRELOAD_VIDEO = ["/video/cancan-clip.mp4"];

export default function AssetPreloader() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        width: 0,
        height: 0,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      {PRELOAD_AUDIO.map((src) => (
        <audio key={src} src={src} preload="auto" muted />
      ))}
      {PRELOAD_VIDEO.map((src) => (
        <video key={src} src={src} preload="auto" muted playsInline />
      ))}
    </div>
  );
}
