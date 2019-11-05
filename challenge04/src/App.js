import React, { Component } from 'react';
import Header from './Header';
import PostList from './PostList';

import './App.css';

class App extends Component {
  render() {
    return (
    <>
      <Header />
      <PostList />
    </>
    );
  }
}

export default App;