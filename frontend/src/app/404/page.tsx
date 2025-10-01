"use client";

import React from "react";
import Main from "@/components/Main";
import Button from "@/components/Buttons";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function ErrorPage() {
    return (
        <Main>
            <section className="w-full max-w-sm flex flex-col justify-center items-center">
                <img src="/page.svg" className="h-20 w-20 md:h-20 md:w-20 mb-8" />
                <h1 className="text-3xl md:text-4xl text-center mb-8">
                    Page Not Found
                </h1>
                <p className="text-sm md:text-base text-zinc-600 font-medium text-center mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.<br /><br />
                    Don't worry, you can always head back to our homepage to continue exploring our book collection, or use the search bar to find what you're looking for.
                </p>
                <Link href="/">
                    <Button text="Back Home" icon={<HomeIcon className="h-5 w-5" />} />
                </Link>
            </section>
        </Main>
    );
}