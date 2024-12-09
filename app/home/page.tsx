"use client";

import Link from "next/link";


export default function DashboardPage() {

  return (
    <div className="h-96">
      <h1>Blank here....</h1>
      <div className="mt-1">Go Frontend:
        <Link
          href="/" className="text-red-600">
          Go to vehicle dashboard demo
        </Link></div>
      <div className="mt-1">Go Setting:
        <Link
          href="/settings" className="text-red-600">
          Setting
        </Link>
      </div>
    </div>
  );
}


