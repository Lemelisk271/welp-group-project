import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="login-modal-container">
        <h1 className="login-modal-header">Sign in to Welp</h1>

        <p>Connect with great local businesses</p>
        <p>
          By proceeding, you agree to Welp's Terms of Service and acknowledge
          Welp's Privacy Policy.
        </p>
        <div>
          <ul className="login-modal-signin-buttons no-bullets">
            <li>
              <img src="https://placehold.co/340x44/FFFFFF/000000.png?text=Continue+with+Google" />
            </li>
            <li>
              <img src="https://placehold.co/340x44/000000/FFFFFF.png?text=Continue+with+Apple" />
            </li>
          </ul>
        </div>
        <div>
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <ul className="login-modal-signin-form no-bullets">
            <li>
              <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </li>
            <li>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </li>
            <li>
              <span>Forgot password?</span>
            </li>
            <li>
              <button type="submit">Log In</button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
