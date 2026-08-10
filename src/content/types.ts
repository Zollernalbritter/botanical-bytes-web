import type { de } from "./de";

// Deutsch ist die Quelle der Wahrheit — fehlt in en.ts ein Key, schlägt der Build fehl.
export type Dictionary = typeof de;
