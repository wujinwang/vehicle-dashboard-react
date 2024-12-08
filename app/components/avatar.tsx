'use client'
import React, { useState } from 'react'
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';


const Avatar = () => {
    const [toggle, setToggle] = useState(false);

    const toggleAvatar = () => {
        setToggle(!toggle);
    }

    const closeAvatar = () => {
        setToggle(false);
    }

    return (
        <div className="ml-auto flex items-center gap-4">
            <div className="relative inline-block">
                <Button className="rounded-full" size="icon" variant="ghost" onClick={toggleAvatar}>
                    <Image alt="Avatar" className="rounded-full" height="32" src="/placeholder-user.jpg"
                        style={{
                            aspectRatio: '32/32',
                            objectFit: 'cover',
                        }} width="32" />
                    <span className="sr-only">View profile</span>
                </Button>

                {toggle && (
                    <div className="origin-top-right absolute right-10 -mt-4 w-36 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li className="border-b">
                                <a href="#" className="block px-4 py-2 text-sm hover:bg-green-100  rounded-t-lg" onClick={closeAvatar}>
                                    Your Profile
                                </a>
                            </li>
                            <li className="border-b">
                                <a href="#" className="block px-4 py-2 text-sm hover:bg-green-100" onClick={closeAvatar}>
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm hover:bg-green-100  rounded-b-lg">
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Avatar;