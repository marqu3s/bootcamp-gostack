import React, { Component } from 'react';
import profileImg from './assets/profile.jpeg';

class Header extends Component {
  render() {
    return (
      <header id="main-header">
        <div className="logo">facebook</div>
        <div className="profile-menu">Meu perfil <img src={profileImg} className="profile-image" /></div>
      </header>
    );
  }
}

export default Header