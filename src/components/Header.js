import React from 'react';
import NavigationBar from './NavigationBar';

const Header = ({ user }) => (
  <header className="header">
    <NavigationBar user={user} />
  </header>
);

export default Header;
