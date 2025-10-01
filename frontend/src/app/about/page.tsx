import React from "react";
import Main from "@/components/Main";
import Input from "@/components/FormElements";
import Button from "@/components/Buttons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function About() {
    return (
        <Main>
            <h1 className="text-center text-4xl md:text-5xl mb-16 md:mb-16">About Us!</h1>
            <div className="w-full max-w-4xl space-y-24">

                <div className="w-full flex flex-col justify-center items-center">
                    <img src="/rocket.svg" className="h-24 w-24 mb-6" />
                    <h3 className="text-3xl md:text-4xl text-center mb-2">
                        Our Mission
                    </h3>
                    <p className="font-medium text-center">
                        At BookHub, we believe that every reader deserves to find their next favorite book. We're passionate about connecting readers with stories that inspire, educate, and entertain.
                    </p>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                    <img src="/book.svg" className="h-16 w-16 mb-8" />
                    <h3 className="text-3xl md:text-4xl text-center mb-2">
                        Our Story
                    </h3>
                    <p className="font-medium text-center">
                        Founded in 2024, BookHub started as a simple idea: make book discovery easier and more enjoyable. What began as a passion project has grown into a community of book lovers sharing recommendations and reviews.
                    </p>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                    <img src="/people.svg" className="h-32 w-32 mb-4" />
                    <h3 className="text-3xl md:text-4xl text-center mb-2">
                        What We Stand For
                    </h3>
                    <p className="font-medium text-center">
                        Curated Selection: Every book is hand-picked by our team
                        Reader First: Your reading experience is our priority
                        Community: Connect with fellow book enthusiasts
                        Discovery: Find hidden gems and classics alike
                    </p>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                    <img src="/megaphone.svg" className="h-24 w-24 mb-6" />
                    <h3 className="text-3xl md:text-4xl text-center mb-3">
                        Join Us!
                    </h3>
                    <p className="font-medium text-center mb-6">
                        Ready to discover your next great read?<br />
                        Sign up today and start your BookHub journey.
                    </p>
                    <div className="w-full max-w-md flex flex-col justify-center items-center">
                        <Input placeholder="johndoe@example.com" icon={<EnvelopeIcon className="h-5 w-5" />} />
                        <Button text="Sign up to our newsletter" />
                    </div>
                </div>

            </div>
        </Main>
    );
}