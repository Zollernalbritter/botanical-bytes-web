// Transkodiert das generierte Hero-Video zu webtauglichem MP4 + Poster.
// Aufruf: node scripts/prepare-hero-video.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const src = "assets-src/hero-raw.mp4";
mkdirSync("public/media", { recursive: true });

execFileSync(ffmpeg, [
  "-y", "-i", src,
  "-vf", "scale=1920:-2",
  "-c:v", "libx264", "-crf", "26", "-pix_fmt", "yuv420p",
  "-movflags", "faststart", "-an",
  "public/media/hero.mp4",
], { stdio: "inherit" });

execFileSync(ffmpeg, [
  "-y", "-i", src,
  "-vframes", "1", "-q:v", "3",
  "-vf", "scale=1920:-2",
  "public/media/hero-poster.jpg",
], { stdio: "inherit" });

console.log("done");
