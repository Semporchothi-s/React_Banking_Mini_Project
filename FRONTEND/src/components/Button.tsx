import React from 'react';

interface ButtonProps {
    children: string
    color: 'primary' | 'secondary' | 'link'
    onClick: () => void
}

const Button = (props: ButtonProps): React.ReactElement => {
    return(
        <button className={'btn mt-4 btn-' + props.color} onClick={props.onClick}>
           {props.children} 
        </button>
    )
}

export default Button;