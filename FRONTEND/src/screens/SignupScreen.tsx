import Button from "../components/Button"
import TextField from "../components/TextField";
import Container from "../components/Container"
import '../App.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupScreen = (): React.ReactElement => {

    const [formField, setFormField] = useState({
        email: "",
        name: "",
        accountNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [FieldError, setFieldError] = useState({ email: "", name: "", accountNumber: "", password: "", confirmPassword: "" })
    const navigate = useNavigate();

    function validateField() {
        let errors = { email: "", name: "", accountNumber: "", password: "", confirmPassword: "" }

        if (!formField.email) {
            errors.email = "email is required";
        }

        if (!formField.name) {
            errors.name = "name is required";
        }

        if (!formField.accountNumber) {
            errors.accountNumber = "Account number is required";
        }

        if (!formField.password) {
            errors.password = "Password is required";
        }

        if (!formField.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        }

        if (formField.password !== formField.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFieldError(errors);
        return Object.values(errors).every(value => value === "");
    }

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormField(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function onSignupHandler() {
        if (!validateField()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/signup",
                formField
            );
            console.log("Signup success:", response.data);
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Signup failed:", err);
        }
    }

    function onLoginNavigate() {
        navigate("/");
    }

    return (
        <div className='container'>
            <form onSubmit={(e) => e.preventDefault()}>
                <h1>Register</h1>
                <TextField type="text" name="email" value={formField.email} onChange={onChangeHandler} error={FieldError.email} />
                <TextField type="text" name="name" value={formField.name} onChange={onChangeHandler} error={FieldError.name} />
                <TextField type="text" name="accountNumber" value={formField.accountNumber} onChange={onChangeHandler} error={FieldError.accountNumber} />
                <TextField type="password" name="password" value={formField.password} onChange={onChangeHandler} error={FieldError.password} />
                <TextField type="password" name="confirmPassword" value={formField.confirmPassword} onChange={onChangeHandler} error={FieldError.confirmPassword} />
                <Container height={24} width={0} />
                <Button color='primary' onClick={onSignupHandler}>
                    Sign up
                </Button>
                <Container height={10} width={0} />
                <Button color='link' onClick={onLoginNavigate}>
                    Already have an account? Login here
                </Button>
            </form>
        </div>
    )
}

export default SignupScreen;
