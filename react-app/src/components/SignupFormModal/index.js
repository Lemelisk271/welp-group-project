import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (password === confirmPassword) {
        if (!confirmPassword) {
            const data = await dispatch(signUp(firstName, lastName, email, password, zipCode));
            if (data) {
                setErrors(data);
            } else {
                closeModal();
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
    };

    return (
        <>
            <h1>Sign up for Welp</h1>
            <p>
                By proceeding, you agree to Yelp’s Terms of Service and
                acknowledge Yelp’s Privacy Policy.
            </p>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="signup-form-names">
                    <input
                        className="half-width"
                        type="text"
                        value={firstName}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        className="half-width"
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        /> */}
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={zipCode}
                    placeholder="ZIP Code"
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                />
                <button className="big-red-button" type="submit">
                    Sign up
                </button>
            </form>
        </>
    );
}

export default SignupFormModal;
