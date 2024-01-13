"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  if (typeof window === "undefined") return;

  return (
    <div className=" flex justify-center items-center mt-64 mx-auto flex-col gap-8 ">
      <h2 className=" text-red-700">Something went wrong!</h2>
      <button
        className=" py-5 px-10 bg-ctitle/20 rounded-[14px] ring-1 ring-themecolor"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
