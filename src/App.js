import TweetItem from './components/tweets/TweetItem';
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from './components/layout/Loader';
import Alert from './components/layout/Alert';

(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

export default class App extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            text: '',
            showLoading: false,
            alert: null,
            isError: false
        };
    }

    componentDidMount() {
        this.setState({
            showLoading: true
        });
        setTimeout(() => {
            this.setState({
                showLoading: false
            });
        }, 2000);
    }

    getData = text => {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.stocktwits.com/api/2/streams/symbol/${text}.json`,{
            mode: 'cors'
        })
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(data => {
                this.setState({
                    data: data.messages
                });
            })
            .catch(
                error => alert('Please enter a valid stock symbol', error),
                this.setState({ isError: true }),
                setTimeout(() => {
                    this.setState({
                        isError: false
                    });
                }, 20000)
            );
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.text === '') {
            this.setAlert('Please enter a stock symbol', 'light');
            setTimeout(() => this.setState({ alert: null }), 5000);
        } else {
            this.getData(this.state.text);
        }
    };

    onChange = e => {
        this.setState({ text: e.target.value });
    };

    clearTweets = () => {
        this.setState({
            data: []
        });
    };

    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });
        setTimeout(() => this.setState({ alert: null }), 5000);
    };

    render() {
        return (
            <Router>
                <div className='App'>
                    <Navbar />
                    <Switch>
                        <Route exact path='/'>
                            <div className='container'>
                                <Alert alert={this.state.alert} />
                                <div
                                    className={`loading-logo ${
                                        this.state.isError
                                            ? 'title-shown'
                                            : 'hidden'
                                    }`}
                                >
                                    <Loader />
                                </div>
                                <div
                                    className={`loading-logo ${
                                        this.state.showLoading
                                            ? 'title-shown'
                                            : 'hidden'
                                    }`}
                                >
                                    <Loader />
                                </div>
                                <div
                                    className={`hero  ${
                                        this.state.showLoading
                                            ? 'hidden'
                                            : 'shown'
                                    }`}
                                >
                                    <p className='hero-header'>
                                        Search Stocktwits feeds.
                                    </p>
                                    <form
                                        className='form'
                                        onSubmit={this.onSubmit}
                                    >
                                        <input
                                            type='text'
                                            name='text'
                                            placeholder='Enter stock symbol'
                                            value={this.state.text}
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
                                            className='btn-light'
                                            onClick={this.clearTweets}
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <div className='sub-container'>
                                    <div className>
                                        {this.state.data.length > 0 && (
                                            <h3 className='trending-header'>
                                                ${this.state.text} Trending
                                            </h3>
                                        )}
                                    </div>
                                    <div className='trending-info'>
                                        {this.state.data.length > 0 && (
                                            <>
                                                <h3 className='trending-account'>
                                                    Account
                                                </h3>
                                                <h3 className='trending-tweet'>
                                                    Tweet
                                                </h3>
                                                <h3 className='trending-time'>
                                                    Time
                                                </h3>
                                            </>
                                        )}
                                    </div>
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
