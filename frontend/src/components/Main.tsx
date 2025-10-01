import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MainProps {
    children: ReactNode;
    noPadding?: boolean;
    noYPadding?: boolean;
    itemsStart?: boolean;
}

export default function Main({ children, noPadding, noYPadding }: MainProps) {
    return (
        <div className="text-secondary font-semibold font-montserrat">
            <Header />
                <main className={`
                    min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-96px)] min-w-screen
                    bg-gradient-to-b from-[#F2E4D1] to-[#FAF7F2]
                    flex flex-col justify-center items-center
                    ${noPadding ? "" : "px-6"}
                    ${noYPadding ? "py-6" : "py-16"}
                `}>{children}</main>
            <Footer />
        </div>
    );
}