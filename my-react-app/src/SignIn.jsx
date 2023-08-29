import { useState } from 'react';
import { signIn } from './api';
import PropTypes from 'prop-types';

const SignIn = ({ onAuthentication }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn({ email, password });
      console.log('Connexion réussie:', response.data);
      onAuthentication(true, response.data);
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Se connecter</button>
    </form>
  );
};

SignIn.propTypes = {
  onAuthentication: PropTypes.func.isRequired,
};

export default SignIn;
