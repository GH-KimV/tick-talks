import TweetItem from './components/tweets/TweetItem';
import './App.css';
import React, { Component } from 'react';
import Hero from './components/layout/Hero';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            text: '',
            isClear: false
        };
    }

    getData = text => {
        fetch(`https://api.stocktwits.com/api/2/streams/symbol/${text}.json`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data.messages
                });
            });
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.text.length > 5) {
        }
        this.getData(this.state.text);
        this.setState({ isClear: false });
    };

    onChange = e => {
        this.setState({ text: e.target.value });
        console.log(this.state.text);
    };

    clearTweets = e => {
        this.setState({
            isClear: true,
            data: []
        });
    };

    render() {
        return (
            <Router>
                <div className='App'>
                    <Navbar />
                    <Switch>
                        <Route exact path='/'>
                            <div className='container'>
                                <Hero />
                                <form className='form' onSubmit={this.onSubmit}>
                                    <input
                                        type='text'
                                        name='text'
                                        placeholder='Enter stock symbol, e.g. AAPL'
                                        value={this.text}
                                        onChange={this.onChange}
                                    />
                                {this.state.data.length < 1 && (

                                    <input
                                        type='submit'
                                        value='Search'
                                        className='btn-primary'
                                    />
                                )}

                                </form>
                                {this.state.data.length > 0 && (
                                    <button
                                        className='btn btn-light'
                                        onClick={this.clearTweets}
                                    >
                                        Clear
                                    </button>
                                )}

                                <div className='sub-container'>
                                    {this.state.data.map(tweet => (
                                        <TweetItem
                                            key={tweet.id}
                                            tweet={tweet}
                                            text={this.state.text}
                                            getData={this.getData}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Route>
                        <Route exact path='/about' component={About} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
