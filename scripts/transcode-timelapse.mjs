// Transkodiert das 21-MB-Wachstums-GIF zu webtauglichem MP4/WebM + Poster.
// Aufruf: node scripts/transcode-timelapse.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const src =
  "C:/Users/langt/Documents/Programmieren/BWKI_24_Plant_Growth_Optimizer/Wachstum.gif";
mkdirSync("public/media", { recursive: true });

const scale = "scale=trunc(iw/2)*2:trunc(ih/2)*2";

execFileSync(ffmpeg, [
  "-y", "-i", src,
  "-vf", `${scale},fps=24`,
  "-c:v", "libx264", "-crf", "28", "-pix_fmt", "yuv420p",
  "-movflags", "faststart", "-an",
  "public/media/wachstum.mp4",
], { stdio: "inherit" });

execFileSync(ffmpeg, [
  "-y", "-i", src,
  "-vf", `${scale},fps=24`,
  "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "40", "-an",
  "public/media/wachstum.webm",
], { stdio: "inherit" });

execFileSync(ffmpeg, [
  "-y", "-i", src,
  "-vframes", "1", "-q:v", "3",
  "public/media/wachstum-poster.jpg",
], { stdio: "inherit" });

console.log("done");
