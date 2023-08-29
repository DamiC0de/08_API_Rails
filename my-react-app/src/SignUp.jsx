import { useState } from 'react';
import { signUp } from './api';
import PropTypes from 'prop-types';

const SignUp = ({ onAuthentication }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUp({
        email,
        password,
        password_confirmation: passwordConfirmation
      });
      console.log('Inscription réussie:', response.data);
      onAuthentication(true, response.data);
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirmation du mot de passe" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      <button type="submit">Inscription</button>
    </form>
  );
};

SignUp.propTypes = {
  onAuthentication: PropTypes.func.isRequired,
};

export default SignUp;

