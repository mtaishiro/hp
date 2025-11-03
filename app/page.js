'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoundcloud, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
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
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-8">
      <div className="w-full max-w-[500px] px-4">
        <Image
          src="/images/okbglitch.png"
          alt="pfp"
          width={500}
          height={500}
          priority
          className="w-full h-auto"
        />
      </div>
      
      <div className="text-4xl md:text-5xl font-['Rubik_Maze'] font-extralight my-8">
        {text}
        <span className="animate-pulse">|</span>
      </div>
      
      <div className="flex gap-10 mb-8">
        <a 
          href="https://www.instagram.com/taishi.ro/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faInstagram} className="w-7 h-7" />
        </a>
        <a 
          href="https://soundcloud.com/tshro" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faSoundcloud} className="w-7 h-7" />
        </a>
        <a 
          href="https://openprocessing.org/user/391345/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faEye} className="w-7 h-7" />
        </a>
        <a 
          href="mailto:mtaishiro@proton.me"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faEnvelope} className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
}

