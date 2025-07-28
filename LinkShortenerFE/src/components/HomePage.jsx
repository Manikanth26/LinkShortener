import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.notification) {
      setError(location.state.notification);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortLink('');
    setError('');

    try {
      const res = await fetch('https://linkshortener-fzu6.onrender.com/linkShortener', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortLink(data.shortLink);
      } else {
        setError(data.message || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="shortener-container">
      <h1 className="shortener-title">Link Shortener</h1>
      <div className="shortener-body">
        <div className="shortener-input-group">
          <label className="shortener-label" htmlFor="url-input">Enter URL to shorten:</label>
          <form className="shortener-form" onSubmit={handleSubmit}>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http://www.example.com"
              className="shortener-input"
            />
            <button type="submit" className="shortener-button">Shorten</button>
          </form>
        </div>
        {shortLink && (
          <div className="shortener-result">
            <span className="shortener-label" style={{ marginBottom: 0, marginRight: 5}}>Short link:</span>
            <span className="shortener-link">{shortLink}</span>
            <button className="shortener-copy" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
        {error && <div className="shortener-error">{error}</div>}
      </div>
    </div>

  );
};

export default HomePage;
