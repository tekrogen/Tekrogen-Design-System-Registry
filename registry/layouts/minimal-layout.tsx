import { JetBrains_Mono, Poppins } from "next/font/google";
import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        poppins.variable,
        jetbrainsMono.variable,
        "bg-background text-foreground",
      )}
    >
      <body>
        <main className="mt-16 flex w-full justify-center">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
