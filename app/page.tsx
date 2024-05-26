"use client";
import SearchContainer from "@/components/SearchContainer/SearchContainer";
import Image from "next/image";
import useLocation from "../hooks/useLocation";

export default function Home() {
  /* @ts-ignore TODO: Refactor link to address type error */
  const { loading } = useLocation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* @ts-ignore TODO: Refactor link to address type error */}
      <SearchContainer loading={loading} isHome={true} />
    </main>
  );
}
