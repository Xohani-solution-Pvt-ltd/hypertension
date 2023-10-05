// import Link from "next/link";
// import { useState, useRef } from "react";
// import { LockSVG, ColoredLock, CrossSVG, ProcessCircle } from "../assets/SVG/image";
// import { APP_INFO } from "../environments/index";
// import notify from "../helpers/notify";
// import ForgotPassword  from "./api/auth/forgotPassword";


// const ForgotPassword = () => {
//     const { TITLE } = APP_INFO;
//     const [email, setEmail] = useState("");
//     const [process, setProcess] = useState(false);
//     const emailRef = useRef<HTMLInputElement>(null);
  
//     const handleEmailChange = (e) => {
//       setEmail(e.target.value);
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       if (!emailRef.current.value) {
//         notify.error("Please enter your email address");
//         return;
//       }
//       setProcess(true);
//       const err = await ForgotPassword(email);
//       if (err) {
//         setTimeout(() => {
//           setProcess(false);
//         }, 1000);
//       }
//     };
  
//     return (
//       <div>
//         <h2>Forgot Password</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             ref={emailRef}
//             value={email}
//             onChange={handleEmailChange}
//             required
//           />
//           <button type="submit" disabled={process}>
//             {process ? "Processing..." : "Reset Password"}
//           </button>
//         </form>
//         <Link href="/login">Back to Login</Link>
//       </div>
//     );
//   };
  
//   export default ForgotPassword;
  


  // pages/ForgotPassword.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Container, Form, Button } from 'react-bootstrap';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [process, setProcess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('./api/auth/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Display a success message to the user
        alert('Password reset email sent successfully!');
      }
       else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <Container>
      <h1>Forgot Password</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        <Button type="submit" disabled={process}>
          {process ? 'Processing...' : 'Reset Password'}
        </Button>
      </Form>
      <Link href="/login">Back to Login</Link>
    </Container>
  );
}

export default ForgotPassword;
