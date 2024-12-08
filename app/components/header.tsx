"use client"

import Link from 'next/link';
import Avatar from './avatar';
import { Logo } from './ui/icons';

export default function Header() {

    return (
        <header className="flex h-16 items-center border-b px-1 md:gap-4 bg-gray-800">
            <Link className="flex items-center rounded-md px-2 py-2 " href="#">
                <Logo className="m-4" />
                <span className="sr-only">Home</span>
            </Link>
            <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 mt-1">
                    <Link
                        href="/home" className="text-gray-300 hover:bg-gray-500 hover:text-white rounded-md px-3 py-1 text-md font-medium ">
                        Home
                    </Link>

                    <Link
                        href="/settings" className="text-gray-300 hover:bg-gray-500 hover:text-white rounded-md px-3 py-1 text-md font-medium bg-gray-600">
                        Setting
                    </Link>

                </div>

            </div>
            <div className="ml-auto flex items-center gap-4">
                <div className="flex inline-block">
                    <Avatar />
                </div>
            </div>
        </header>
    );
}
