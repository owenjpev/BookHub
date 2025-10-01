import Link from "next/link";
import React, { useState } from "react";
import Button, { OutlinedButton, ClearButton } from "@/components/Buttons";
import { StarIcon } from "@heroicons/react/24/outline";

export interface BookProps {
    id?: string;
    image?: string;
    rating?: number;
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    price?: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
}

export default function Book({ id, image, title, author, rating = 0, price, onClick, text }: BookProps) {
    const fullStars = Math.round(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className="w-full flex justify-start items-stretch gap-10">
            <Link href={`/books/${id}`} className="w-full relative">
                <img
                    src={image}
                    className="w-full image-shadow"
                />
            </Link>
            <div className="w-full flex flex-col justify-between items-start">
                <div className="w-full">
                    <div className="w-full flex justify-start items-center gap-1 mb-6">
                        {[...Array(fullStars)].map((_, index) => (
                            <StarIcon key={`full-${index}`} className="h-3 w-3 text-primary" />
                        ))}
                        {[...Array(emptyStars)].map((_, index) => (
                            <StarIcon key={`empty-${index}`} className="h-3 w-3 text-zinc-400" />
                        ))}
                    </div>
                    <h3 className="text-lg md:text-xl mb-2">{title}</h3>
                    <p className="text-zinc-500 font-normal">{author}</p>
                    {price && (<p className="mt-1 text-xs font-medium text-zinc-500">${price}</p>)}
                </div>
                <div></div>
                <OutlinedButton text={text} onClick={onClick} />
            </div>
        </div>
    );
}

function FullBook({ image, title, description, author, rating = 0, price, genre, onClick, text }: BookProps) {
    const [showReviews, setShowReviews] = useState(false)
    const fullStars = Math.round(rating);
    const emptyStars = 5 - fullStars;

    return (
        <section className="w-full max-w-4xl flex justify-center items-start gap-12 flex-wrap md:flex-nowrap">
            <div className="w-full">
                <img
                    src={image}
                    className="w-full image-shadow"
                />
            </div>
            <div className="w-full">
                <div className="w-full flex justify-start items-center gap-1 mb-6">
                    {[...Array(fullStars)].map((_, index) => (
                        <StarIcon key={`full-${index}`} className="h-4 w-4 text-primary" />
                    ))}
                    {[...Array(emptyStars)].map((_, index) => (
                        <StarIcon key={`empty-${index}`} className="h-4 w-4 text-zinc-500" />
                    ))}
                </div>

                <h1 className="text-3xl md:text-4xl mb-2">{title}</h1>
                <div className="text-zinc-500 font-medium mb-8">{author}</div>

                <OutlinedButton text={text} onClick={onClick} className="mb-8" />

                <div className="w-full flex justify-start items-center gap-4 mb-6">
                    {showReviews && (<ClearButton text="Description" onClick={(e) => setShowReviews(false)} />)}
                    {showReviews === false && (<Button text="Description" onClick={(e) => setShowReviews(true)} />)}
                    {showReviews && (<Button text="Reviews (48)" onClick={(e) => setShowReviews(false)} />)}
                    {showReviews === false && (<ClearButton text="Reviews (48)" onClick={(e) => setShowReviews(true)} />)}
                </div>

                {showReviews === false && (
                    <div className="font-medium">
                        {description}
                    </div>
                )}
                
                {showReviews && (
                    <div className="grid grid-cols-1 gap-12">
                        <p className="font-medium text-secondary">Reviews will appear here...</p>
                    </div>
                )}
            </div>
        </section>
    );
}

// Temporary static review component
function Review() {
    return (
        <div>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="font-medium">Owen</p>
                    <p className="text-xs font-normal">17/08/2025 2:09pm</p>
                </div>
                <div className="flex justify-center items-center">
                    <StarIcon className="h-4 w-4 text-primary" />
                    <StarIcon className="h-4 w-4 text-primary" />
                    <StarIcon className="h-4 w-4 text-primary" />
                    <StarIcon className="h-4 w-4 text-primary" />
                    <StarIcon className="h-4 w-4 text-zinc-500" />
                </div>
            </div>
            <p className="font-medium text-sm">
                The Hobbit by J.R.R. Tolkien is a fantasy adventure about Bilbo Baggins, a reluctant hobbit who joins a group of dwarves on a quest to reclaim their treasure from the dragon Smaug, facing trolls, goblins, elves, and other perils along the way.
            </p>
        </div>
    );
}

async function borrowBook(id = "") {
    try {
        const res = await fetch(`http://localhost:5000/api/borrow/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const data = await res.json();

        if (res.ok) {
            // @ts-ignore
            window.addNotification("Book borrowed successfully!", "success");
        } else {
            // @ts-ignore
            window.addNotification(`Error: ${data.error}`, "error");
        }
    } catch (error) {
        console.error("Error borrowing book:", error);
        // @ts-ignore
        window.addNotification(`Error: ${data.error}`, "error");
    }
}

async function returnBook(id = "") {
    try {
        const res = await fetch(`http://localhost:5000/api/borrow/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const data = await res.json();

        if (res.ok) {
            // @ts-ignore
            window.addNotification("Book returned successfully!", "success");
        } else {
            // @ts-ignore
            window.addNotification(`Error: ${data.error}`, "error");
        }
    } catch (error) {
        console.error("Error borrowing book:", error);
        // @ts-ignore
        window.addNotification(`Error: ${data.error}`, "error");
    }
}

export { FullBook, Review, borrowBook, returnBook }