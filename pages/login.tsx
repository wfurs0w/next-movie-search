import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button } from 'react-bootstrap';
import { AuthForm } from '../components/AuthForm';
import { RegistrationForm } from '../components/RegistrationForm';
import Head from 'next/head';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [showRegistration, setShowRegistration] = useState(router.query.isRegistration === 'true');

  const handleToggleRegistration = () => setShowRegistration(!showRegistration);

  return (
    <>
      <Head>
        <title>Next TV</title>
      </Head>
      <div className="d-flex flex-column vh-100">
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="text-center p-4 bg-dark text-white">
          {showRegistration ? (
            <>
              Already have an account?{' '}
              <Button 
                variant="primary" 
                className="link-button danger" 
                onClick={handleToggleRegistration}
              >
                Log in here
              </Button>
            </>
          ) : (
            <>
              Don&apos;t have an account yet?{' '}
              <Button 
                variant="primary" 
                className="link-button" 
                onClick={handleToggleRegistration}
              >
                Register here
              </Button>
            </>
          )}
        </div>

        <div className="d-flex flex-column bg-dark" style={{ height: '100vh', overflow: 'hidden' }}>
        {showRegistration ? (
          <RegistrationForm setError={setError} />
        ) : (
          <AuthForm setError={setError} isRegistration={false} />
        )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;

