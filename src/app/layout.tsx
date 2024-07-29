import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TIC_TAC_TOE } from "./const";
import { ThemeProvider } from "@/components/theme-provider";
import { DotBackground } from "@/components/ui/dot-grid-pattern";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: TIC_TAC_TOE,
  description: "Generated by next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <DotBackground />
      </body>
    </html>
  );
}
