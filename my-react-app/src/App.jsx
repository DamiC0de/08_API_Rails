import { useState } from 'react';
import ArticlesList from './ArticlesList';
import Auth from './Auth';

function App() {
  const [user, setUser] = useState(null);

  const handleAuthentication = (isAuthenticated, userData) => {
    if (isAuthenticated) {
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  return (
    <div>
      <h1>My Blog</h1>
      <Auth onAuthentication={handleAuthentication} />
      <ArticlesList user={user} />
    </div>
  );
}

export default App;
