// Zentrales Bild-Manifest — Quelle: scripts/prepare-images.mjs
import heroCress from "@/assets/img/hero-cress.jpg";
import measuringSeeds from "@/assets/img/measuring-seeds.jpg";
import sowingSeeds from "@/assets/img/sowing-seeds.jpg";
import cressGrown from "@/assets/img/cress-grown.jpg";
import greenhousePrototype from "@/assets/img/greenhouse-prototype.jpg";
import weighingHarvest from "@/assets/img/weighing-harvest.jpg";
// Die drei Fassungen für die Collage um die 25-%-Zahl, erzeugt von
// scripts/warm-photos.mjs: Schatten angehoben, eine Spur wärmer und heller,
// damit sie neben den erzeugten Bildern nicht auseinanderbrechen. Die Waage
// zusätzlich um 90° aufgerichtet — im Original steht die Anzeige auf dem Kopf.
// Inhaltlich unverändert; die Originale liegen unberührt daneben.
import measuringSeedsWarm from "@/assets/img/measuring-seeds-warm.jpg";
import weighingHarvestWarm from "@/assets/img/weighing-harvest-warm.jpg";
import cressGrownWarm from "@/assets/img/cress-grown-warm.jpg";
import day1 from "@/assets/img/day1.jpg";
import day2 from "@/assets/img/day2.jpg";
import day3 from "@/assets/img/day3.jpg";
import day4 from "@/assets/img/day4.jpg";
import day5 from "@/assets/img/day5.jpg";
import teamStudio from "@/assets/img/team-studio.jpg";
import bwkiStage from "@/assets/img/bwki-stage.jpg";
import jufoRegional from "@/assets/img/jufo-regional.jpg";
import jufoLandeswettbewerb from "@/assets/img/jufo-landeswettbewerb.jpg";
import pcbV2 from "@/assets/img/pcb-v2.png";
import pcbV3 from "@/assets/img/pcb-v3.png";
import seedOriginal from "@/assets/img/seed-original.png";
import seedCanny from "@/assets/img/seed-canny.png";
import seedSobel from "@/assets/img/seed-sobel.png";
import dashboard from "@/assets/img/dashboard.png";

// ACHTUNG — diese drei sind NICHT fotografiert, sondern erzeugt.
// Sie sitzen ausschließlich in der Collage um die 25-%-Zahl und tragen dort
// nur die Stimmung. Was in derselben Collage eine Aussage macht — die Waage,
// die Ernte, das Abmessen — sind echte Projektfotos. Der Dateiname sagt es,
// damit sie später niemand versehentlich als Projektdokumentation verwendet.
import generatedSeedlings from "@/assets/img/generated-seedlings.jpg";
import generatedTray from "@/assets/img/generated-tray.jpg";
import generatedBench from "@/assets/img/generated-bench.jpg";

export const images = {
  heroCress,
  measuringSeeds,
  sowingSeeds,
  cressGrown,
  greenhousePrototype,
  weighingHarvest,
  measuringSeedsWarm,
  weighingHarvestWarm,
  cressGrownWarm,
  days: [day1, day2, day3, day4, day5],
  teamStudio,
  bwkiStage,
  jufoRegional,
  jufoLandeswettbewerb,
  pcbV2,
  pcbV3,
  seedOriginal,
  seedCanny,
  seedSobel,
  dashboard,
  generatedSeedlings,
  generatedTray,
  generatedBench,
};
