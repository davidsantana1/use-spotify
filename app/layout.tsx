import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "useSpotify - Encuentra las letras de tus canciones favoritas",
  description: "Busca álbumes de Spotify y lee las letras de sus canciones",
  icons: { icon: "/favicon.ico", apple: "/logo192.png" },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
