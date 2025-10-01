import React, { ReactNode } from "react";

interface InputProps {
    type?: "text" | "number" | "email" | "password" | "date";
    placeholder?: string;
    icon?: ReactNode;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaProps {
    placeholder?: string;
    icon?: ReactNode;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Input({ type = "text", value, placeholder, icon, onChange }: InputProps) {
    return (
        <div className="w-full relative mb-4">
            <input
                placeholder={placeholder}
                className="w-full bg-white rounded-full small-shadow placeholder-zinc-500 py-3 pl-10 pr-4 font-normal outline-none"
                onChange={onChange}
                type={type}
                value={value}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-4 text-zinc-500">
                {icon}
            </div>
        </div>
    );
}

function Textarea({ value, placeholder, icon, onChange }: TextareaProps) {
    return (
        <div className="w-full relative mb-4">
            <textarea
                placeholder={placeholder}
                className="w-full bg-white rounded-3xl small-shadow placeholder-zinc-500 py-3 pl-10 pr-4 font-normal outline-none h-38 resize-none"
                onChange={onChange}
                value={value}
            >
            </textarea>
            <div className="absolute top-4 left-4 text-zinc-500">
                {icon}
            </div>
        </div>
    );
}

export { Textarea }