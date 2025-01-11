import okbglitch from './images/okbglitch.png';
import './App.css';
import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoundcloud, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [text, setText] = useState('');
  const words = useMemo(() => ['taishiro', 'taishi.ro'], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typeSpeed = 150;
    const deleteSpeed = 100;
    const pauseTime = 2000;

    const type = () => {
      const currentWord = words[wordIndex];
      
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setInterval(type, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearInterval(timer);
  }, [text, wordIndex, isDeleting, words]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={okbglitch} alt="pfp" />
        <div className="typing-text">
          {text}
          <span className="cursor">|</span>
        </div>
        <div className="social-icons">
          <a href="https://www.instagram.com/taishi.ro/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://soundcloud.com/tshro" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSoundcloud} size="2x" />
          </a>
          <a href="https://openprocessing.org/user/391345/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEye} size="2x" />
          </a>
          <a href="mailto:mtaishiro@proton.me">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
