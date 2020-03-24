// import React, { useState } from 'react';

// const Search = ({ getData, clearTweets, setAlert }) => {
//     const [text, setText] = useState('');

//     const onSubmit = e => {
//         e.preventDefault();
//         if (text === '') {
//             setAlert('Please enter a stock symbol', 'light');
//         } else {
//             getData(text);
//             setText('');
//         }
//     };

//     const onChange = e => {
//         setText(e.target.value);
//     };

//     return (
//         <div>
//             <form className='form' onSubmit={onSubmit}>
//                 <input
//                     type='text'
//                     name='text'
//                     placeholder='Enter your stock symbol'
//                     value={text}
//                     onChange={onChange}
//                 />

//                 <input type='submit' value='Search' className='btn-primary' />
//             </form>
//             {/* {this.state.data.length > 0 && (
//                 <button className='btn-light' onClick={clearTweets}>
//                     Clear
//                 </button>
//             )} */}
//         </div>
//     );
// };

// export default Search;
