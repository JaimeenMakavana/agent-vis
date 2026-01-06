import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentVis | The Glass Box Observability Platform",
  description:
    "A Next.js-based visualization suite for Multi-Agent Systems. Debug logic loops, audit tool usage, and optimize token spend in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-(--brand-surface) text-neutral-700 min-h-dvh pt-[64px] flex flex-col`}
      >
        {/* Aura / background treatment */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
          style={{
            filter: "invert(1) opacity(0.6) saturate(1.2)",
          }}
        >
          <div className="absolute left-0 top-0 h-full w-full" />
        </div>

        {/* Static grid overlay */}
        <div
          className="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"
          aria-hidden="true"
        />
        <MainHeader />
        <main className="relative z-10 flex-1">{children}</main>
        <MainFooter />
      </body>
    </html>
  );
}
