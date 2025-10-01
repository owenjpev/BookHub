"use client";

import React, { useState } from "react";
import Main from "@/components/Main";
import Input from "@/components/FormElements";
import Button from "@/components/Buttons";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Notifications from "@/components/Notification";

export default function Signup() {
    const [loading, setLoading] = useState(true);
    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    async function handleSignup() {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupForm),
                credentials: "include"
            });

            const data = await res.json();

            if (res.ok) {
                // @ts-ignore
                window.addNotification("Signup successful! You can now login", "success");
            } else {
                // @ts-ignore
                window.addNotification(`Login failed! ${data.error}`, "error");
            }
        } catch (error) {
            console.error("Error:", error);
            // @ts-ignore
            window.addNotification(`Something went wrong: ${error}`, "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Notifications />
            <Main>
                <section className="w-full max-w-sm flex flex-col justify-center items-center">
                    <img src="/book.svg" className="h-20 w-20 md:h-24 md:w-24 mb-8" />
                    <h1 className="text-3xl md:text-4xl text-center mb-2">
                        Welcome in!
                    </h1>
                    <p className="text-sm md:text-base text-zinc-600 font-medium text-center mb-12">
                        Create an account to discover your next favorite book and manage your reading list
                    </p>
                    <Input
                        type="email"
                        placeholder="Email"
                        icon={<EnvelopeIcon className="h-5 w-5" />}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        icon={<LockClosedIcon className="h-5 w-5" />}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    />
                    <Input
                        type="password"
                        placeholder="Repeat password"
                        icon={<LockClosedIcon className="h-5 w-5" />}
                        onChange={(e) => setSignupForm({ ...signupForm, repeatPassword: e.target.value })}
                    />
                    <Button
                        text="Sign up"
                        onClick={handleSignup}
                    />
                </section>
            </Main>
        </>
    );
}