import Button from "../components/Button"
import TextField from "../components/TextField";
import '../App.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInScreen = (): React.ReactElement => {

    const [formField, setFormField] = useState({ email: "", password: "" });
    const [fieldError, setFieldError] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormField(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function validateField() {
        let errors = { email: "", password: "" };

        if (!formField.email) {
            errors.email = "email is required";
        }

        if (!formField.password) {
            errors.password = "Password is required";
        }

        setFieldError(errors);
        return Object.values(errors).every(value => value === "");
    }

    async function onLoginHandler(e?: React.FormEvent) {
        e?.preventDefault();

        if (!validateField()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/signin", formField);
            console.log("Login success:", response.data);
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Login failed:", err);
        }
    }

    function onRegisterNavigate() {
        navigate("/signup");
    }
    return (
        <div className='container'>
            <form onSubmit={onLoginHandler}>
                <h1>Login</h1>
                <TextField type="text" label="Email" name="email" value={formField.email} onChange={onChangeHandler} error={fieldError.email} />
                <TextField type="password" label="Password" name="password" value={formField.password} onChange={onChangeHandler} error={fieldError.password} />

                <ActionButtons onRegisterNavigate={onRegisterNavigate} />

            </form >
        </div >
    )
}

const ActionButtons = ({ onRegisterNavigate }: { onRegisterNavigate: () => void }): React.ReactElement => {

    return (
        <div className="d-flex flex-column">
            <Button color='primary' type="submit">
                Login to your account
            </Button>
            
            <Button color='link' onClick={onRegisterNavigate}>
                Don't have an account? Register here
            </Button>
        </div>
    )
}

export default SignInScreen;