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
        alert('Password reset email sent successfully!');
      }
       else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
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
