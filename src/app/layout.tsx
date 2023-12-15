import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { AppContextProvider } from "./Context/AppContext";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import { useAppContext } from "./Context/AppContext";
import { SITE_URL } from "@/utils/service/constant";
import { ToastContainer } from "./nextToast";
import "react-toastify/dist/ReactToastify.min.css";
import PulseLoader from "@/components/atoms/pulseLoader";

export const metadata: Metadata = {
  title: "WaxChat",
  description: "connect chat and chill",
};

const userId = LOCAL_STORAGE.get("userId");

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col absolute w-[100vw] h-[100vh] items-center bg-[#d5d9db] bigScreen:overflow-hidden bigScreen:p-4">
        <div className="h-[25vh] w-full bg-themecolor absolute top-0"></div>
        <div className=" flex flex-col items-center w-full bigScreen:w-[95vw]  bigScreen:h-[95vh] mx-auto relative ">
          <ToastContainer />
          <AppContextProvider>
            <Suspense fallback={<PulseLoader />}>{children}</Suspense>
          </AppContextProvider>
        </div>
      </body>
    </html>
  );
}
