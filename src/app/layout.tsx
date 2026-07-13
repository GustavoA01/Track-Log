import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ThemeProvider } from "@wrksz/themes/next";
import { AppProviders } from "@/components/providers/AppProviders";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Track Log",
  description: "Acompanhe suas músicas, sessões de estudo e evolução musical",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="pt-BR"
    suppressHydrationWarning
    className={cn("h-full antialiased", inter.variable, montserrat.variable)}
  >
    <body className="min-h-full font-sans">
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <AppProviders>{children}</AppProviders>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
