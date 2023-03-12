import router from 'next/router';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


type AuthFormProps = {
  setError: (error: string) => void;
  isRegistration?: boolean;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  setError,
  isRegistration = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegistration) {
      localStorage.setItem('userData', JSON.stringify({ email, password }));
      router.push('/login?success=true');
    } else {
      const storedData = localStorage.getItem('userData');

      if (storedData) {
        const { email: storedEmail, password: storedPassword } =
          JSON.parse(storedData);

        if (email === storedEmail && password === storedPassword) {
          localStorage.setItem('isLoggedIn', 'true');
          router.push('/search');
        } else {
          setError('Incorrect email or password');
        }
      } else {
        setError('No registration data found. Please register first.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 body">
      <Form
        onSubmit={handleAuth}
        className="border-0 p-4 rounded bg-dark"
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-white">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="formBasicPassword">
          <Form.Label className="text-white">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button className="mt-3 w-100" variant="primary" type="submit">
          {isRegistration ? 'Register' : 'Log In'}
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
