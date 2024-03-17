import React, { useEffect } from 'react';

export default function Notification({ message, visible, onClose, bgColor }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(); // Hide notification after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const notiStyle = {
    position: 'fixed', top: 20, right: 20, background: bgColor ? bgColor : 'green', color: 'white', padding: '10px 20px'
  }

  return (
    <div style={notiStyle}>
      {message}
    </div>
  );
}
