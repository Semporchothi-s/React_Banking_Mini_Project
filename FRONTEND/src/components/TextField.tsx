import React from 'react'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    error?: string
}

const TextField = ({ name, label, error, ...rest }: TextFieldProps): React.ReactElement => {
    return (
        <>
            <label htmlFor={name} className="form-label text-muted">{label || name}</label>
            <input className='form-control' name={name} id={name} {...rest} />
            {error && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{error}</p>}
        </>
    )
}

export default TextField