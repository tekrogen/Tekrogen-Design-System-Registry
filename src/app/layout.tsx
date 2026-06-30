import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Tekrogen Design System Registry",
  description:
    "The Tekrogen Design System registry — components and tokens for the four Tekrogen entities, built on shadcn/ui and Tailwind v4.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // `dark` makes the brand Ink theme the default; the light Paper theme lives
  // in :root and a toggle is added in rebrand Phase 4. Fonts are self-hosted
  // via @font-face in globals.css.
  return (
    <html lang="en" className="dark bg-background text-foreground">
      <meta
        name="robots"
        content="noindex, nofollow, noarchive, nosnippet, noimageindex"
      />
      <body className="flex grow">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
