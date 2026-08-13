import { Figtree, Space_Mono } from "next/font/google";

// Eigene Schriftrollen nur für diese Route: eine geometrische Grotesk für
// alles Gesetzte, ein Monospace für Kleinlabels. Die Startseite behält ihre
// Serif-Rolle — deshalb hängen die Variablen an einem Wrapper statt an <html>.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${figtree.variable} ${spaceMono.variable} studio`}>
      {children}
    </div>
  );
}
