import React from 'react';
import convo_gif from './assets/convo_gif.gif';
import FadeIn from 'react-fade-in';
import Typing from 'react-typing-animation';

const Hero = () => {
    return (
        <div className='hero'>
            {/* <Typing speed={20}> */}
                <p className='hero-header'>Search twitter stock feeds.</p>
            {/* </Typing> */}
            {/* <FadeIn delay={2500}>
                <img src={convo_gif} alt='gif' className='convo-gif' />
            </FadeIn> */}
        </div>
    );
};

export default Hero;
