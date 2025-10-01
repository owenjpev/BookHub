"use client";

import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Main from "@/components/Main";
import type { BookProps } from "@/components/Books";
import Book, { borrowBook } from "@/components/Books";
import Button from "@/components/Buttons";
import Link from "next/link";
import Notifications from "@/components/Notification";

export default function Home() {
    const [books, setBooks] = useState<BookProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchBooks() {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/books", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();

            if (res.ok) {
                setBooks(data.books);
            } else {
                setBooks([]);
            }
        } catch (error) {
            // @ts-ignore
            window.addNotification(`Error fetching books: ${error}`, "error");
            console.error("Error fetching books:", error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>
            <Notifications />
            <Main noPadding={true}>
                <section className="w-full h-[calc(100vh-64px)] md:h-128 relative">
                    <div className="w-full p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                        <div className="w-full max-w-7xl relative flex flex-col justify-center items-center md:justify-between md:items-center flex-wrap md:flex-nowrap md:flex-row gap-8">
                            <div className="w-full max-w-sm flex flex-col justify-center items-center md:items-start">
                                <h1 className="text-center md:text-left text-4xl md:text-6xl w-full max-w-sm mb-3">New & Trending</h1>
                                <p className="text-center md:text-left text-zinc-500 mb-6 font-medium">Explore new worlds from authors</p>
                                <Link href="/books">
                                    <Button
                                        iconSecond={true}
                                        text="Browse 1,234+ books"
                                        icon={<ArrowRightIcon className="h-5 w-5" />}
                                        className="px-8 py-3"
                                    />
                                </Link>
                            </div>
                            <img src="/reading-book.webp" className="w-128" />
                        </div>
                    </div>
                </section>
                <section className="w-full px-6 py-16 flex justify-center items-center">
                    <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-32">
                        {books.slice(0, 3).map((book) => (
                            <Book
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                image={book.image}
                                genre={book.genre}
                                rating={book.rating}
                                onClick={() => borrowBook(book.id)}
                                text="Borrow"
                            />
                        ))}
                    </div>
                </section>
            </Main>
        </>
    );
}