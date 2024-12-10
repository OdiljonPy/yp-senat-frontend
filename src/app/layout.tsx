import type { Metadata } from "next";
import Script from 'next/script';
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TanstackProvider } from "@/components/providers/TanstackProvider"
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { AccessibilityProvider } from "@/contexts/accessibility-context";
import { AccessibilityWidget } from "@/components/shared/AccessibilityWidget";
import AOSProvider from "@/components/providers/AOSProvider";

const geistSans = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Inter({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Yoshlar Parlamenti",
  description: "Oʻzbekiston Respublikasi Oliy Majlisi Senati huzuridagi Yoshlar Parlamenti – yoshlar manfaatlarini himoya qiluvchi va ularning ovozini davlat boshqaruvi darajasiga yetkazuvchi maxsus platforma.  Yoshlar Parlamenti yoshlarning imkoniyatlarini kengaytirish va jamiyatning ijtimoiy-iqtisodiy rivojlanish",
  icons: {
    icon: "/icons/logo.svg",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <Script
          id="replain-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.replainSettings = { id: 'bc162a83-69cc-48f1-8a21-107f035a62f5' };
              (function(u){
                var s=document.createElement('script');
                s.async=true;s.src=u;
                var x=document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s,x);
              })('https://widget.replain.cc/dist/client.js');
            `,
          }}
        />
      </head>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-ESZ2B1CG8H'} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AccessibilityProvider>
          <NextIntlClientProvider messages={messages}>
            <AOSProvider>
              <TanstackProvider>
                <Header />
                <AccessibilityWidget />
                {children}
                <Footer />
              </TanstackProvider>
            </AOSProvider>
          </NextIntlClientProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
