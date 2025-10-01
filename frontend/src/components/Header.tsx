"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button, { ClearButton } from "@/components/Buttons";
import { BookOpenIcon, InformationCircleIcon, UserIcon, Bars3Icon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const [showNav, setShowNav] = useState(false)

    return (
        <>
            <button
                className={`
                    absolute min-h-screen min-w-screen bg-black z-200
                    transition-opacity duration-300
                    ${showNav ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setShowNav(false)}
            ></button>
            <nav
                className={`
                    fixed min-h-screen w-64 transition-left duration-300 bg-main z-201
                    ${showNav ? "left-0" : "-left-64"}
                `}
            >
                <div className="w-full px-6 py-6">
                    <Link href="/" className="text-2xl md:text-3xl">BookHub</Link>
                    <div className="space-y-6 mt-12 mb-8">
                        <Link href="/books" className="w-full flex justify-start items-center gap-2 text-secondary font-regular">
                            <BookOpenIcon className="h-5 w-5" />
                            Books
                        </Link>
                        <Link href="/my-books" className="w-full flex justify-start items-center gap-2 text-secondary font-regular">
                            <UserIcon className="h-5 w-5" />
                            Login
                        </Link>
                        <Link href="/about" className="w-full flex justify-start items-center gap-2 text-secondary font-regular">
                            <InformationCircleIcon className="h-5 w-5" />
                            About
                        </Link>
                        <Link href="/contact" className="w-full flex justify-start items-center gap-2 text-secondary font-regular">
                            <EnvelopeIcon className="h-5 w-5" />
                            Contact
                        </Link>
                    </div>
                    <p className="mb-2">Follow us!</p>
                    <div className="w-full flex flex-wrap gap-2">
                        <Link href="https://www.youtube.com">
                            <img src="/youtube.svg" className="h-8" />
                        </Link>
                        <Link href="https://www.twitter.com">
                            <img src="/twitter.svg" className="h-8" />
                        </Link>
                        <Link href="https://www.instagram.com">
                            <img src="/instagram.svg" className="h-8" />
                        </Link>
                        <Link href="https://www.facebook.com">
                            <img src="/facebook.svg" className="h-8" />
                        </Link>
                    </div>
                </div>
            </nav>
            <header className="w-full bg-main h-16 md:h-24 px-6 flex justify-center items-center">
                <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-3">
                    <Link href="/" className="text-2xl md:text-3xl">BookHub</Link>
                    <div className="w-full hidden md:flex justify-center items-center gap-4">
                        <Link href="/books">
                            <Button 
                                text="Books" 
                                icon={<BookOpenIcon className="h-5 w-5" />} 
                            />
                        </Link>
                        <Link href="/about">
                            <ClearButton 
                                text="About" 
                                icon={<InformationCircleIcon className="h-5 w-5" />} 
                            />
                        </Link>
                    </div>
                    <div className="w-full flex justify-end items-center gap-4">
                        <Link href="/contact" className="hidden md:block">
                            <EnvelopeIcon className="h-6 w-6" />
                        </Link>

                        <Link href="/my-books" className="hidden md:block">
                            <UserIcon className="h-6 w-6" />
                        </Link>

                        <button onClick={() => setShowNav(prev => !prev)} className="md:hidden">
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}