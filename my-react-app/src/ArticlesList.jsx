// ArticlesList.jsx

import { useState, useEffect } from 'react';
import api from './api';
import PropTypes from 'prop-types'; // N'oubliez pas d'importer PropTypes
import { createArticle } from './api';

function ArticlesList({ user }) {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    console.log("Current user: ", user);  // Debug
    api.get('/articles').then(response => {
      console.log("Fetched articles: ", response.data);  // Debug
      setArticles(response.data);
    });
  }, []);

  const handleNewArticle = async () => {
    try {
      const articleDetails = {
        title: newTitle,
        content: newContent,
        userId: user.id, // Assurez-vous que ceci est correctement configuré dans votre backend
      };
      const response = await createArticle(articleDetails);
      console.log('Article créé:', response.data);
      setArticles([...articles, response.data]); // Ajouter le nouvel article à la liste
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  };

  return (
    <div>
      {user && (
        <>
          <button onClick={() => setShowForm(!showForm)}>Écrire un article</button>
          {showForm && (
            <form onSubmit={(e) => { e.preventDefault(); handleNewArticle(); }}>
              <input type="text" placeholder="Titre" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              <textarea placeholder="Contenu" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
              <button type="submit">Envoyer</button>
            </form>
          )}
        </>
      )}
      {articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}

ArticlesList.propTypes = {
  user: PropTypes.object,
};

export default ArticlesList;
