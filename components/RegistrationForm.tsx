import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AuthForm } from './AuthForm';

type RegistrationFormProps = {
  setError: (error: string) => void;
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setError,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem('userData', JSON.stringify({ email, password }));
    setShowAuthForm(true);
  };

  if (showAuthForm) {
    return <AuthForm setError={setError} isRegistration={false} />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 body">
      <Form onSubmit={handleRegistration} className="border-0 p-4 rounded bg-white">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button 
          className="mt-3 w-100" 
          variant="primary" 
          type="submit"
        >
          Register
        </Button>
      </Form>

      <style jsx>{`
        .body {
          background: linear-gradient(45deg, #e6f2ff, #ffffff);
        }
      `}</style>
    </div>
  );
};
