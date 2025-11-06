import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} React. Всі права захищені.</p>
        <div className="footer-links">
          <a href="#">Політика конфіденційності</a>
          <a href="#">Контакти</a>
          <a href="#">Про нас</a>
        </div>
      </div>
    </footer>
  );
}