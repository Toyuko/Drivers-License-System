import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thai Driver's License Tracking",
  description:
    "Track the status of your Thai Driver's License application (Thai/English).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b backdrop-blur">
              <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/siamez-logo.svg"
                    alt="SiamEZ logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                    priority
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-semibold text-[#0052a3] uppercase tracking-wide">
                      SiamEZ
                    </span>
                    <span className="text-sm text-slate-600">
                      License Track &amp; Trace / ระบบติดตามใบขับขี่
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs text-slate-500 sm:justify-end">
                  <span className="text-[11px] sm:text-xs">
                    TH / EN – License Track &amp; Trace
                  </span>
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t">
              <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
                <span>© {new Date().getFullYear()} SiamEZ</span>
                <span className="text-slate-500">
                  Professional Thai Services
                </span>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
