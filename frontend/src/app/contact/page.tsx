"use client";

import React, { useState } from "react";
import Main from "@/components/Main";
import Input, { Textarea } from "@/components/FormElements";
import Button from "@/components/Buttons";
import { EnvelopeIcon, UserIcon, ChatBubbleLeftIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import Notifications from "@/components/Notification";

export default function Contact() {
    const [loading, setLoading] = useState(true);
    const [contactForm, setContactForm] = useState({
        email: "",
        name: "",
        subject: "",
        message: "",
    });

    async function handleContact() {
        try {
            const res = await fetch("http://192.168.68.19:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactForm)
            });

            if (res.ok) {
                // @ts-ignore
                window.addNotification("Message sent!", "success");
            } else {
                // @ts-ignore
                window.addNotification(`Something went wrong: ${data.error}`, "error");
            }
        } catch (error) {
            console.error("Error:", error);
            // @ts-ignore
            window.addNotification(`Error: ${data.error}`, "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Notifications />
            <Main>
                <section className="w-full max-w-sm flex flex-col justify-center items-center">
                    <img src="/envelope.svg" className="h-20 w-20 md:h-20 md:w-20 mb-8" />
                    <h1 className="text-3xl md:text-4xl text-center mb-2">
                        Get In Touch!
                    </h1>
                    <p className="text-sm md:text-base text-zinc-600 font-medium text-center mb-12">
                        Have questions or feedback? We'd love to hear from you!
                    </p>
                    <Input
                        placeholder="Name"
                        icon={<UserIcon className="h-5 w-5" />}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        icon={<EnvelopeIcon className="h-5 w-5" />}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                    <Input
                        placeholder="Subject"
                        icon={<ClipboardIcon className="h-5 w-5" />}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    />
                    <Textarea
                        placeholder="Write your message here..."
                        icon={<ChatBubbleLeftIcon className="h-5 w-5" />}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                    <Button text="Send message" onClick={handleContact} />
                </section>
            </Main>
        </>
        
    );
}