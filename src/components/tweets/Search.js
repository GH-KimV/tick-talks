import React, { useState } from 'react';

const Search = ({ searchTweets, clearTweets, Alert }) => {
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            Alert('Please enter a stock symbol', 'light');
        } else {
            searchTweets(text);
            setText('');
        }
    }

    const onChange = e => {
        setText(e.target.value);
    }

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input
                    type='text'
                    name='text'
                    placeholder='Enter your stock symbol'
                    value={text}
                    onChange={onChange}
                />

                <input
                    type='submit'
                    value='Search'
                    className='btn btn-primary btn-block'
                />
            </form>

            <button className='btn btn-light btn-block' onClick={clearTweets}>
                Clear
            </button>
        </div>
    );
};

export default Search;
