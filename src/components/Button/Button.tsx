import React, { FC } from "react";
import style from "./Butto.module.scss"

export enum CardColor { 
    blue = 'blue',
    red = 'red'
}

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    color?: CardColor;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, type = "button",  color = CardColor.blue, onClick }) => {

    return (
        <button type={type} onClick={onClick} className={`${style.button} ${color ? style[color] : ''}`}>
            {children}
        </button>
    )
}

export default Button;