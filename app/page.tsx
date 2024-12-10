"use client";

import Link from "next/link";
import DashboardPage from "./dashboard";

export default function Home() {

  return (
    <div className="bg-white w-full">
      <div className="lg:m-12 max-w-screen-lg">
        <DashboardPage />
        <footer className="lg:ms-14 mt-12">
          <div className="text-lg">By Jinwang Wu</div>
          <div className="text-lg">wujw2013@gmail.com</div>
          <div className="mt-4">Frontend source code:
            <Link
              href="https://github.com/wujinwang/vehicle-dashboard-react" className="text-red-600">
              React/Next/Tailwind
            </Link>
          </div>
          <div className="mt-1">Backend source code:
            <Link
              href="https://github.com/wujinwang/vehicle-dashboard-java" className="text-red-600">
              Java/Spring boot/MySQL
            </Link>
          </div>    
          <div className="mt-1">Go Backend:
            <Link
              href="/settings" className="text-red-600">
              Setting
            </Link>
          </div>
          <div className="mt-1">Version:1.0.0</div>
          <div className="mt-1">Release Date: Dec 10,2024  10:20:00 am</div>
        </footer>
      </div>
    </div>
  );
}


