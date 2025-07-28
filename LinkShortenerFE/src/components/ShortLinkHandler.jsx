import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ShortLinkHandler.css';

const ShortLinkHandler = () => {
  const { shortLink } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shortLink) return;
    fetch(`https://linkshortener-fzu6.onrender.com/${shortLink}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.originalUrl) {
          window.location.href = data.originalUrl;
        } else {
          setNotification(data.message || "Short link not found or expired.");
          setLoading(false);
        }
      })
      .catch(() => {
        setNotification("Something went wrong. Try again.");
        setLoading(false);
      });
  }, [shortLink]);

  useEffect(() => {
    if (!loading && notification) {
      if (countdown === 0) {
        navigate("/");
        return;
      }
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, loading, notification, navigate]);

  if (loading) {
    return (
      <div className="handler-container">
        <div className="handler-card">
          <h2 className="handler-title">Redirecting...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="handler-container">
      <div className="handler-card">
        <h2 className="handler-title">Notification</h2>
        <div className="handler-message">{notification}</div>
        <div className="handler-countdown">
          You will be redirected to the home page in <b>{countdown}</b> second{countdown !== 1 ? 's' : ''}.
        </div>
      </div>
    </div>
  );
};

export default ShortLinkHandler;
