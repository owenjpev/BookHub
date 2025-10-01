import React, { ReactNode } from "react";

interface ButtonProps {
    text: string;
    icon?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    iconSecond?: boolean;
}

export default function Button({ text, icon, onClick, className, iconSecond }: ButtonProps) {
    return (
        <button
            className={`bg-primary px-6 py-2 text-secondary rounded-full flex justify-center items-center gap-2 cursor-pointer ${className ?? ""}`}
            onClick={onClick}
        >
        {iconSecond ? (
            <>
                {text}
                {icon}
            </>
        ) : (
            <>
                {icon}
                {text}
            </>
        )}
        </button>
    );
}


function OutlinedButton({ text, icon, onClick, className }: ButtonProps) {
    return (
        <button
            className={`bg-transparent px-6 py-2 text-primary border-2 border-primary rounded-full flex justify-center items-center gap-2 cursor-pointer ${className ?? ""}`}
            onClick={onClick}
        >
            {icon}
            {text}
        </button>
    );
}

function ClearButton({ text, icon, onClick, className }: ButtonProps) {
    return (
        <button
            className={`bg-transparent px-6 py-2 text-secondary rounded-full flex justify-center items-center gap-2 hover:bg-[#DAAA63] transition-colors duration-300 cursor-pointer ${className ?? ""}`}
            onClick={onClick}    
        >
            {icon}
            {text}
        </button>
    );
}

export { OutlinedButton, ClearButton }