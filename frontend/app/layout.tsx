import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { fonts } from "@/lib/fonts";
import { cn } from "@/utils/cn";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "StarkNote",
  description: "Your favorite electronic notebook",
  abstract: "Your favorite electronic notebook",
  creator: "Emmanuel Odewale",
  category: "web app",
  generator: "Next.js",
  publisher: "vercel",
  applicationName: "StarkNote",
  keywords: ["Note App", "e-note", "diary", "todo"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "StarkNote",
    description: "Your favorite electronic notebook",
    url: "https://starknote.vercel.app/",
    siteName: "StarkNote",
    images: [
      { url: "https://i.postimg.cc/433jZwzN/Screenshot-2025-08-10-181742.png" },
    ],
  },
  authors: [
    { name: "Emmanuel Odewale", url: "https://github.com/Odewale-Emmanuel" },
  ],
  icons: {
    icon: "../public/assets/starknotes-logo-large.png",
    shortcut: "../public/assets/starknotes-logo-large.png",
    apple: "../public/assets/starknotes-logo-large.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://starknote.vercel.app/",
    creator: "Emmanuel Odewale",
    images: "https://i.postimg.cc/433jZwzN/Screenshot-2025-08-10-181742.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fonts.geistSans.variable,
          fonts.geistMono.variable,
          "antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
