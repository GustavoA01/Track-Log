import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ThemeProvider } from "@wrksz/themes/next";
import { AppProviders } from "@/components/providers/AppProviders";
import { AppBottomNav } from "@/components/AppBottomNav";
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

const appName = "Track Log";
const appDescription =
  "Organize suas músicas, registre sessões de prática e acompanhe sua evolução musical.";

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: appDescription,
  applicationName: appName,
  keywords: [
    "prática musical",
    "estudo de música",
    "sessões de prática",
    "repertório",
    "violão",
    "guitarra",
    "piano",
    "track log",
  ],
  authors: [{ name: "Gustavo Aguiar" }],
  creator: "Gustavo Aguiar",
  publisher: appName,
  category: "music",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: appName,
    title: appName,
    description: appDescription,
    images: [
      {
        url: "/logo.jpg",
        alt: appName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: appName,
    description: appDescription,
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="pt-BR"
    suppressHydrationWarning
    className={cn("h-full antialiased", inter.variable, montserrat.variable)}
  >
    <body className="min-h-full font-sans overflow-x-hidden">
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <AppProviders>
          {children}
          <AppBottomNav />
        </AppProviders>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
