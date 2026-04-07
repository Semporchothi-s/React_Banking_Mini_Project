import React from 'react';

interface ButtonProps {
    children: string
    color: 'primary' | 'secondary' | 'link'
    onClick?: (e?: React.MouseEvent | React.FormEvent) => void
    type?: "button" | "submit" | "reset"
}

const Button = (props: ButtonProps): React.ReactElement => {
    return(
        <button type={props.type || "button"} className={'btn mt-4 btn-' + props.color} onClick={props.onClick}>
           {props.children} 
        </button>
    )
}

export default Button;