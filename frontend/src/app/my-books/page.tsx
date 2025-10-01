"use client";

import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Main from "@/components/Main";
import Input from "@/components/FormElements";
import type { BookProps } from "@/components/Books";
import Book, { returnBook } from "@/components/Books";
import Notifications from "@/components/Notification";

export default function MyBooks() {
    const [books, setBooks] = useState<BookProps[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    async function fetchBooks(search = "") {
        try {
            setLoading(true)
            const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
            const url = `http://localhost:5000/api/my-books${searchParam}`;
            
            const res = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();

            if (res.ok) {
                setBooks(data.books);
            } else if (res.status === 401) {
                window.location.href = "/login";
            } else {
                setBooks([]);
                // @ts-ignore
                window.addNotification(`Something went wrong: ${data.error}`, "error");
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
            // @ts-ignore
            window.addNotification(`Error fetching books: ${error}`, "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            fetchBooks(searchTerm);
        }, 500)

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>
            <Notifications />
            <Main>
                <div className="w-full max-w-7xl mb-8">
                    <div className="w-full mb-8">
                        <h1 className="text-center text-4xl md:text-5xl mb-4">Our Collection</h1>
                        <p className="text-center text-sm md:text-base font-medium mb-8">Discover thousands of books across all genres. Find your next favorite read today.</p>
                        <div className="mx-auto w-full max-w-sm">
                            <Input
                                placeholder="Search titles, authors, or genres..."
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <section className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {books.map((book) => (
                        <Book
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            image={book.image}
                            genre={book.genre}
                            rating={book.rating}
                            onClick={() => returnBook(book.id)}
                            text="Return"
                        />
                    ))}
                </section>
            </Main>
        </>
    );
}