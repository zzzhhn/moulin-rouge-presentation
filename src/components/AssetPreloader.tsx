// Hidden media preloader — kicks the browser into eagerly downloading the
// can-can video at app boot, so by the time the presenter advances to
// Section 02 the bytes are cached and playback is instant.
//
// Note: jukebox audio (5 clips) is NOT preloaded here. SlideJukebox renders
// 5 persistent <audio> elements (one per track) directly, each with its own
// preload="auto" — that keeps each track's own ready state warm at
// HAVE_ENOUGH_DATA so switching tracks is instant. Preloading the audio
// here too would force a duplicate load via a different element instance.
//
// preload="auto" only triggers DOWNLOAD + decode-prep, never .play() —
// preload != autoplay.

const PRELOAD_VIDEO = ["/video/cancan-clip.mp4"];

const PRELOAD_IMAGES = [
  "/images/intro-satine-singing.jpg",
  "/images/cancan-stage.jpg",
  "/images/cancan-satine-crowd.jpg",
  "/images/bully-cover.jpg",
  "/images/olivo-latimes.jpg",
];

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
      {PRELOAD_VIDEO.map((src) => (
        <video key={src} src={src} preload="auto" playsInline />
      ))}
      {PRELOAD_IMAGES.map((src) => (
        <img key={src} src={src} alt="" loading="eager" decoding="async" />
      ))}
    </div>
  );
}
