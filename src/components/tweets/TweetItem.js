import FadeIn from 'react-fade-in';
import Moment from 'react-moment';
import React, { Component } from 'react';

export default class TweetItem extends Component {
    componentDidMount() {
        const { text, getData } = this.props;

        this.intervalId = setInterval(() => getData(text), 30000);
        console.log('tweet component mounted');
        console.log('symbol searched', text);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        console.log('tweet component updated');
    }

    render() {
        const { tweet } = this.props;

        return (
                <FadeIn>
                    <div className='card text-center'>
                        <div className='user-info'>
                            <img
                                src={tweet.user.avatar_url}
                                alt='avatar'
                                className='round-img'
                                style={{ width: '60px' }}
                            />
                            <h3 className='username'>{tweet.user.username}</h3>
                        </div>
                        <div className='tweet-body'>
                            <p>{tweet.body}</p>
                        </div>
                        <div className='tweet-info'>
                            <div className='date'>
                                <Moment>{tweet.created_at}</Moment>
                            </div>
                        </div>
                    </div>
                </FadeIn>
        );
    }
}
