"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex-1 rounded-xl bg-muted/50 flex justify-start">
      <div className="flex flex-col">
        <Link href={"/playground"}>
          Playground
        </Link>
        <Link href={"/dashboard"}>
          Dashboard
        </Link>
        <Link href={"/test"}>
          Test
        </Link>
      </div>
    </div>
  );
}
