import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import PropTypes from 'prop-types';

const Auth = ({ onAuthentication }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = (status, userData) => {
    setIsAuthenticated(status);
    onAuthentication(status, userData);
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

Auth.propTypes = {
  onAuthentication: PropTypes.func.isRequired,
};

export default Auth;
