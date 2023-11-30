import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "WaxChat",
  description: "connect chat and chill",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="flex flex-col h-screen absolute w-[100vw] items-center">
      <div className="h-[32vh] w-full bg-themecolor absolute top-0"></div>
      <div className=" flex flex-col items-center w-full mx-auto relative ">
        {children}
      </div>
    </body>
  );
}
