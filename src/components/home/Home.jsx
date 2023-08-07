import  { useState, useContext } from 'react';
import Scene from '../scene/Scene';

import './home.css';
import gsap from 'gsap';
import transitionAudio from './src/audio/transition1.mp3';
import mouseHoverAudio from './src/audio/mouseHover1.mp3';
import Context from '../context/Context';

const Home = () => {
  const ContextAudio = useContext(Context);

  const [activeScene, setActiveScene] = useState(false);

  const gsapActiveScene = () => {
    let tl = gsap.timeline({
      duration: 2,
    });

    tl.to('.containerPresent', {
      opacity: 0,
      display: 'none',
    });

    tl.to('.containerScene', {
      opacity: 1,
      display: 'inline-block',
    });
  };

  const playAudio = () => {
    let audio = new Audio(transitionAudio);
    if (ContextAudio.audioActive) {
      audio.play();
      audio.volume = 0.05;
    } else {
      audio.pause();
    }
  };

  const hoverEffectAudio = () => {
    let audio = new Audio(mouseHoverAudio);
    if (ContextAudio.audioActive) {
      audio.play();
      audio.volume = 0.05;
    } else {
      audio.pause();
    }
  };

  return (
    <div className="home">
      <div className="containerPresent">
        <h1 className="titlePresent">
          
          <span id="frontend">Galaxy</span>
          
        </h1>
        <section id="section03" className="demo">
          <a href="#box2">
            <span></span>
          </a>
        </section>

        <div
          className="explore"
          onClick={() => {
            setActiveScene(true);
            gsapActiveScene();
            playAudio();
          }}
          onMouseOver={() => hoverEffectAudio()}
        >
          Explore
        </div>
        
      </div>
      <div className="containerScene">{activeScene ? <Scene /> : null}</div>
    </div>
  );
};

export default Home;
