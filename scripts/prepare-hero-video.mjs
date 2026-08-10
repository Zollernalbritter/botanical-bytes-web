// Transkodiert ein Hero-Video zu webtauglichem MP4 + Poster.
// Aufruf: node scripts/prepare-hero-video.mjs [quelle] [name]
//   node scripts/prepare-hero-video.mjs assets-src/hero-lab-raw.mp4 hero-lab
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const src = process.argv[2] ?? "assets-src/hero-raw.mp4";
const name = process.argv[3] ?? "hero";
mkdirSync("public/media", { recursive: true });

// Nicht hochskalieren: 'min(1920,iw)' lässt kleinere Quellen in Ruhe.
const scale = "scale='min(1920,iw)':-2";

execFileSync(ffmpeg, [
  "-y", "-i", src,
  "-vf", scale,
  "-c:v", "libx264", "-crf", "25", "-preset", "slow", "-pix_fmt", "yuv420p",
  "-movflags", "faststart", "-an",
  `public/media/${name}.mp4`,
], { stdio: "inherit" });

// Poster aus der Mitte statt aus Frame 0 — der erste Frame ist oft noch dunkel.
execFileSync(ffmpeg, [
  "-y", "-ss", "2", "-i", src,
  "-vframes", "1", "-q:v", "3",
  "-vf", scale,
  `public/media/${name}-poster.jpg`,
], { stdio: "inherit" });

console.log(`done: public/media/${name}.mp4 + ${name}-poster.jpg`);
