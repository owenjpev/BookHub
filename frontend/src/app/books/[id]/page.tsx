"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Main from "@/components/Main";
import type { BookProps } from "@/components/Books";
import { FullBook, borrowBook } from "@/components/Books";

export default function BookPage() {
    const [book, setBook] = useState<BookProps | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    async function fetchBook() {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (res.ok) {
                setBook(data.book);
            } else {
                window.location.href = "/404";
            }
        } catch (error) {
            console.error("Error fetching book:", error);
            // @ts-ignore
            window.addNotification(`Error fetching book: ${error}`, "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBook();
    }, [id]);

    // Show loading state
    if (loading) {
        return (
            <Main>
                <div className="w-full max-w-4xl flex justify-center items-center h-96">
                    <p>Loading book details...</p>
                </div>
            </Main>
        );
    }

    // Show error if no book
    if (!book) {
        return (
            <Main>
                <div className="w-full max-w-4xl flex justify-center items-center h-96">
                    <p>Book not found</p>
                </div>
            </Main>
        );
    }

    // Only render FullBook when book exists
    return (
        <Main>
            <FullBook
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.image}
                genre={book.genre}
                rating={book.rating}
                onClick={() => borrowBook(book.id)}
                text="Borrow this book"
            />
        </Main>
    );
}