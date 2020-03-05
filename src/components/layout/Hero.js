import React from 'react';
import convo_gif from './assets/convo_gif.gif';
import FadeIn from 'react-fade-in';
import Typing from 'react-typing-animation';

const Hero = () => {
    return (
        <div className='hero'>
            <Typing speed={20}>
                <h1 className='hero-header'>Check out the latest tweets stream on your favorite stock!</h1>
            </Typing>
            <FadeIn delay={2500}>
                <img src={convo_gif} alt='gif' className='convo-gif' />
            </FadeIn>
        </div>
    );
};

export default Hero;
