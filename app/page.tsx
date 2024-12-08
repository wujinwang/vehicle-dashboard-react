"use client";

import DashboardPage from "./dashboard";

export default function Home() {

  return (
    <div className="bg-white w-full">
      <div className="lg:m-12 max-w-screen-lg">
        <DashboardPage />
        <footer className="lg:ms-14 mt-12">
          <div className="text-lg">By Jinwang Wu</div>
          <div className="text-lg">wujw2013@gmail.com</div>
          <div className="mt-4">Frontend source code: <a href="https://github.com/wujinwang/vehicle-dashboard-react" className="text-red-600">React/Next/Tailwind</a></div>
          <div className="mt-1">Backend source code: <a href="https://github.com/wujinwang/vehicle-dashboard-java" className="text-red-600">Java/Spring boot/MySQL</a></div>
          <div className="mt-1">Version:0.9</div>

          <div className="mt-1">Go Backend: <a href="/settings" className="text-red-600">Settings</a></div>

        </footer>
      </div>
    </div>
  );
}


