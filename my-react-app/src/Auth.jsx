import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={() => handleAuthentication(false)}>Se déconnecter</button>
      ) : (
        <>
          <SignUp onAuthentication={handleAuthentication} />
          <SignIn onAuthentication={handleAuthentication} />
        </>
      )}
    </div>
  );
};

export default Auth;
