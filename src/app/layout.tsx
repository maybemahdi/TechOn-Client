import MyContextProvider from "@/lib/MyContextProvider";
import SessionProviderForNextAuth from "@/nextAuth/SessionProviderForNextAuth";
import Providers from "@/Providers/Providers";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import logo from "@/assets/images/logo.png";
import CurrencyToggle from "@/components/shared/CurrencyToggle/CurrencyToggle";

export const metadata: Metadata = {
  title: "TechON 345",
  description:
    "The Cayman Islands’ newest destination for premium electronics. Fast. Local. Seamless.",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <MyContextProvider>
          <SessionProviderForNextAuth>
            <Providers>
              {children}
              <Toaster richColors />
              <CurrencyToggle />
            </Providers>
          </SessionProviderForNextAuth>
        </MyContextProvider>
      </body>
    </html>
  );
}
