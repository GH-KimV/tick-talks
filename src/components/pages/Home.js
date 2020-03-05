import React from 'react';
import Tweets from '../tweets/Tweets';
import Search from '../tweets/Search';
// import Hero from '../layout/hero';

const Home = () => {
    return (
        <>
            {/* <Hero /> */}
            <Search />
            <Tweets />
        </>
    );
};

export default Home;
