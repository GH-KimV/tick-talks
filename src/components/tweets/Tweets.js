import React from 'react';
import TweetItem from './TweetItem';
import Spinner from '../layout/Spinner';

const Tweets = ({ tweets, loading }) => {
        return (
            <div className='sub-container' >
                {tweets.map(tweet => (
                    <TweetItem key={tweet.id} tweet={tweet} />
                ))}
            </div>
        );
};

export default Tweets;
